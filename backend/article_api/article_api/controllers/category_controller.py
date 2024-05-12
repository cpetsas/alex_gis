import json

from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.urls import path
from django.http import JsonResponse

from ..models.category_model import NewsCategory
from .base_controller import BaseController
from ..middlewares.auth_middleware import AuthorisationMiddleware


class CategoriesController(BaseController):


    @staticmethod
    @csrf_exempt
    @require_http_methods(['POST'])
    @AuthorisationMiddleware.jwt_check_admin_check()
    def create_category(request):
        """
        Method for creating a category.
        params:
            request. POST request body should be in the following format:
                {   
                    "name": "String",
                    "description": "String
                }
        returns:
            JsonResponse with appropriate status and payload
        """
        request_body = json.loads(request.body)
        try:
            category_name = request_body["name"]
            description = request_body["description"]
        except:
            return JsonResponse({"message": "Please provide a category name and description."}, status=400)
        
        try:
            existing_category = NewsCategory.objects.get(name=category_name)
        except:
            existing_category = None

        if existing_category:
            return JsonResponse({"message": "Category with such a name already exists. Category name must be unique."}, status=400)

        try:
            new_category = NewsCategory.objects.create(name=category_name, description=description)
            serialized_category = BaseController.clean_object(new_category, "id")
            return JsonResponse(serialized_category, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e).strip()}, status=500)

    @staticmethod
    @csrf_exempt
    @require_http_methods(['GET']) 
    @AuthorisationMiddleware.jwt_check_admin_check(user_accessible=True)
    def get_category(_, category_index):
        """
        Method for fetching a single category based on given index.
        params:
            _ (GET request but we don't use it)
            catagory_index: int. Unique identifier for category. (provided in url)
        returns:
            JsonResponse with appropriate status and payload
        """
        try:
            existing_category = NewsCategory.objects.get(id=category_index)
            serialized_category = BaseController.clean_object(existing_category, "id")
            return JsonResponse(serialized_category, status=200)
        except:
            return JsonResponse({"message": "Category does not exist."}, status=404)

    @staticmethod
    @csrf_exempt
    @require_http_methods(['GET']) 
    @AuthorisationMiddleware.jwt_check_admin_check(user_accessible=True)
    def get_all_categories(_):
        """
        Method for fetching all categories in the DB.
        params:
            _ (GET request but we don't use it)
        returns:
            JsonResponse with appropriate status and payload
        """
        try:
            all_categories = NewsCategory.objects.all()
            serialized_categories = []
            for category in all_categories:
                serialized_categories.append(BaseController.clean_object(category, "id"))
            return JsonResponse(serialized_categories, status=200, safe=False)
        except Exception as e:
            return JsonResponse({"error": str(e).strip()}, status=500)

    @staticmethod
    @csrf_exempt
    @require_http_methods(['PUT'])
    @AuthorisationMiddleware.jwt_check_admin_check()
    def update_category(request, category_index):
        """
        Method for updating or creating a category.
        params:
            request. PUT request body should be in the following format:
                {   
                    "name": "String",
                    "description": "String
                }
            category_index. int.  If category exists then we update the category based on the request payload. 
                                If not we create a new category with the specific index.
                                (provided in url)
        returns:
            JsonResponse with appropriate status and payload
        """
        try:
            new_values = json.loads(request.body)
            updated_category,_= NewsCategory.objects.update_or_create(id=category_index, defaults=new_values)
            serialized_updated_category = BaseController.clean_object(updated_category, "id")
            return JsonResponse(serialized_updated_category, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e).strip()}, status=500)

    @staticmethod
    @csrf_exempt
    @require_http_methods(['DELETE'])
    @AuthorisationMiddleware.jwt_check_admin_check()
    def delete_category(_, category_index):
        """
        Method for deleting a category.
        params:
            _ (DELETE request but we don't use it)
            category_index: int. Unique identifier for category (provided in url)
        returns:
            JsonResponse with appropriate status and payload
        """
        try:
            existing_category = NewsCategory.objects.get(id=category_index)
        except:
            return JsonResponse({"message": "Category does not exist."}, status=404)
        try:
            existing_category.delete()
            return JsonResponse({"message": "Category deleted."}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e).strip()}, status=500)
    
