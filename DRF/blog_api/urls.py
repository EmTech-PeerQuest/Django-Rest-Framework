from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet, PostListDetailfilter

app_name = 'blog_api'

router = DefaultRouter()
router.register(r'posts', PostViewSet, basename='post')

urlpatterns = [
    path('', include(router.urls)),
    path('search/', PostListDetailfilter.as_view(), name='postsearch'),
]
