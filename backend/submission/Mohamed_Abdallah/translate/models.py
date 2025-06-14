from django.db import models
from django.utils.translation import gettext_lazy as _

class Language(models.Model):
    code = models.CharField(_("Language Code"), max_length=5, unique=True, help_text=_("e.g., 'en', 'ar', 'fr'"))
    name = models.CharField(_("Language Name"), max_length=100)
    is_active = models.BooleanField(_("Is Active"), default=True, help_text=_("Is this language available for users?"))

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _("Language")
        verbose_name_plural = _("Languages")

