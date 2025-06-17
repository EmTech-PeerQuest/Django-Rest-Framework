from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet, PostListDetailfilter, PostQueryRetrieveView

app_name = 'blog_api'

router = DefaultRouter()
router.register('posts', PostViewSet, basename='post')

urlpatterns = [
    path('', include(router.urls)),
    path('posts/search/', PostListDetailfilter.as_view(), name='postsearch'),
    path('posts/query/', PostQueryRetrieveView.as_view(), name='postquery'),  # 🔥 New route
]
