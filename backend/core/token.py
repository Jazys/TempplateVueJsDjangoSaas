from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class CutomTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(CutomTokenObtainPairSerializer, cls).get_token(user)
        token['name'] = user.username
        token['user_id'] = user.id

        return token


class CutomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CutomTokenObtainPairSerializer



