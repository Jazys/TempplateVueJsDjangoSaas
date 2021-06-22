from rest_framework import serializers

from app import models


class CustomRolesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CustomRoles
        fields = ('name', 'description')


class FilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UploadedFile
        fields = ('id', 'file')


# -------------------------------------------------------

