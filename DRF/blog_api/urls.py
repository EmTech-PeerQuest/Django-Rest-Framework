from django.urls import path
from .views import PostList, PostDetail, PostSearch, PostListDetailfilter

app_name = 'blog_api'

urlpatterns = [
    path('posts/', PostDetail.as_view(), name='detailcreate'),
    #path('search/', PostSearch.as_view(), name='postsearch'),
    path('search/', PostListDetailfilter.as_view(), name='postsearch'),
    path('', PostList.as_view(), name='listcreate'),
]