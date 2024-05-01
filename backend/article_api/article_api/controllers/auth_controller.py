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

    @staticmethod
    def generate_jwt(username, user_token):
        payload = {
            "username": username,
            "user_token": user_token,
            "exp": datetime.datetime.now(datetime.UTC) + datetime.timedelta(minutes=5)
        }

        encoded_jwt = jwt.encode(payload, os.environ["SECRET_KEY"], algorithm='HS256')

        return encoded_jwt
    
    @staticmethod
    @csrf_exempt
    @require_http_methods(['POST'])
    def login(request):
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

    # def login(self, username, password):
    #     user_exists = User.objects.filter(username=username, password=password).exists()
    #     if user_exists:
    #         user = User.objects.get(username=username)
    #         tidy_user = self.clean_object(user, "username")
    #     else:
    #         return JsonResponse({"message": "User not found"}, status=404)
    #     return JsonResponse({"user": tidy_user}, status=200)


# auth_controller = AuthorisationController()
# @csrf_exempt
# @require_http_methods(['POST'])
# def login(request):
#     request_body = json.loads(request.body)
#     try:
#         username = request_body["username"]
#         password = request_body["password"]
#     except:
#         return JsonResponse({"message": "Please provide username and password"}, status=400)
    
#     return auth_controller.login(username, password)
