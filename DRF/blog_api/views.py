from rest_framework import generics, viewsets, filters, permissions
from rest_framework.permissions import SAFE_METHODS, BasePermission, AllowAny, IsAuthenticated
from django.shortcuts import get_object_or_404
from blog.models import Post
from .serializers import PostSerializer
from rest_framework.generics import ListAPIView

# ✅ Custom permission to allow only authors to edit/delete
class PostUserWritePermission(BasePermission):
    message = 'Editing posts is restricted to the author only.'

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.author == request.user


# ✅ List or create post
class PostList(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = Post.postobjects.all()
    serializer_class = PostSerializer


# ✅ ViewSet for full CRUD using slug
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.postobjects.all()
    serializer_class = PostSerializer
    lookup_field = 'slug'

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAuthenticated(), PostUserWritePermission()]
        return [AllowAny()]


# ✅ Filter posts using title or slug (search)

class PostListDetailFilter(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['$title', 'slug']



# ✅ Search using regex/slugs (for admin or advanced search)
class PostSearch(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['^slug']  # starts-with


# ✅ Get single post by slug or title via query params (?slug=... or ?title=...)
class PostQueryRetrieveView(generics.RetrieveAPIView):
    serializer_class = PostSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        slug = self.request.query_params.get('slug')
        title = self.request.query_params.get('title')
        if slug:
            return get_object_or_404(Post, slug=slug)
        elif title:
            return get_object_or_404(Post, title=title)
        raise ValueError("Please provide 'slug' or 'title' as query parameter.")


# ✅ Retrieve, update or delete post (author-only)
class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, PostUserWritePermission]
    queryset = Post.objects.all()
    serializer_class = PostSerializer


# ✅ Admin-specific views (create, retrieve, update, delete)
class AdminPostDetail(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class CreatePost(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class EditPost(generics.UpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class DeletePost(generics.RetrieveDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

class AdminPostListView(ListAPIView):
    permission_classes = [permissions.IsAuthenticated]  # Or AllowAny for testing
    queryset = Post.objects.all()
    serializer_class = PostSerializer


    # def get_object(self, queryset=None, **kwargs):
    #     item = self.kwargs.get('pk')
    #     return get_object_or_404(Post, slug=item)

    # Define Custom Queryset
    # def get_queryset(self):
    #     return Post.objects.all()


# class PostList(viewsets.ViewSet):
#     permission_classes = [IsAuthenticated]
#     queryset = Post.postobjects.all()

#     def list(self, request):
#         serializer_class = PostSerializer(self.queryset, many=True)
#         return Response(serializer_class.data)

#     def retrieve(self, request, pk=None):
#         post = get_object_or_404(self.queryset, pk=pk)
#         serializer_class = PostSerializer(post)
#         return Response(serializer_class.data)

    # def list(self, request):
    #     pass

    # def create(self, request):
    #     pass

    # def retrieve(self, request, pk=None):
    #     pass

    # def update(self, request, pk=None):
    #     pass

    # def partial_update(self, request, pk=None):
    #     pass

    # def destroy(self, request, pk=None):
    #     pass

    # class PostList(viewsets.ModelViewSet):
    #     permission_classes = [IsAuthenticated]
    #     queryset = Post.postobjects.all()
    #     serializer_class = PostSerializer

""" Concrete View Classes
#CreateAPIView
Used for create-only endpoints.
#ListAPIView
Used for read-only endpoints to represent a collection of model instances.
#RetrieveAPIView
Used for read-only endpoints to represent a single model instance.
#DestroyAPIView
Used for delete-only endpoints for a single model instance.
#UpdateAPIView
Used for update-only endpoints for a single model instance.
##ListCreateAPIView
Used for read-write endpoints to represent a collection of model instances.
RetrieveUpdateAPIView
Used for read or update endpoints to represent a single model instance.
#RetrieveDestroyAPIView
Used for read or delete endpoints to represent a single model instance.
#RetrieveUpdateDestroyAPIView
Used for read-write-delete endpoints to represent a single model instance.
"""