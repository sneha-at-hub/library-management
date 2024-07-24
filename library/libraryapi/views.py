from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from libraryapi.models import User, Student, Author, Category, Publisher, Book, Borrowing, Reservation
from libraryapi.serializers import UserSerializer, StudentSerializer, AuthorSerializer, CategorySerializer, PublisherSerializer, BookSerializer, BorrowingSerializer, ReservationSerializer


# Create your views here.

# ==========================================        =========================================== 
#                                            USERS
# ==========================================       ===========================================
@api_view(['GET'])
def user_list(request):
    queryset = User.objects.all()
    serializer = UserSerializer(queryset, many=True)
    return Response(serializer.data)


@api_view(['PATCH'])
def update_user(request, pk):
    queryset = User.objects.get(pk=pk)
    data = UserSerializer(instance=queryset, data=request.data)
    
    if data.is_valid():
        data.save()
        return Response(data.data)
    else:
        return Response(data.errors)
    
@api_view(['POST'])
def create_user(request):
    serializer=UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors)
    

@api_view(['DELETE'])
def deleteUser(request, pk):
    user = get_object_or_404(User, pk=pk)
    user.delete()
    return Response({"message": "User deleted successfully"}, status=status.HTTP_202_ACCEPTED)
    
    
    
    
# ==========================================        =========================================== 
#                                            STUDENTS
# ==========================================       ===========================================




@api_view(['GET'])
def getStudents(request):
    student = Student.objects.all()
    serializer = StudentSerializer(student, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def createStudents(request):
    serializer = StudentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()  
        return Response(serializer.data)
    return Response(serializer.errors)

@api_view(['PATCH'])
def updateStudents(request, pk):
    student = Student.objects.get(pk=pk)
    data = StudentSerializer(instance=student, data=request.data)
    if data.is_valid():
        data.save()
        return Response(data.data)
    return Response(data.errors)

@api_view(['DELETE'])
def deleteStudents(request, pk):
    student = get_object_or_404(Student, pk=pk)
    student.delete()
    return Response({"message": "Student deleted"}, status=status.HTTP_202_ACCEPTED)
    
#for author
@api_view(['GET'])
def getAuthors(request):
    data = Author.objects.all()
    serializer = AuthorSerializer(data, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def createAuthours(request):
    serailizer = AuthorSerializer(data=request.data)
    if serailizer.is_valid():
        serailizer.save()
        return Response(serailizer.data)
    return Response(serailizer.errors)


@api_view(['PATCH'])
def updateAuthors(request, pk):
    data = Author.objects.get(pk=pk)
    serializer = AuthorSerializer(instance=data,data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)






# ==========================================            =========================================== 
#                                             CATEGORY
# ==========================================            ===========================================
@api_view(['GET'])
def getcategory(request):
    data = Category.objects.all()
    serializer = CategorySerializer(data, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def createCategory(request):
    serializer = CategorySerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)

@api_view(['PATCH'])
def updateCategory(request, pk):
    category = Category.objects.get(pk=pk)
    serializer = CategorySerializer(instance=category, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)
    
@api_view(['DELETE'])
def deleteCategory(request, pk):
    data = get_object_or_404(Category, pk=pk)
    data.delete()
    return Response({"message": "Deleted data successfully"}, status=status.HTTP_202_ACCEPTED)




# ==========================================            =========================================== 
#                                            PUBLICATION
# ==========================================            ===========================================




@api_view(['GET'])
def getPublisher(request):
    data = Publisher.objects.all()
    serializer = PublisherSerializer(data, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def createPublisher(request):
    serializer = PublisherSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)

@api_view(['PATCH'])
def updatePublisher(request, pk):
    category = Publisher.objects.get(pk=pk)
    serializer = PublisherSerializer(instance=category, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)
    
@api_view(['DELETE'])
def deletePublisher(request, pk):
    data = get_object_or_404(Publisher, pk=pk)
    data.delete()
    return Response({"message": "Deleted data successfully"}, status=status.HTTP_202_ACCEPTED)


# ==========================================            =========================================== 
#                                              BOOKS
# ==========================================            ===========================================

@api_view(['POST'])
def createBooks(request):
    serializer = BookSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)

@api_view(['GET'])
def getBooks(request):
    data = Book.objects.all()
    serializer = BookSerializer(data, many=True)
    return Response(serializer.data)

@api_view(['PATCH'])
def updateBooks(request, pk):
    data = Book.objects.get(pk=pk)
    serializer = BookSerializer(instance=data, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)

@api_view(['DELETE'])
def deleteBooks(request, pk):
    data = get_object_or_404(Book, pk=pk)
    data.delete()
    return Response({"message": "Deleted data successfully"}, status=status.HTTP_202_ACCEPTED)
    


# ==========================================            =========================================== 
#                                            BORROWINGS
# ==========================================            ===========================================

@api_view(['POST'])
def createBorrowing(request):
    serializer = BorrowingSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)

@api_view(['GET'])
def getBorrowing(request):
    data = Borrowing.objects.all()
    serializer = BorrowingSerializer(data, many=True)
    return Response(serializer.data)

@api_view(['PATCH'])
def updateBorrowing(request, pk):
    data = Borrowing.objects.get(pk=pk)
    serializer = BorrowingSerializer(instance=data, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)

@api_view(['DELETE'])
def deleteBorrowing(request, pk):
    data = get_object_or_404(Borrowing, pk=pk)
    data.delete()
    return Response({"message": "Deleted data successfully"}, status=status.HTTP_202_ACCEPTED)


# ==========================================            =========================================== 
#                                            RESERVATION
# ==========================================            ===========================================

@api_view(['POST'])
def createReservation(request):
    serializer = ReservationSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)

@api_view(['GET'])
def getReservation(request):
    data = Reservation.objects.all()
    serializer = ReservationSerializer(data, many=True)
    return Response(serializer.data)

@api_view(['PATCH'])
def updateReservation(request, pk):
    data = Reservation.objects.get(pk=pk)
    serializer = ReservationSerializer(instance=data, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)

@api_view(['DELETE'])
def deleteReservation(request, pk):
    data = get_object_or_404(Reservation, pk=pk)
    data.delete()
    return Response({"message": "Deleted data successfully"}, status=status.HTTP_202_ACCEPTED)