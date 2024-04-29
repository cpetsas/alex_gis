from django.urls import path


class AuthRouter:

    def __init__(self) -> None:
        self.auth_endpoints = [
            path("login/")
        ]