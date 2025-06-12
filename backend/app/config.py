import os
from dotenv import load_dotenv

load_dotenv()

# Development configuration
class Config:
    """Default config used for development & testing."""

    SECRET_KEY = os.getenv("SECRET_KEY")

    # AWS + Cognito
    AWS_REGION         = os.getenv("AWS_REGION")
    USER_POOL_ID       = os.getenv("USER_POOL_ID")
    APP_CLIENT_ID      = os.getenv("APP_CLIENT_ID")
    WEB_APP_CLIENT_ID  = os.getenv("WEB_APP_CLIENT_ID")
    APP_CLIENT_SECRET  = os.getenv("APP_CLIENT_SECRET")
    COGNITO_DOMAIN     = os.getenv("COGNITO_DOMAIN")

    # Database
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Frontend (only allowed by CORS)
    FRONTEND_URLS = os.getenv("FRONTEND_URLS")

    DEFAULT_USER_GROUP = os.getenv("DEFAULT_USER_GROUP", "Users")
    S3_BUCKET          = os.getenv("S3_BUCKET")

    # Flags
    DEBUG = True
    SESSION_COOKIE_SECURE   = False
    SESSION_COOKIE_SAMESITE = "Lax"
    REMEMBER_COOKIE_SECURE   = False
    REMEMBER_COOKIE_SAMESITE = "Lax"


# Production config
class ProductionConfig(Config):

    DEBUG = False

    # cookie config
    SESSION_COOKIE_SECURE   = True
    SESSION_COOKIE_SAMESITE = "Lax"
    REMEMBER_COOKIE_SECURE   = True
    REMEMBER_COOKIE_SAMESITE = "Lax"

    # Must exist
    SECRET_KEY = os.environ["SECRET_KEY"]
    SQLALCHEMY_DATABASE_URI = os.environ["DATABASE_URL"]
    FRONTEND_URLS = os.environ["FRONTEND_URLS"]

    # Prefer HTTP
    PREFERRED_URL_SCHEME = "https"