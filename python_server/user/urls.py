from django.urls import path
from . import views

urlpatterns = [
    path('signin', views.signin, name="user_signin"),
    path('signup', views.signup, name="user_signup")
]