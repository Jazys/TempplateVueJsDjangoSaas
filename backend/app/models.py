import os
from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
import uuid


def get_file_path(instance, filename):
    if not os.path.isdir(settings.MEDIA_ROOT):
        os.mkdir(settings.MEDIA_ROOT)
    return '{0}/{1}'.format(settings.MEDIA_ROOT, filename)


# Create your models here.
class CustomRoles(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=100)


class UserAdv(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    custRole = models.ForeignKey(
        CustomRoles, on_delete=models.DO_NOTHING, blank=True, null=True, verbose_name='Roles custom')


class UploadedFile(models.Model):
    file = models.FileField(upload_to=get_file_path)
    date = models.DateTimeField(auto_now_add=True, blank=True)

    def delete(self, using=None, keep_parents=False):
        if os.path.exists(self.file.path):
            os.remove(self.file.path)
        super(UploadedFile, self).delete()


# ------------------------------------------------
