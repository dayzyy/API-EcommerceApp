from rest_framework import serializers

from .models import Product
from user.serializers import AccountSerializer

class BaseProductSerializer(serializers.ModelSerializer):
    created_at = serializers.SerializerMethodField()

    class Meta:
        model = Product
        exclude = ['ordered_by']

    def get_created_at(self, product):
        return product.created_at.strftime('%Y %m %d')

class CompactProductSerializer(BaseProductSerializer):
    created_at = None
        
    class Meta(BaseProductSerializer.Meta):
        exclude = ['ordered_by', 'created_at', 'description']
