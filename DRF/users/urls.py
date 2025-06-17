from django.urls import path
from .views import CustomUserCreate, BlacklistTokenUpdateView
from .views import LogoutView

app_name = 'users'

urlpatterns = [
    path('register/', CustomUserCreate.as_view(), name="create_user"),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(),
         name='blacklist'),
    path('logout/blacklist/', LogoutView.as_view(), name='logout'),
]