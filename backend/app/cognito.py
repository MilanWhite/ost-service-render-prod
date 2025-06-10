import boto3
from app.config import Config

cognito_client = boto3.client("cognito-idp", region_name=Config.AWS_REGION)

s3_client = boto3.client("s3", region_name=Config.AWS_REGION)