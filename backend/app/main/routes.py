from flask import Blueprint, request
from sqlalchemy import or_

from app.models import User, Vehicle
from app.utils import error_response, success_response
from app.decorators import cognito_auth_required
from app.cognito import s3_client
from app.config import Config

main_bp = Blueprint('main', __name__)

def check_sub(user_groups, user_sub, sub):

    if "Admin" not in user_groups and sub != user_sub:
        return error_response(message="Forbidden", code=403)

def get_vehicle_thumbnail(sub: str, vehicle_id: str) -> str | None:

    resp = s3_client.list_objects_v2(
        Bucket=Config.S3_BUCKET,
        Prefix=f"{sub}/{vehicle_id}/thumbnail/",
        MaxKeys=1,
    )

    keys = [
        obj["Key"]
        for obj in resp.get("Contents", [])
        if not obj["Key"].endswith("/")
    ]

    if not keys:
        return None

    return s3_client.generate_presigned_url(
        ClientMethod="get_object",
        Params={"Bucket": Config.S3_BUCKET, "Key": keys[0]},
        ExpiresIn=3600,
    )

def get_all_vehicle_images(sub,vehicle_id):

    try:

        resp = s3_client.list_objects_v2(
            Bucket=Config.S3_BUCKET,
            Prefix=f"{sub}/{vehicle_id}/",
        )

        img_keys = [
            obj["Key"]
            for obj in resp.get("Contents", [])
            if not obj["Key"].endswith("/") and "thumbnail" not in obj["Key"] and "videos" not in obj["Key"] and "documents" not in obj["Key"]
        ]

        img_urls = [
            s3_client.generate_presigned_url(
                ClientMethod="get_object",
                Params={"Bucket": Config.S3_BUCKET, "Key": img_key},
                ExpiresIn=3600
            )
            for img_key in img_keys
        ]

        vid_keys = [
            obj["Key"]
            for obj in resp.get("Contents", [])
            if not obj["Key"].endswith("/") and "videos" in obj["Key"]
        ]

        vid_urls = []
        if vid_keys:
            vid_urls = [
                s3_client.generate_presigned_url(
                    ClientMethod="get_object",
                    Params={"Bucket": Config.S3_BUCKET, "Key": vid_key},
                    ExpiresIn=3600
                )
                for vid_key in vid_keys
            ]

        return img_urls, vid_urls

    except Exception as e:
        print(str(e))
        return error_response(message=str(e), code=500)

def get_vehicle_document(sub, vehicle_id, document_type):
    try:

        resp = s3_client.list_objects_v2(
            Bucket=Config.S3_BUCKET,
            Prefix=f"{sub}/{vehicle_id}/documents/",
        )

        documents = [
            obj["Key"]
            for obj in resp.get("Contents", [])
            if not obj["Key"].endswith("/") and document_type in obj["Key"]
        ]

        document_url = ""
        if documents:
            document_url = s3_client.generate_presigned_url(
                    ClientMethod="get_object",
                    Params={"Bucket": Config.S3_BUCKET, "Key": documents[0]},
                    ExpiresIn=3600
                )

        return document_url

    except Exception as e:
        print(e)
        return error_response(message=str(e), code=500)



# requires pagination
@main_bp.route("/<string:sub>/vehicles", methods=["GET"])
@cognito_auth_required(["Admin", "RegularUser"])
def main_get_user_vehicles(sub):

    try:

        check_sub(request.user["cognito:groups"], request.user["sub"], sub)

        page = request.args.get("page", 1, type=int)
        per_page = request.args.get("per_page", 5, type=int)

        vehicle_search = request.args.get("vehicle_search", "", type=str)
        vehicle_filter_by = request.args.get("vehicle_filter_by", None, type=str)

        vehicles = Vehicle.query.filter_by(cognito_sub=sub)
        # filter vehicels by search
        if vehicle_search:
            # whitelist to avoid injection
            allowed = {
              "lot_number",
              "auction_name",
              "location",
              "shipping_status",
              "vehicle_name",

              "container_number",
              "port_of_origin",
              "port_of_destination",
              "delivery_address",
              "receiver_id",
            }

            if vehicle_filter_by in allowed:
                col = getattr(Vehicle, vehicle_filter_by)
                vehicles = vehicles.filter(col.ilike(f"%{vehicle_search}%"))
            else:
                # fallback: global search on vehicle_name + auction_name, for example
                pattern = f"%{vehicle_search}%"
                vehicles = vehicles.filter(
                    or_(
                        Vehicle.vehicle_name.ilike(pattern),
                        Vehicle.auction_name.ilike(pattern),
                        Vehicle.location.ilike(pattern),
                    )
                )

        pagination = vehicles.paginate(page=page, per_page=per_page, error_out=False)
        vehicles_list = [v.to_dict() for v in pagination.items]

        # get all vehicle thumbnails

        for vehicle in vehicles_list:
            vehicle["vehicleThumbnail"] = get_vehicle_thumbnail(vehicle["cognito_sub"], vehicle["id"])

        return success_response({
            "vehicles": vehicles_list,
            "meta": {
                "page":        pagination.page,
                "per_page":    pagination.per_page,
                "total_pages": pagination.pages,
                "total_items": pagination.total,
                "has_next":    pagination.has_next,
                "has_prev":    pagination.has_prev,
            }
        })

    except Exception as e:
        print(f"[admin_get_user_vehicles] {e}")
        return error_response(message=str(e), code=500)

