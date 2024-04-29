import json

from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt


class AuthorisationController:

    def login():
        pass



@csrf_exempt
@require_http_methods(['POST'])
def login(request):
    request_body = json.loads(request.body)
