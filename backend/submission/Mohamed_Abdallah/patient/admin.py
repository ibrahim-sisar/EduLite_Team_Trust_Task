from django.contrib import admin
from .models import Patient, Visit, Medication


class PatientAdmin(admin.ModelAdmin):
    list_display = ('name', 'birth_date', 'age', 'gender', 'parent_phone')
    readonly_fields = ('age',)
    search_fields = ('name', 'parent_phone')
    list_filter = ('gender',)


class VisitAdmin(admin.ModelAdmin):
    list_display = ('patient', 'visit_date', 'doctor', 'diagnosis')
    search_fields = ('patient__name', 'doctor__username', 'diagnosis')
    list_filter = ('visit_date', 'doctor')
    autocomplete_fields = ['patient']


class MedicationAdmin(admin.ModelAdmin):
    list_display = ('visit', 'name', 'dosage', 'duration_days')
    search_fields = ('name', 'visit__patient__name')
    autocomplete_fields = ['visit']


admin.site.register(Patient, PatientAdmin)
admin.site.register(Visit, VisitAdmin)
admin.site.register(Medication, MedicationAdmin)

# Register your models here.
