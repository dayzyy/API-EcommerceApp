from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import Response

from .models import Product
from .serializers import BaseProductSerializer, CompactProductSerializer

@api_view(['GET'])
@permission_classes([AllowAny])
def get(request, id):
    try:
        product = Product.objects.get(pk=id)
    except Product.DoesNotExist:
        return Response(status=404)

    data = BaseProductSerializer(product).data

    return Response(data, status=200)

@api_view(['GET'])
@permission_classes([AllowAny])
def all(request):
    products = Product.objects.filter(sale__isnull=True, ordered_by__isnull=True)
    data = CompactProductSerializer(products, many=True).data

    return Response(data, status=200)

@api_view(['GET'])
@permission_classes([AllowAny])
def in_sale(request):
    products = Product.objects.filter(sale__isnull=False, ordered_by__isnull=True)
    data = CompactProductSerializer(products, many=True).data

    return Response(data, status=200)

@api_view(['POST'])
@permission_classes([AllowAny])
def in_cart(request):
    ids = request.data['ids']

    products = (Product.objects.filter(id__in=ids))

    data = CompactProductSerializer(products, many=True).data

    return Response(data, status=200)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def order(request):
    ids = request.data['ids']

    products = Product.objects.filter(id__in=ids)

    for product in products:
        product.ordered_by = request.user
        product.save()

    return Response(status=200)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def ordered_products(request):
    ids = request.data['ids']

    products = Product.objects.filter(id__in=ids)

    data = CompactProductSerializer(products, many=True).data

    return Response(data, status=200)
