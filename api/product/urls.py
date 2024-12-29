from django.urls import path

from .views import get, all, in_sale, Order, ordered_products, cancel_order, filter

urlpatterns = [
    path('<int:id>/', get, name='get-product'),
    path('all/', all, name='get-products'),
    path('sale/', in_sale, name='get-products-in-sale'),
    path('<str:category>/', filter, name='get-product-of-category'),
    path('order/', Order.as_view(), name='order'),
    path('ordered/', ordered_products, name='ordered-products'),
    path('ordered/cancel/<int:id>/', cancel_order, name='cancel-order')
]
