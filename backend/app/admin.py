from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


from .models import CustomRoles
from .models import UserAdv
from .models import UploadedFile
from . import models

from .adminwidget.VerboseManyToManyRawId import VerboseManyToManyRawIdWidget

from import_export.admin import ImportExportActionModelAdmin
from import_export import resources


#For displaying special admin panel
class UserAdvInline(admin.StackedInline):
    raw_id_fields = ['custRole']
    model = UserAdv
    can_delete = False
    verbose_name_plural = 'Advanced Parameter'


class ViewUserAdmin(BaseUserAdmin):
    inlines = (UserAdvInline,)


admin.site.register(CustomRoles)
admin.site.register(UploadedFile)

#for new admin panel
admin.site.unregister(User)
admin.site.register(User, ViewUserAdmin)


@receiver(post_save)
def init_useradv_oncreate(sender, instance, **kwargs):
    if sender is User:
        if kwargs["created"]:
            useradv_obj = UserAdv(user=instance, )
            useradv_obj.save()



