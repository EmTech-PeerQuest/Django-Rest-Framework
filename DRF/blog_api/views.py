from rest_framework import viewsets, filters
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import SAFE_METHODS, BasePermission, AllowAny, IsAuthenticated
from rest_framework.response import Response
from blog.models import Post
from .serializers import PostSerializer
from django.shortcuts import get_object_or_404


class PostUserWritePermission(BasePermission):
    message = 'Editing posts is restricted to the author only.'

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.author == request.user


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.postobjects.all()
    serializer_class = PostSerializer
    lookup_field = 'slug'

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAuthenticated(), PostUserWritePermission()]
        return [AllowAny()]


class PostListDetailfilter(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'slug']


# ✅ New View: Retrieve a single post using query param (?slug=... or ?title=...)
class PostQueryRetrieveView(RetrieveAPIView):
    serializer_class = PostSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        slug = self.request.query_params.get('slug')
        title = self.request.query_params.get('title')
        if slug:
            return get_object_or_404(Post, slug=slug)
        elif title:
            return get_object_or_404(Post, title=title)
        else:
            raise ValueError("Please provide 'slug' or 'title' as query parameter.")
