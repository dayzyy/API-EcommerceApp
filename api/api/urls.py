from django.contrib import admin
from django.urls import path, include

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('token/obtain', TokenObtainPairView.as_view(), name='obtain-token'),
    path('token/refresh', TokenRefreshView.as_view(), name='refresh-token')
]
