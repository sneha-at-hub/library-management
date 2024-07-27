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
   path('category/update/<int:pk>/', views.updateCategory, name="updateCategory"),
   path('category/', views.getcategory, name="getcategory"),
   path('category/<int:pk>/delete/', views.deleteCategory, name="deleteCategory"),
   
   
   path('publisher/create/', views.createPublisher, name="createPublisher"),
   path('publisher/update/<int:pk>', views.updatePublisher, name="updatePublisher"),
   path('publisher/', views.getPublisher, name="getPublisher"),
   path('publisher/<int:pk>/delete/', views.deletePublisher, name="deletePublisher"),
   
   path('books/create', views.createBooks, name="createBooks"),
   path('books/', views.getBooks, name="getBooks"),
   path('books/update/<int:pk>', views.updateBooks, name="updateBooks"),
   path('books/<int:pk>/delete/', views.deleteBooks, name="deleteBooks"),
   
   
   path('borrowing/create/', views.createBorrowing, name="createBorrowing"),
   path('borrowing/', views.getBorrowing, name="getBorrowing"),
   path('borrowing/update/<int:pk>/', views.updateBorrowing, name="updateBorrowing"),
   path('borrowing/<int:pk>/delete/', views.deleteBorrowing, name="deleteBorrowing"),
   
   path('reservation/create/', views.createReservation, name="createReservation"),
   path('reservation/', views.getReservation, name="getReservation"),
   path('reservation/update/<int:pk>/', views.updateReservation, name="updateReservation"),
   path('reservation/<int:pk>/delete/', views.deleteReservation, name="deleteReservation"),
   
   
   
]