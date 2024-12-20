from rest_framework import serializers

from .models import Account

class AccountSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()

    class Meta:
        model = Account
        fields = ['email', 'username']

    def get_username(self, account):
        tmp = account.email.split('@')
        return f'@{tmp[0]}'
