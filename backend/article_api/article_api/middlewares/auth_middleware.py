import jwt
from functools import wraps
from django.http import JsonResponse


class AuthorisationMiddleware:

    @staticmethod
    def check_admin_priveleges(func):
        @wraps(func)
        def inner(request, *args, **kwargs):
            token = request.headers.get("Authorization")
            if not token:
                return JsonResponse({"message": "Token not found"}, status=401)
            
            token = token.split()[1]
            try:
                decoded_token = jwt.decode(token)
            except:
                return JsonResponse({"message": "Token invalid or expired"}, status=401)
            