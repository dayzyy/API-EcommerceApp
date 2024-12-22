from rest_framework.decorators import api_view,  permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import Response
import json
from django.core.validators import EmailValidator
from django.core.exceptions import ValidationError

from .models import Account
from .serializers import AccountSerializer

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    credentials = json.loads(request.body)

    try:
        validator = EmailValidator()
        validator(credentials['email'])
    except ValidationError:
        return Response({"error": "Invalid email!"}, status=400)

    try:
        Account.objects.get(email=credentials['email'])
        return Response({"error": "Email already in use!"}, status=400)
    except Account.DoesNotExist:
        pass

    if len(credentials['password']) < 5:
        return Response({"error": "Password must be at least 5 characters long!"}, status=400)
    if credentials['password'] != credentials['password2']:
        return Response({"error": "Passwords did not match!"}, status=400)

    Account.objects.create_user(email=credentials['email'], password=credentials['password'])

    return Response(status=200)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user(request):
    data = AccountSerializer(request.user).data

    return Response(data, status=200)
