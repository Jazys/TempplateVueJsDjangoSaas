from django.urls import include, path

from rest_framework import routers
from . import views

urlpatterns = [

    # simple example of rest request
    path(r'roles/', views.CustomRolesPost.as_view()),
    path(r'upload/', views.UploadFileView.as_view()),
    path(r'restsimple/',views.SimpleRestNolinkModel.as_view()),
 
]
