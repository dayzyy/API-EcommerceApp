from django.urls import path

from .views import get, all

urlpatterns = [
    path('<int:id>/', get, name='get-product'),
    path('all/', all, name='get-products')
]
