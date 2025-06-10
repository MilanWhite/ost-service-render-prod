import os
from io import BytesIO
from flask import Blueprint, request
from werkzeug.utils import secure_filename
from app.decorators import cognito_auth_required
from app.utils import error_response, success_response
from app.cognito import cognito_client, s3_client
from app.config import Config
from app.models import User, Vehicle
from PIL import Image
from app.extensions import db
from app.main.routes import get_all_vehicle_images, get_vehicle_thumbnail

admin_bp = Blueprint('admin', __name__)
# admin_bp = Blueprint('admin', __name__, url_prefix='/admin')

def get_extension(image):
    original_image_name = secure_filename(image.filename)
    ext = os.path.splitext(original_image_name)[1]
    return ext

@admin_bp.route("/users/create-user", methods=["POST"])
@cognito_auth_required(["Admin"])
def admin_create_user():
    try:

        # make user in cognito
        username = request.form.get("username")
        email = request.form.get("email")
        phone_number = request.form.get("phoneNumber")

        attrs = [
            {"Name": "email_verified", "Value": "True"},
        ]

        resp = cognito_client.admin_create_user(
            UserPoolId=Config.USER_POOL_ID,
            Username=email,
            UserAttributes=attrs,
            DesiredDeliveryMediums=["EMAIL"]
        )

        cognito_client.admin_add_user_to_group(
            UserPoolId=Config.USER_POOL_ID,
            Username=email,
            GroupName=Config.DEFAULT_USER_GROUP
        )


        # create their corresponding folder in AWS S3
        bucket = Config.S3_BUCKET
        folder_name = f"{resp['User']['Username']}/"

        s3_client.put_object(
            Bucket=bucket,
            Key=folder_name
        )

        # add user to db
        new_user = User(
            cognito_sub=resp["User"]["Username"],
            name=username,
            email=email,
            phone_number=phone_number
        )
        db.session.add(new_user)
        db.session.commit()

        return success_response()

    except Exception as e:
        print(str(e))
        return error_response(message="Internal Server Error", code=500)


@admin_bp.route("/users/get-all-users", methods=["GET"])
@cognito_auth_required(["Admin"])
def admin_get_all_users():
    try:
        users = User.query.order_by(User.name).all()

        users_list = [
            {
                "sub":   u.cognito_sub,
                "username":  u.name,
                "email": u.email,
                "phone_number": u.phone_number,
            }
            for u in users
        ]

        return success_response({"users": users_list})

    except Exception as e:
        print(str(e))
        return error_response(message="Internal Server Error", code=500)


@admin_bp.route("/users/<string:sub>/get-user", methods=["GET"])
@cognito_auth_required(["Admin"])
def admin_get_specific_user(sub):
    try:
        user = User.query.filter_by(cognito_sub=sub).first()
        if not user:
            return error_response(message="User not found", code=404)

        user_data = {
            "sub":           user.cognito_sub,
            "username":      user.name,
            "email":         user.email,
            "phone_number":  user.phone_number,
        }

        return success_response({"user": user_data})

    except Exception as e:
        print(str(e))
        return error_response(message="Internal Server Error", code=500)


@admin_bp.route("/vehicles/edit/<int:vehicle_id>/<int:on_singular_vehicle_page>", methods=["PUT"])
@cognito_auth_required(["Admin"])
def admin_edit_vehicle(vehicle_id, on_singular_vehicle_page):
    """
    Updates the fields on a vehicle. Expects a JSON body with any of:
      - vehicle_name
      - lot_number
      - auction_name
      - location
      - shipping_status
      - delivery_status
      - price_shipping
      - price_delivery

      - container_number
      - port_of_origin
      - port_of_destination
      - delivery_address
      - receiver_id
    """

    data = request.get_json() or {}
    allowed = {
        "vehicle_name": str,
        "lot_number": str,
        "auction_name": str,
        "location": str,
        "shipping_status": str,
        "delivery_status": str,
        "price_shipping": float,
        "price_delivery": float,

        "container_number": str,
        "port_of_origin": str,
        "port_of_destination": str,
        "delivery_address": str,
        "receiver_id": str,
    }

    vehicle = Vehicle.query.get(vehicle_id)

    if not vehicle:
        error_response("Vehicle not found", 404)

    for field, field_type in allowed.items():
        if field in data:
            try:
                setattr(vehicle, field, field_type(data[field]))
            except (ValueError, TypeError):
                error_response(f"Invalid value for {field}", 400)

    db.session.commit()

    vehicle = vehicle.to_dict()

    vehicle["vehicleImages"] = []
    vehicle["vehicleVideos"] = []
    vehicle["vehicleThumbnail"] = []

    if (on_singular_vehicle_page):
        vehicle["vehicleImages"], vehicle["vehicleVideos"]  = get_all_vehicle_images(vehicle["cognito_sub"], vehicle_id)
    else:
        vehicle["vehicleThumbnail"] = get_vehicle_thumbnail(vehicle["cognito_sub"], vehicle_id)

    return success_response({"vehicle": vehicle})


