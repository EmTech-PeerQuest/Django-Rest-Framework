from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet, PostListDetailfilter, PostList, PostDetail, PostSearch

app_name = 'blog_api'

router = DefaultRouter()
router.register(r'posts', PostViewSet, basename='post')

urlpatterns = [
    path('posts/', PostDetail.as_view(), name='detailcreate'),
    #path('search/', PostSearch.as_view(), name='postsearch'),
    path('', include(router.urls)),
    path('', PostList.as_view(), name='listcreate'),
    path('search/', PostListDetailfilter.as_view(), name='postsearch'),
]
