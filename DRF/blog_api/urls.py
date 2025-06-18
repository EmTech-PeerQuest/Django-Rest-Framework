from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PostViewSet,
    PostListDetailfilter,
    PostDetail,
    PostQueryRetrieveView
)

app_name = 'blog_api'

router = DefaultRouter()
router.register('posts', PostViewSet, basename='post')

urlpatterns = [
    path('', include(router.urls)),  # Handles /posts/ (list, detail, create, update, delete)
    path('posts/by-slug/', PostDetail.as_view(), name='post-by-slug'),  # For ?slug=... lookups
    path('search/', PostListDetailfilter.as_view(), name='postsearch'),  # Search by title or slug
    path('posts/query/', PostQueryRetrieveView.as_view(), name='postquery'),  # Get single post by ?slug= or ?title=
]

