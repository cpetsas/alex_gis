import jwt
import os
from functools import wraps
from django.http import JsonResponse
from ..models.user_model import User

class AuthorisationMiddleware:

    @staticmethod
    def jwt_check_admin_check(user_accessible = False):
        def decorated_jwt_check_admin_check(func):
            @wraps(func)
            def inner(request, *args, **kwargs):
                token = request.headers.get("Authorization")
                if not token:
                    return JsonResponse({"message": "Token not found"}, status=401)
                
                token = token.split()[1]
                try:
                    decoded_token = jwt.decode(token, os.environ.get("SECRET_KEY"), algorithms=['HS256'])
                    user = User.objects.get(username=decoded_token.get("username"), token=decoded_token.get("user_token"))
                    if not user_accessible:
                        if user.role not in ["admin", "superadmin"]:
                            return JsonResponse({"message": "Access Denied"}, status=403)
                except:
                    return JsonResponse({"message": "Token invalid or expired"}, status=401)
                
                return func(request, *args, **kwargs)

            return inner
        return decorated_jwt_check_admin_check
            