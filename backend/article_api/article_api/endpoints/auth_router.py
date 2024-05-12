from django.urls import path
from ..controllers.auth_controller import AuthorisationController
from .base_router import BaseRouter


class AuthRouter(BaseRouter):
    """
    Class for fetching authorisation routes. Uses AUthController class to point to method based on url path
    """

    auth_controller = AuthorisationController

    @classmethod
    def get_endpoints(cls):
        return [path('login/', cls.auth_controller.login)]