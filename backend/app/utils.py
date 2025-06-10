from flask import jsonify

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