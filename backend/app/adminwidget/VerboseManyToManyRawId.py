from django.contrib.admin.widgets import ManyToManyRawIdWidget
from django.utils.encoding import smart_str
from django.urls import reverse
from django.utils.html import escape, mark_safe


class VerboseManyToManyRawIdWidget(ManyToManyRawIdWidget):
    """
    A Widget for displaying ManyToMany ids in the "raw_id" interface rather than
    in a <select multiple> box. Display user-friendly value like the ForeignKeyRawId widget
    """

    def __init__(self, remote_field, attrs=None, *args, **kwargs):
        super().__init__(remote_field, attrs, *args, **kwargs)

    def label_and_url_for_value(self, value):
        values = value
        str_values = []
        field = self.rel.get_related_field()
        key = field.name
        fk_model = self.rel.model
        app_label = fk_model._meta.app_label
        class_name = fk_model._meta.object_name.lower()
        for the_value in values:
            try:
                obj = fk_model._default_manager.using(self.db).get(**{key: the_value})
                url = reverse('admin:{0}_{1}_change'.format(app_label, class_name), args=[obj.id])
                label = escape(smart_str(obj) + "("+str(obj.id)+")")
                elt = '<a href="{0}" {1}>{2}</a>'.format(
                    url,
                    'onclick="return showAddAnotherPopup(this);" target="_blank"',
                    label
                )
                str_values += [elt]
            except fk_model.DoesNotExist:
                str_values += [u'???']
        return mark_safe(', '.join(str_values)), ''
