from flask import Blueprint, request
from app.utils import error_response, success_response
from app.services import email_service

contact_bp = Blueprint('contact', __name__)
# contact_bp = Blueprint('contact', __name__, url_prefix='/contact')

@contact_bp.route('/message', methods=['POST'])
def message():

    try:

        first_name = request.form.get("firstName")
        last_name = request.form.get("lastName")
        email = request.form.get("email")
        phone_number = request.form.get("phoneNumber")
        message = request.form.get("message")
        language = request.form.get("language")

        # send customized email about person reaching out
        email_service.send_email(first_name, last_name, email, phone_number, message, language)

        return success_response()

    except Exception as e:
        print(str(e))
        return error_response(message="Internal Server Error", code=500)