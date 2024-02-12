from django.urls import re_path, path
from . import views

urlpatterns = [
    path('', views.get_posts, name="getPosts"),
    path('post', views.create_post, name="createPost"),
    path('search/', views.get_posts_by_search, name="getPostsBySearch"),
    re_path(r'(?P<id>[\d\w]+)$', views.get_single_post, name="getSinglePost"),
    re_path(r'^(?P<id>[\d\w]+)/update', views.update_post, name="updatePost"),
    re_path(r'^(?P<id>[\d\w]+)/delete', views.delete_post, name="deletePost"),
    re_path(r'^(?P<id>[\d\w]+)/likePost', views.like_post, name="likePost"),
    re_path(r'^(?P<id>[\d\w]+)/commentPost', views.commentPost, name="commentPost")
]