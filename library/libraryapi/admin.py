from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import User, Student, Author, Category, Publisher, Book, Borrowing, Reservation

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'first_name', 'last_name', 'email', 'phone_number', 'address', 'membership_date')
    search_fields = ('username', 'first_name', 'last_name', 'email')
    list_filter = ('membership_date',)

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('user', 'library_id', 'phone_number', 'address', 'membership_date')
    search_fields = ('user', 'phone_number')
    list_filter = ('membership_date',)

@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'birth_date')
    search_fields = ('first_name', 'last_name')
    list_filter = ('birth_date',)

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(Publisher)
class PublisherAdmin(admin.ModelAdmin):
    list_display = ('name', 'address', 'phone_number', 'email')
    search_fields = ('name', 'phone_number', 'email')
    list_filter = ('address',)

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'category', 'publisher', 'publication_year', 'isbn', 'copies_available')
    search_fields = ('title', 'author__first_name', 'author__last_name', 'isbn')
    list_filter = ('publication_year', 'category', 'publisher')

@admin.register(Borrowing)
class BorrowingAdmin(admin.ModelAdmin):
    list_display = ('student', 'book', 'borrowing_date', 'return_date')
    search_fields = ('student__user', 'book__title')
    list_filter = ('borrowing_date', 'return_date')

@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ('student', 'book', 'reservation_date', 'status')
    search_fields = ('student__user', 'book__title')
    list_filter = ('status', 'reservation_date')
