"""Core URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static


# drf_yasg code starts here
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
schema_view = get_schema_view(
    openapi.Info(
        title=settings.OPENAPI_TITLE,
        default_version=settings.OPENAPI_DEFAULT_VERSION,
        description=settings.OPENAPI_DESCRIPTION,
        terms_of_service=settings.OPENAPI_TERMS,
        contact=openapi.Contact(email=settings.OPENAPI_CONTACT),
        license=openapi.License(name=settings.OPENAPI_TERMS),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)
# ends here

#for jwt auth
from rest_framework_simplejwt.views import TokenRefreshView
from .token import CutomTokenObtainPairView
# ends here

#for double auth
from django_otp.admin import AdminSite
from django_otp.admin import OTPAdmin
#OTPAdmin.enable()
admin.site = AdminSite()
# ends here


api_urlpatterns = [
    path('accounts/', include('rest_registration.api.urls')),
]

urlpatterns = [
    
    #for documentation
    re_path(r'^doc(?P<format>\.json|\.yaml)$',
            schema_view.without_ui(cache_timeout=0), name='schema-json'), 
    path('doc/', schema_view.with_ui('swagger', cache_timeout=0),
         name='schema-swagger-ui'),  
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), 
         name='schema-redoc'),  

    #for admin site
    path('admin/', include('admin_honeypot.urls', namespace='admin_honeypot')),
    path('secret-admin/', admin.site.urls),
    
    #for api
    path('api/v1/', include('app.urls')),
    path('api/v1/', include(api_urlpatterns)),
    
    #for double auth
    re_path(r'^qr/', include("django_otp.urls")),
    
    #for get access token 
    path('api/v1/token/', CutomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/v1/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    re_path(r'^maintenance-mode/', include('maintenance_mode.urls')),
    
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