def add_file(filename, key, file):

    original_name = secure_filename(filename)
    ext = os.path.splitext(original_name)[1]

    # change content disposition to allow for in browser viewing
    content_type = getattr(file, "mimetype", None) or "application/octet-stream"
    content_disposition = f'inline; filename="{original_name}"'

    try:
        s3_client.upload_fileobj(
            Fileobj=file,
            Bucket=Config.S3_BUCKET,
            Key=f"{key}{ext}",
            ExtraArgs={
                "ContentType": content_type,
                "ContentDisposition": content_disposition,
            },
        )
    except Exception:
        return error_response(message="Upload failed", code=500)


@admin_bp.route("/vehicles/<string:sub>/create-vehicle", methods=["POST"])
@cognito_auth_required(["Admin"])
def admin_create_vehicle(sub):
    try:

        lot_number = request.form.get("lotNumber")
        auction_name = request.form.get("auctionName")
        location = request.form.get("location")
        shipping_status = request.form.get("shippingStatus")
        price_delivery = request.form.get("priceDelivery")
        price_shipping = request.form.get("priceShipping")
        vehicle_name = request.form.get("vehicleName")

        container_number = request.form.get("containerNumber")
        delivery_address = request.form.get("deliveryAddress")
        port_of_destination = request.form.get("portOfDestination")
        port_of_origin = request.form.get("portOfOrigin")
        receiver_id = request.form.get("receiverId")

        user = User.query.filter_by(cognito_sub=sub).first()
        user_email = user.email

        images = request.files.getlist("images")
        videos = request.files.getlist("videos")

        bill_of_sale_document = request.files.get("billOfSaleDocument")
        title_document = request.files.get("titleDocument")
        bill_of_landing_document = request.files.get("billOfLandingDocument")

        if not all([lot_number, auction_name, location, shipping_status, vehicle_name, images]):
            return error_response(message="Missing required field", code=400)

        try:
            price_delivery = float(price_delivery) if price_delivery else None
            price_shipping = float(price_shipping) if price_shipping else None
        except ValueError:
            return error_response(message="Invalid price format", code=400)

        new_vehicle = Vehicle(
            cognito_sub=sub,
            lot_number=lot_number,
            auction_name=auction_name,
            location=location,
            shipping_status=shipping_status,
            price_delivery=price_delivery,
            price_shipping=price_shipping,
            vehicle_name=vehicle_name,
            user_email=user_email,

            # new fields
            container_number=container_number,
            delivery_address=delivery_address,
            port_of_destination=port_of_destination,
            port_of_origin=port_of_origin,
            receiver_id=receiver_id,
        )

        db.session.add(new_vehicle)
        db.session.commit()

        # add images here

        folder_prefix = f"{sub}/{new_vehicle.id}"

        # create thumbnail

        first_image = images[0]

        ext = get_extension(first_image)

        first_image.stream.seek(0)
        img = Image.open(first_image.stream)

        MAX_SIZE = (250, 250)
        img.thumbnail(MAX_SIZE)

        thumbnail_buffer = BytesIO()
        img_format = img.format or 'JPEG'
        img.save(thumbnail_buffer, format=img_format)
        thumbnail_buffer.seek(0)


        try:
            s3_client.upload_fileobj(
                Fileobj=thumbnail_buffer,
                Bucket=Config.S3_BUCKET,
                Key=f"{folder_prefix}/thumbnail/{vehicle_name}_thumbnail{ext}",
            )
        except Exception as e:
            return error_response(message="Thumbnail upload failed", code=500)

        first_image.stream.seek(0)

        # upload all images
        for index, image in enumerate(images):
            add_file(image.filename, f"{folder_prefix}/{vehicle_name}{index}", image)

        #upload all videos
        for index, video in enumerate(videos):
            add_file(video.filename, f"{folder_prefix}/videos/{vehicle_name}{index}", video)

        # upload all documents

        if (bill_of_sale_document):
            add_file(bill_of_sale_document.filename, f"{folder_prefix}/documents/{vehicle_name}_bill_of_sale_document", bill_of_sale_document)
        if (bill_of_landing_document):
            add_file(bill_of_landing_document.filename, f"{folder_prefix}/documents/{vehicle_name}_bill_of_landing_document", bill_of_landing_document)
        if (title_document):
            add_file(title_document.filename, f"{folder_prefix}/documents/{vehicle_name}_title_document", title_document)

        return success_response()

    except Exception as e:
        print(str(e))
        return error_response(message="Internal Server Error", code=500)


