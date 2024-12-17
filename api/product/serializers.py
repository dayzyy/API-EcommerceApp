from rest_framework import serializers

from .models import Product

class BaseProductSerializer(serializers.ModelSerializer):
    created_at = serializers.SerializerMethodField()

    class Meta:
        model = Product
        exclude = ['is_ordered']

    def get_created_at(self, product):
        return product.created_at.strftime('%Y %m %d')

class CompactProductSerializer(BaseProductSerializer):
    created_at = None
        
    class Meta(BaseProductSerializer.Meta):
        exclude = ['is_ordered', 'created_at', 'description']
