from django.urls import include, path

from rest_framework import routers

from app.views import CustomRolesPost
from app.views import UploadFileView
from app.views import  SimpleRestNolinkModel


from . import views

urlpatterns = [

    # simple example of rest request
    path(r'roles/', CustomRolesPost.as_view()),
    path(r'upload/', UploadFileView.as_view()),
    path(r'restsimple/',SimpleRestNolinkModel.as_view()),   #get only
 
]