@admin_bp.route("/vehicles/<string:sub>/delete-vehicle/<int:vehicle_id>", methods=["POST"])
@cognito_auth_required(["Admin"])
def admin_delete_vehicle(sub, vehicle_id):

    prefix = f"{sub}/{vehicle_id}/"
    continuation_token = None
    # delete S3
    while True:
        list_kwargs = {
            "Bucket": Config.S3_BUCKET,
            "Prefix": prefix,
            "MaxKeys": 1000,
        }
        if continuation_token:
            list_kwargs["ContinuationToken"] = continuation_token

        resp = s3_client.list_objects_v2(**list_kwargs)
        contents = resp.get("Contents", [])

        if not contents:
            break

        delete_keys = [{"Key": obj["Key"]} for obj in contents]
        try:
            s3_client.delete_objects(
                Bucket=Config.S3_BUCKET,
                Delete={"Objects": delete_keys, "Quiet": True},
            )
        except Exception as e:
            return error_response(message="Failed to delete S3 objects", code=500)

        if resp.get("IsTruncated"):
            continuation_token = resp["NextContinuationToken"]
        else:
            break

    # delete vehicle item from db
    try:
        vehicle = (
            Vehicle.query
            .filter_by(id=vehicle_id, cognito_sub=sub)
            .first()
        )

        if vehicle is None:
            return error_response(message="Vehicle not found in database", code=404)

        db.session.delete(vehicle)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return error_response(message="Failed to delete vehicle from database", code=500)

    return success_response()


@admin_bp.route("/dashboard", methods=["GET"])
@cognito_auth_required(["Admin"])
def admin_fetch_dashboard():
    try:
        # stats
        total_cars = Vehicle.query.count()
        total_users = User.query.count()
        vehicles_delivered = (
            Vehicle.query
            .filter(Vehicle.shipping_status == "Delivered")
            .count()
        )
        vehicles_not_delivered = total_cars - vehicles_delivered

        # activity feed last 5 creations across
        last_vehicles = (
            Vehicle.query
            .order_by(Vehicle.created_at.desc())
            .limit(5)
            .all()
        )
        last_users = (
            User.query
            .order_by(User.created_at.desc())
            .limit(5)
            .all()
        )

        events = []
        for v in last_vehicles:
            events.append({
                "type": "Vehicle",
                "action": "Vehicle Created",
                "vehicleName": v.vehicle_name,
                "lotNumber": v.lot_number,
                "timestamp": v.created_at.isoformat(),
                "userEmail": v.user_email,
                "cognitoSub": v.cognito_sub,
            })

        for u in last_users:
            events.append({
                "type": "User",
                "action": "User Created",
                "username": u.name,
                "timestamp": u.created_at.isoformat(),
                "cognitoSub": u.cognito_sub,
            })

        # sort
        activity_feed = sorted(
            events,
            key=lambda e: e["timestamp"],
            reverse=True
        )[:5]

        for k, event in enumerate(activity_feed):
            event["id"] = k

        # recent users (last 5)
        recent_users_query = (
            User.query
            .order_by(User.created_at.desc())
            .limit(5)
            .all()
        )
        recent_users = [
            {
                "username": u.name,
                "email": u.email,
                "cognitoSub": u.cognito_sub,
                "createdAt": u.created_at.isoformat()
            }
            for u in recent_users_query
        ]

        # recent vehicles created (last 6)
        recent_vehicles_query = (
            Vehicle.query
            .order_by(Vehicle.created_at.desc())
            .limit(6)
            .all()
        )
        recent_vehicles = [
            {
                "id": v.id,
                "vehicleName": v.vehicle_name,
                "lotNumber": v.lot_number,
                "auctionName": v.auction_name,
                "shippingStatus": v.shipping_status,
                "createdAt": v.created_at.isoformat(),
                "userEmail": v.user_email,
                "cognitoSub": v.cognito_sub,
            }
            for v in recent_vehicles_query
        ]

        # vehicles not delivered (last 6)
        not_delivered_query = (
            Vehicle.query
            .filter(Vehicle.shipping_status != "Delivered")
            .order_by(Vehicle.created_at.desc())
            .limit(6)
            .all()
        )
        vehicles_not_delivered_list = [
            {
                "id": v.id,
                "vehicleName": v.vehicle_name,
                "lotNumber": v.lot_number,
                "auctionName": v.auction_name,
                "shippingStatus": v.shipping_status,
                "createdAt": v.created_at.isoformat(),
                "userEmail": v.user_email,
                "cognitoSub": v.cognito_sub,
            }
            for v in not_delivered_query
        ]

        return success_response({
            "stats": {
                "totalCars": total_cars,
                "totalUsers": total_users,
                "vehiclesDelivered": vehicles_delivered,
                "vehiclesNotDelivered": vehicles_not_delivered
            },
            "activityFeed": activity_feed,
            "recentUsers": recent_users,
            "recentVehicles": recent_vehicles,
            "vehiclesNotDelivered": vehicles_not_delivered_list
        })

    except Exception as e:
        return error_response(message="Internal Server Error", code=500)
