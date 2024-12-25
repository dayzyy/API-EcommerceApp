from django.urls import path

from .views import get, all, in_cart, in_sale, order, ordered_products

urlpatterns = [
    path('<int:id>/', get, name='get-product'),
    path('all/', all, name='get-products'),
    path('sale/', in_sale, name='get-products-in-sale'),
    path('cart/', in_cart, name='get-products-in-cart'),
    path('order/', order, name='order'),
    path('ordered/', ordered_products, name='ordered-products')
]
