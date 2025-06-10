from functools import wraps
from flask import request
from app.utils import error_response
from app.verify_tokens import verify_jwt

def cognito_auth_required(required_groups: list[str] | None = None):
    # Decorator to verify a Cognito JWT and enforce Cognito-group membership.

    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            auth_header = request.headers.get("Authorization", "")

            if not auth_header.startswith("Bearer "):
                return error_response("Missing token", 401)

            token = auth_header.split()[1]

            try:
                claims = verify_jwt(token)
                request.user = claims
            except Exception as e:
                return error_response("Invalid token", 401)

            if required_groups:
                user_groups = claims.get("cognito:groups", [])
                if not any(g in user_groups for g in required_groups):
                    return error_response("Forbidden: insufficient group", 403)

            return f(*args, **kwargs)
        return wrapper
    return decorator