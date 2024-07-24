from django.urls import path
from .import views

urlpatterns = [
   path('users/', views.user_list, name="user_list"),
   path('create/users/', views.create_user, name="create_user"),
   path('update/users/<int:pk>/', views.update_user, name="update_user"),
]