from django.contrib.auth.backends import BaseBackend

from .models import Account

class AccountBackend(BaseBackend):
    def authenticate(self, request, username, password):
        try:
            user = Account.objects.get(email=username)

            if user.check_password(password):
                return user

        except Account.DoesNotExist:
            return None

        return None

    def get_user(self, user_id):
        try:
            user = Account.objects.get(pk=user_id)
            return user

        except Account.DoesNotExist:
            return None
