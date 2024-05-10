from django.urls import path
from ..controllers.author_controller import AuthorsController
from .base_router import BaseRouter


class AuthorsRouter(BaseRouter):
    """
    Class for fetching author routes. Uses AuthorController class to point to method based on url path
    """

    authors_controller = AuthorsController

    @classmethod
    def get_endpoints(cls):
        return [path('author/create', cls.authors_controller.create_author),
                path('author/', cls.authors_controller.get_all_authors),
                path('author/<str:author_index>', cls.authors_controller.get_author),
                path('author/update/<str:author_index>', cls.authors_controller.update_author),
                path('author/delete/<str:author_index>', cls.authors_controller.delete_author)]