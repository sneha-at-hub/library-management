from rest_framework.decorators import api_view
from rest_framework.response import Response
from libraryapi.models import User
from libraryapi.serializers import UserSerializer


# Create your views here.
@api_view(['GET'])
def user_list(request):
    queryset = User.objects.all()
    serializer = UserSerializer(queryset, many=True)
    return Response(serializer.data)
