from django.urls import path
from ..controllers.auth_controller import AuthorisationController


class AuthRouter:

    auth_controller = AuthorisationController

    @classmethod
    def get_endpoints(cls):
        return [path('login/', cls.auth_controller.login)]