import json
import time
import urllib.request
from jose import jwk, jwt
from jose.utils import base64url_decode

from app.config import Config

JWKS_URL = (f"https://cognito-idp.{Config.AWS_REGION}.amazonaws.com/{Config.USER_POOL_ID}/.well-known/jwks.json")

_jwks_cache = None
def _get_jwks():
    global _jwks_cache
    if _jwks_cache is None:
        resp = urllib.request.urlopen(JWKS_URL)
        _jwks_cache = json.loads(resp.read())["keys"]
    return _jwks_cache

def verify_jwt(token: str) -> dict:
    unverified_header = jwt.get_unverified_headers(token)
    kid = unverified_header.get("kid")
    if not kid:
        raise Exception("Invalid token header: no 'kid'")
    jwks = _get_jwks()
    key_dict = next((k for k in jwks if k["kid"] == kid), None)
    if key_dict is None:
        raise Exception("Public key not found in JWKS")

    public_key = jwk.construct(key_dict)
    message, encoded_sig = token.rsplit(".", 1)
    decoded_sig = base64url_decode(encoded_sig.encode("utf-8"))
    if not public_key.verify(message.encode("utf-8"), decoded_sig):
        raise Exception("Signature verification failed")

    claims = jwt.get_unverified_claims(token)
    now = int(time.time())
    if claims.get("exp", 0) < now:
        raise Exception("Token is expired")
    expected_iss = f"https://cognito-idp.{Config.AWS_REGION}.amazonaws.com/{Config.USER_POOL_ID}"
    if claims.get("iss") != expected_iss:
        raise Exception(f"Invalid issuer, expected {expected_iss}")
    if claims.get("token_use") != "access":
        raise Exception("Not an access token")

    if Config.APP_CLIENT_ID and claims.get("client_id") not in [Config.APP_CLIENT_ID, Config.WEB_APP_CLIENT_ID]:
        raise Exception("Token was not issued for this audience")

    return claims
