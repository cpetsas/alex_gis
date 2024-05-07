import json

from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.urls import path
from django.http import JsonResponse
from datetime import datetime

from ..models.article_model import NewsArticle
from ..models.author_model import Author
from ..models.category_model import NewsCategory
from .base_controller import BaseController
from ..middlewares.auth_middleware import AuthorisationMiddleware


class ArticlesController(BaseController):

    @staticmethod
    @csrf_exempt
    @require_http_methods(['GET']) 
    @AuthorisationMiddleware.jwt_check_admin_check(user_accessible=True)
    def get_article(_, article_index):
        try:
            try:
                existing_article = NewsArticle.objects.get(id=article_index)
            except:
                return JsonResponse({"message": "Article does not exist."}, status=404)
            existing_article_author = Author.objects.get(id=existing_article.article_author_id)
            existing_article_author = BaseController.clean_object(existing_article_author, "id")

            existing_article_category = NewsCategory.objects.get(id=existing_article.article_category_id)
            existing_article_category = BaseController.clean_object(existing_article_category, "id")

            serialized_article = BaseController.clean_object(existing_article, "id")
            serialized_article["article_author"] = existing_article_author
            serialized_article["article_category"] = existing_article_category
            return JsonResponse(serialized_article, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e).strip()}, status=500)

    @staticmethod
    @csrf_exempt
    @require_http_methods(['GET']) 
    @AuthorisationMiddleware.jwt_check_admin_check(user_accessible=True)
    def get_all_articles(_):
        try:
            all_articles = NewsArticle.objects.all()
            serialized_articles = []
            for article in all_articles:
                existing_article_author = Author.objects.get(id=article.article_author_id)
                existing_article_author = BaseController.clean_object(existing_article_author, "id")

                existing_article_category = NewsCategory.objects.get(id=article.article_category_id)
                existing_article_category = BaseController.clean_object(existing_article_category, "id")

                serialized_article = BaseController.clean_object(article, "id")
                serialized_article["article_author"] = existing_article_author
                serialized_article["article_category"] = existing_article_category
                serialized_articles.append(serialized_article)
            return JsonResponse(serialized_articles, status=200, safe=False)
        except Exception as e:
            return JsonResponse({"error": str(e).strip()}, status=500)
    
    @staticmethod
    @csrf_exempt
    @require_http_methods(['POST'])
    @AuthorisationMiddleware.jwt_check_admin_check()
    def create_article(request):
        request_body = json.loads(request.body)
        try:
            title = request_body["title"]
            summary = request_body["summary"]
            content = request_body["content"]
            article_author = request_body["author"]
            article_category = request_body["category"]
        except:
            return JsonResponse({"message": "Please provide a title,summary,content,author and category for the article."}, status=400)
        
        published = request_body.get("published", False)
        published_date = request_body.get("published_date")
        if (published and not published_date) or (published_date and not published):
            return JsonResponse({"message": "If article is published then it needs a published date. If it's not published then it cannot have a published date."}, status=400)
        
        try:
            article_author = Author.objects.get(id=article_author)
            article_category = NewsCategory.objects.get(id=article_category)
            new_article = NewsArticle.objects.create(title=title,
                                               summary=summary,
                                               content=content,
                                               published=published,
                                               published_date=datetime.strptime(published_date, "%Y-%m-%d").date() if published_date else None,
                                               article_author=article_author,
                                               article_category=article_category)
            serialized_article = BaseController.clean_object(new_article, "id")
            return JsonResponse(serialized_article, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e).strip()}, status=500)

    @staticmethod
    @csrf_exempt
    @require_http_methods(['PUT'])
    @AuthorisationMiddleware.jwt_check_admin_check()
    def update_article(request, article_index):    
        try:
            new_values = json.loads(request.body)
            try:
                NewsArticle.objects.get(id=article_index)
                
            except:
                title = new_values["title"]
                summary = new_values["summary"]
                content = new_values["content"]
                published = new_values.get("published", False)
                published_date = new_values.get("published_date")

                if (published and not published_date) or (published_date and not published):
                    return JsonResponse({"message": "If article is published then it needs a published date. If it's not published then it cannot have a published date."}, status=400)

                article_author = Author.objects.get(id=new_values.get("author"))
                article_category = NewsCategory.objects.get(id=new_values.get("category"))
                new_article = NewsArticle.objects.create(id=article_index,
                                                        title=title,
                                                        summary=summary,
                                                        content=content,
                                                        published=published,
                                                        published_date=datetime.strptime(published_date, "%Y-%m-%d").date(),
                                                        article_author=article_author,
                                                        article_category=article_category)
                serialized_updated_article = BaseController.clean_object(new_article, "id")

                return JsonResponse(serialized_updated_article, status=200)
            new_values["published_date"] = datetime.strptime(new_values.get("published_date"), "%Y-%m-%d").date() if new_values.get("published_date") else None
            
            if (new_values.get("published") and not new_values.get("published_date")) or (new_values.get("published_date") and not new_values.get("published")  ):
                return JsonResponse({"message": "If article is published then it needs a published date. If it's not published then it cannot have a published date."}, status=400)
            
            updated_article,_= NewsArticle.objects.update_or_create(id=article_index, defaults=new_values)
            serialized_updated_article = BaseController.clean_object(updated_article, "id")
            return JsonResponse(serialized_updated_article, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e).strip()}, status=500)

    @staticmethod
    @csrf_exempt
    @require_http_methods(['DELETE'])
    @AuthorisationMiddleware.jwt_check_admin_check()
    def delete_article(_, article_index):
        try:
            existing_article = NewsArticle.objects.get(id=article_index)
        except:
            return JsonResponse({"message": "Article does not exist."}, status=404)
        try:
            existing_article.delete()
            return JsonResponse({"message": "Article deleted."}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e).strip()}, status=500)