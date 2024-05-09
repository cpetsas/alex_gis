import json
import jwt
import datetime
import os

from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.urls import path
from django.http import JsonResponse

from ..models.user_model import User
from .base_controller import BaseController


class AuthorisationController(BaseController):
    """
    Class responsible for the login authorisation workflow.
    """

    @staticmethod
    def generate_jwt(username, user_token):
        """
        Method for generating JWT as part of authorisation process.
        The JWT contains the username, a uniquer user token and the exp (expiration datetime).
        I've set it to expire in 10 minutes.
        params:
            username: String
            user_token: String
        returns:
            encoded JWT. String
        """
        payload = {
            "username": username,
            "user_token": user_token,
            "exp": datetime.datetime.now(datetime.UTC) + datetime.timedelta(minutes=10)
        }

        encoded_jwt = jwt.encode(payload, os.environ["SECRET_KEY"], algorithm='HS256')

        return encoded_jwt
    
    @staticmethod
    @csrf_exempt
    @require_http_methods(['POST'])
    def login(request):
        """
        Method for identifying user requesting to login to service via provided credentials.
        params:
            request. POST request body should be in the form:
            {
            username: "String",
            password: "String"
            }
        returns:
            JsonResponse with appropriate status and payload. Payload in this case is a dict with a key, "user_token"
            and the jwt as a value.
        """
        request_body = json.loads(request.body)
        try:
            username = request_body["username"]
            password = request_body["password"]
        except:
            return JsonResponse({"message": "Please provide username and password"}, status=400)
        user = User.objects.get(username=username, password=password)
        if user:
            tidy_user = BaseController.clean_object(user, "username")
            jwt_token = AuthorisationController.generate_jwt(tidy_user.get("username"), tidy_user.get("token"))
        else:
            return JsonResponse({"message": "User not found"}, status=404)
        return JsonResponse({"user_token": jwt_token}, status=200)

