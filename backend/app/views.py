from rest_framework import permissions

from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.throttling import UserRateThrottle

from .forms import UploadFileForm

from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView, ListAPIView

from . import serializers
from . import models

from rest_framework.renderers import JSONRenderer

from django.conf import settings

from secrets import token_hex

import digitalocean
import traceback

"""
    A simple REST API, for accessing to a model
"""
class CustomRolesPost(ListCreateAPIView):
    throttle_classes = [UserRateThrottle]
    renderer_classes = [JSONRenderer]
    serializer_class = serializers.CustomRolesSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        roles = models.CustomRoles.objects.all()
        return roles

    # Create a new Pav
    def post(self, request, *args, **kwargs):
        newRoles = models.CustomRoles()

        newRoles.name = request.data["name"]
        newRoles.description = request.data["name"]

        try:
            newRoles.save()
        except:
            return Response({'error': 'Error in format'}, status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_200_OK)

"""
    A simple REST API, for writing/getting file media
"""
class UploadFileView(ListCreateAPIView):
    renderer_classes = [JSONRenderer]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = serializers.FilesSerializer

    def post(self, request, *args, **kwargs):
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            pic_upload = models.UploadedFile()
            pic_upload.file = request.data['file']
            pic_upload.save()
            return Response({'response': 'success'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Error in format'}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        files = models.UploadedFile.objects.all()
        serializer = self.serializer_class(files, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

"""
    A simple REST API, write your custom code, link to other link
"""
class SimpleRestNolinkModel(ListAPIView):
    renderer_classes = [JSONRenderer]
    def get(self, request, *args, **kw):        
        response = Response({'aReponse':'aData'}, status=status.HTTP_200_OK)
        return response
