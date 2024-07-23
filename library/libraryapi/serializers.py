from rest_framework import serializers
from libraryapi.models import User, Student, Author, Category, Publisher, Book, Borrowing, Reservation

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

    def validate(self, data):
        if not User.objects.filter(username=data['user']).exists():
            raise serializers.ValidationError(f"User {data['user']} does not exist.")
        return data

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class PublisherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publisher
        fields = '__all__'

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

class BorrowingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Borrowing
        fields = '__all__'

    def validate(self, data):
        if Borrowing.objects.filter(student=data['student'], book=data['book'], return_date__isnull=True).exists():
            raise serializers.ValidationError(f"{data['student']} is already borrowing {data['book']}.")
        if Borrowing.objects.filter(book=data['book'], return_date__isnull=True).count() >= data['book'].copies_available:
            raise serializers.ValidationError(f"No available copies of {data['book']} for borrowing.")
        return data

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'