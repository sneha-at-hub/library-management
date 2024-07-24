from django.urls import path
from .import views

urlpatterns = [
   path('users/', views.user_list, name="user_list"),
   path('create/users/', views.create_user, name="create_user"),
   path('update/users/<int:pk>/', views.update_user, name="update_user"),
   path('user/<int:pk>/delete/', views.deleteUser, name="deleteUser"),
   path('students/', views.getStudents, name="getStudents"),
   path('students/create/', views.createStudents, name="createStudents"),
   path('students/update/<int:pk>/', views.updateStudents, name="updateStudents"),
   path('authors/', views.getAuthors, name="getAuthors"),
   path('authors/create/', views.createAuthours, name="createAuthours"),
   path('authors/update/<int:pk>/', views.updateAuthors, name="updateAuthors"),
   path('category/create/', views.createCategory, name="createCategory"),
   path('category/update/<int:pk>', views.updateCategory, name="updateCategory"),
   path('category/', views.getcategory, name="getcategory"),
   path('category/<int:pk>/delete/', views.deleteCategory, name="deleteCategory"),
]