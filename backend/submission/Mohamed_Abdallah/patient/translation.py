from modeltranslation.translator import register, TranslationOptions
from .models import Patient, Visit, Medication

@register(Patient)
class PatientTranslationOptions(TranslationOptions):
    fields = ('name',)

@register(Visit)
class VisitTranslationOptions(TranslationOptions):
    fields = ('symptoms', 'diagnosis', 'notes')

@register(Medication)
class MedicationTranslationOptions(TranslationOptions):
    fields = ('name',)
