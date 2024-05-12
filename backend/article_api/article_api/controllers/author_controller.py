import json

from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.urls import path
from django.http import JsonResponse

from ..models.author_model import Author
from .base_controller import BaseController
from ..middlewares.auth_middleware import AuthorisationMiddleware


class AuthorsController(BaseController):

    @staticmethod
    @csrf_exempt
    @require_http_methods(['GET']) 
    @AuthorisationMiddleware.jwt_check_admin_check(user_accessible=True)
    def get_author(_, author_index):
        """
        Method for fetching a single author based on given index.
        params:
            _ (GET request but we don't use it)
            author_index: int. Unique identifier for author. (provided in url)
        returns:
            JsonResponse with appropriate status and payload
        """
        try:
            existing_author = Author.objects.get(id=author_index)
            serialized_author = BaseController.clean_object(existing_author, "id")
            return JsonResponse(serialized_author, status=200)
        except:
            return JsonResponse({"message": "author does not exist."}, status=404)

    @staticmethod
    @csrf_exempt
    @require_http_methods(['GET']) 
    @AuthorisationMiddleware.jwt_check_admin_check(user_accessible=True)
    def get_all_authors(_):
        """
        Method for fetching all authors in the DB.
        params:
            _ (GET request but we don't use it)
        returns:
            JsonResponse with appropriate status and payload
        """
        try:
            all_authors = Author.objects.all()
            serialized_authors = []
            for author in all_authors:
                serialized_authors.append(BaseController.clean_object(author, "id"))
            return JsonResponse(serialized_authors, status=200, safe=False)
        except Exception as e:
            return JsonResponse({"error": str(e).strip()}, status=500)
    
    @staticmethod
    @csrf_exempt
    @require_http_methods(['POST'])
    @AuthorisationMiddleware.jwt_check_admin_check()
    def create_author(request):
        """
        Method for creating an author.
        params:
            request. POST request body should be in the following format:
                {   
                    "name": "String",
                    "surname": "String",
                    "job_description": "String"
                }
        returns:
            JsonResponse with appropriate status and payload
        """
        request_body = json.loads(request.body)
        try:
            author_name = request_body["name"]
            author_surname = request_body["surname"]
            author_job_description = request_body["job_description"]
        except:
            return JsonResponse({"message": "Please provide a name, surname and job_description for the autho."}, status=400)
        
        try:
            new_author = Author.objects.create(name=author_name,
                                               surname=author_surname,
                                               job_description=author_job_description)
            serialized_author = BaseController.clean_object(new_author, "id")
            return JsonResponse(serialized_author, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e).strip()}, status=500)

    @staticmethod
    @csrf_exempt
    @require_http_methods(['PUT'])
    @AuthorisationMiddleware.jwt_check_admin_check()
    def update_author(request, author_index):
        """
        Method for updating or creating an author.
        params:
            request. PUT request body should be in the following format:
                {   
                    "name": "String",
                    "surname": "String",
                    "job_description": "String"
                }
            author_index. int.  If author exists then we update author based on the request payload. 
                                If not we create a new author with the specific index.
                                (provided in url)
        returns:
            JsonResponse with appropriate status and payload
        """
        try:
            new_values = json.loads(request.body)
            updated_author,_= Author.objects.update_or_create(id=author_index, defaults=new_values)
            serialized_updated_author = BaseController.clean_object(updated_author, "id")
            return JsonResponse(serialized_updated_author, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e).strip()}, status=500)

    @staticmethod
    @csrf_exempt
    @require_http_methods(['DELETE'])
    @AuthorisationMiddleware.jwt_check_admin_check()
    def delete_author(_, author_index):
        """
        Method for deleting an author.
        params:
            _ (DELETE request but we don't use it)
            author_index: int. Unique identifier for author (provided in url)
        returns:
            JsonResponse with appropriate status and payload
        """
        try:
            existing_author = Author.objects.get(id=author_index)
        except:
            return JsonResponse({"message": "Author does not exist."}, status=404)
        try:
            existing_author.delete()
            return JsonResponse({"message": "Author deleted."}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e).strip()}, status=500)