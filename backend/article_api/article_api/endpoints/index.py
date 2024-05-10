"""
Entry point for fetching and aggregating all API routes. Uses all Router classes
to fetch their routes
"""
from django.contrib import admin
from django.urls import path
from .auth_router import AuthRouter
from .category_router import CategoryRouter
from .author_router import AuthorsRouter
from .article_router import ArticlesRouter


urlpatterns = [
    path('admin/', admin.site.urls),
    *AuthRouter.get_endpoints(),
    *CategoryRouter.get_endpoints(),
    *AuthorsRouter.get_endpoints(),
    *ArticlesRouter.get_endpoints(),
]
