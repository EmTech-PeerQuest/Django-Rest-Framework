from rest_framework import viewsets, filters
from blog.models import Post
from .serializers import PostSerializer
from rest_framework.permissions import SAFE_METHODS, BasePermission, AllowAny
from rest_framework.generics import ListAPIView


# Custom permission: only the author can edit/delete
class PostUserWritePermission(BasePermission):
    message = 'Editing posts is restricted to the author only.'

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.author == request.user


# ViewSet for Post model using routers
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.postobjects.all()
    serializer_class = PostSerializer

    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy']:
            return [PostUserWritePermission()]
        return [AllowAny()]


# Optional: Search endpoint
class PostListDetailfilter(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['$title']
