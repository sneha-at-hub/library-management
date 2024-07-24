from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from libraryapi.models import User, Student, Author, Category
from libraryapi.serializers import UserSerializer, StudentSerializer, AuthorSerializer, CategorySerializer


# Create your views here.
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
    
#for students
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


#for category
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