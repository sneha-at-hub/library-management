from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from libraryapi.models import User, Student
from libraryapi.serializers import UserSerializer, StudentSerializer


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
    