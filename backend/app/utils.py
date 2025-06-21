
import os, re, urllib.parse
from io import BytesIO
from werkzeug.utils import secure_filename
from flask import jsonify
from app.cognito import s3_client
from app.config import Config
from PIL import Image

def success_response(message: str = "OK", code: int = 200, data: dict = None):
    payload = {"message": message}
    if data is not None:
        payload["data"] = data
    return jsonify(payload), code

def error_response(message: str, code: int = 400, details: dict = None):
    payload = {"error": message}
    if details:
        payload["details"] = details
    return jsonify(payload), code

def get_extension(image):
    original_image_name = secure_filename(image.filename)
    ext = os.path.splitext(original_image_name)[1]
    return ext

def add_file(filename, key, file):

    original_name = secure_filename(filename)
    # ext = os.path.splitext(original_name)[1]

    # change content disposition to allow for in browser viewing
    content_type = getattr(file, "mimetype", None) or "application/octet-stream"
    content_disposition = f'inline; filename="{original_name}"'

    try:
        s3_client.upload_fileobj(
            Fileobj=file,
            Bucket=Config.S3_BUCKET,
            Key=f"{key}",
            ExtraArgs={
                "ContentType": content_type,
                "ContentDisposition": content_disposition,
            },
        )
    except Exception:
        return error_response(message="Upload failed", code=500)

def create_thumbnail(thumbnail, folder_prefix, is_mobile):
    ext = get_extension(thumbnail)

    suff = ""
    if is_mobile:
        suff = "_mobile"

    thumbnail.stream.seek(0)
    img = Image.open(thumbnail.stream)

    if is_mobile:
        MAX_SIZE = (600, 600)
    else:
        MAX_SIZE = (250, 250)

    img.thumbnail(MAX_SIZE)

    thumbnail_buffer = BytesIO()
    img_format = img.format or 'JPEG'
    img.save(thumbnail_buffer, format=img_format)
    thumbnail_buffer.seek(0)

    add_file(thumbnail.filename, f"{folder_prefix}/thumbnail/thumbnail{suff}{ext}", thumbnail_buffer)

    thumbnail.stream.seek(0)


_DISP_RE = re.compile(r'filename\*?=(.+)', re.I)

def _filename_from_cd(cd):
    if not cd:
        return None

    m = _DISP_RE.search(cd)
    if not m:
        return None

    value = m.group(1).strip()

    if value.startswith("UTF-8''"):
        return urllib.parse.unquote(value[7:])

    return value.strip('"')

def get_vehicle_thumbnail_filename(sub, vehicle_id):

    prefix = f"{sub}/{vehicle_id}/thumbnail/"

    resp = s3_client.list_objects_v2(
        Bucket=Config.S3_BUCKET,
        Prefix=prefix,
        MaxKeys=2,
    )

    keys = [obj["Key"] for obj in resp.get("Contents", []) if not obj["Key"].endswith("/")]
    if not keys:
        return None

    mobile_key = next((k for k in keys
                       if os.path.splitext(os.path.basename(k))[0].endswith("_mobile")), None)
    regular_key = next((k for k in keys if k != mobile_key), None)

    key_to_use = regular_key or mobile_key
    if not key_to_use:
        return None

    head = s3_client.head_object(
        Bucket=Config.S3_BUCKET,
        Key=key_to_use,
    )
    cd_header = head.get("ContentDisposition")

    filename = _filename_from_cd(cd_header)
    if filename:
        return filename

    basename = os.path.basename(key_to_use)
    if key_to_use == mobile_key:
        stem, ext = os.path.splitext(basename)
        basename = stem.removesuffix("_mobile") + ext
    return basename

def check_sub(user_groups, user_sub, sub):

    if "Admin" not in user_groups and sub != user_sub:
        return error_response(message="Forbidden", code=403)

def get_vehicle_thumbnails(sub: str, vehicle_id: str):

    prefix = f"{sub}/{vehicle_id}/thumbnail/"

    resp = s3_client.list_objects_v2(
        Bucket=Config.S3_BUCKET,
        Prefix=prefix,
    )

    keys = [obj["Key"] for obj in resp.get("Contents", []) if not obj["Key"].endswith("/")]

    if not keys:
        return None, None

    mobile_key = next(
        (k for k in keys if os.path.splitext(os.path.basename(k))[0].endswith("_mobile")),
        None,
    )
    regular_key = next(
        (k for k in keys if k != mobile_key),
        None,
    )

    def presign(key):
        if key is None:
            return None
        return s3_client.generate_presigned_url(
            ClientMethod="get_object",
            Params={"Bucket": Config.S3_BUCKET, "Key": key},
            ExpiresIn=3600,
        )

    return presign(regular_key), presign(mobile_key)

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