@main_bp.route("/<string:sub>/get-user", methods=["GET"])
@cognito_auth_required(["Admin", "RegularUser"])
def main_get_user(sub):
    try:

        check_sub(request.user["cognito:groups"], request.user["sub"], sub)

        user = User.query.filter_by(cognito_sub=sub).first()
        if not user:
            return error_response(message="User not found", code=404)

        # 2. serialize
        user_data = {
            "sub":           user.cognito_sub,
            "username":      user.name,
            "email":         user.email,
            "phone_number":  user.phone_number,
        }

        # 3. return
        return success_response({"user": user_data})

    except Exception as e:
        print(str(e))
        return error_response(message=str(e), code=500)


@main_bp.route("/<string:sub>/vehicles/<string:vehicle_id>", methods=["GET"])
@cognito_auth_required(["Admin", "RegularUser"])
def main_get_specific_vehicle(sub,vehicle_id):
    try:

        check_sub(request.user["cognito:groups"], request.user["sub"], sub)

        vehicle = (
            Vehicle.query
            .filter_by(id=vehicle_id, cognito_sub=sub)
            .first()
        )
        if not vehicle:
            return error_response("Vehicle not found", 404)

        vehicle = vehicle.to_dict()

        vehicle["vehicleImages"], vehicle["vehicleVideos"] = get_all_vehicle_images(sub, vehicle_id)

        vehicle["vehicleBillOfSaleDocument"] = get_vehicle_document(sub, vehicle_id, "bill_of_sale_document")

        vehicle["vehicleTitleDocument"] = get_vehicle_document(sub, vehicle_id, "title_document")

        vehicle["vehicleBillOfLandingDocument"] = get_vehicle_document(sub, vehicle_id, "bill_of_landing_document")

        return success_response({"vehicle": vehicle})

    except Exception as e:
        print(f"[main_get_user_vehicles] {e}")
        return error_response(message=str(e), code=500)

# user dashboard
@main_bp.route("/dashboard", methods=["GET"])
@cognito_auth_required(["RegularUser"])
def user_fetch_dashboard():
    try:
        user_sub = request.user.get("sub")

        # total cars of user
        total_cars = (
            Vehicle.query
            .filter_by(cognito_sub=user_sub)
            .count()
        )

        # number of users vehicles delivered
        vehicles_delivered = (
            Vehicle.query
            .filter_by(cognito_sub=user_sub, shipping_status="Delivered")
            .count()
        )

        # number of user vehicles not delivered
        vehicles_not_delivered = (
            Vehicle.query
            .filter(
                Vehicle.cognito_sub == user_sub,
                Vehicle.shipping_status != "Delivered"
            )
            .count()
        )

        # recently created vehicles for this user
        recent_vehicles_query = (
            Vehicle.query
            .filter_by(cognito_sub=user_sub)
            .order_by(Vehicle.created_at.desc())
            .limit(6)
            .all()
        )
        recently_created = [
            {
                "id": v.id,
                "vehicleName": v.vehicle_name,
                "lotNumber": v.lot_number,
                "auctionName": v.auction_name,
                "shippingStatus": v.shipping_status,
                "createdAt": v.created_at.isoformat(),
            }
            for v in recent_vehicles_query
        ]

        # vehicles not delivered for this user
        not_delivered_query = (
            Vehicle.query
            .filter(
                Vehicle.cognito_sub == user_sub,
                Vehicle.shipping_status != "Delivered"
            )
            .order_by(Vehicle.created_at.desc())
            .limit(6)
            .all()
        )
        not_delivered = [
            {
                "id": v.id,
                "vehicleName": v.vehicle_name,
                "lotNumber": v.lot_number,
                "auctionName": v.auction_name,
                "shippingStatus": v.shipping_status,
                "createdAt": v.created_at.isoformat(),
            }
            for v in not_delivered_query
        ]

        return success_response({
            "stats": {
                "totalCars": total_cars,
                "vehiclesDelivered": vehicles_delivered,
                "vehiclesNotDelivered": vehicles_not_delivered
            },
            "recentlyCreated": recently_created,
            "notDelivered": not_delivered
        })

    except Exception as e:
        return error_response(message=str(e), code=500)