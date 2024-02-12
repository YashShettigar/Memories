from django.urls import path
from . import views

urlpatterns = [
    path('', views.welcome, name="apiHome"),
    path('register', views.register_api_client, name="registerAPIClient")
]