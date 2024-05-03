from django.urls import path
from ..controllers.category_controller import CategoriesController
from .base_router import BaseRouter


class CategoryRouter(BaseRouter):

    category_controller = CategoriesController

    @classmethod
    def get_endpoints(cls):
        return [path('category/create', cls.category_controller.create_category),
                path('category/<str:category_index>', cls.category_controller.get_category),
                path('category/', cls.category_controller.get_all_categories),
                path('category/update/<str:category_index>', cls.category_controller.update_category),
                path('category/delete/<str:category_index>', cls.category_controller.delete_category)]