from django.urls import path

from .views import get, all, in_sale

urlpatterns = [
    path('<int:id>/', get, name='get-product'),
    path('all/', all, name='get-products'),
    path('sale/', in_sale, name='get-products-in-sale')
]
