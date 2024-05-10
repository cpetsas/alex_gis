from django.urls import path
from ..controllers.article_controller import ArticlesController
from .base_router import BaseRouter


class ArticlesRouter(BaseRouter):
    """
    Class for fetching article routes. Uses ArticlesController class to point to method based on url path
    """


    article_controller = ArticlesController

    @classmethod
    def get_endpoints(cls):
        return [path('article/create', cls.article_controller.create_article),
                path('article/', cls.article_controller.get_all_articles),
                path('article/<str:article_index>', cls.article_controller.get_article),
                path('article/update/<str:article_index>', cls.article_controller.update_article),
                path('article/delete/<str:article_index>', cls.article_controller.delete_article)]