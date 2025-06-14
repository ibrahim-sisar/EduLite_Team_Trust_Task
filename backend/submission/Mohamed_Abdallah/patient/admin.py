from django.contrib import admin, messages
from django.conf import settings
from .models import Patient, Visit, Medication
from modeltranslation.admin import TabbedTranslationAdmin
from modeltranslation.translator import translator
from googletrans import Translator


def translate_selected_items(modeladmin, request, queryset):
    """
    Admin action to automatically translate selected items using Google Translate.
    """
    try:
        translation_options = translator.get_options_for_model(queryset.model)
    except KeyError:
        modeladmin.message_user(request, f"No translation options registered for model {queryset.model.__name__}.", messages.ERROR)
        return

    translatable_fields = translation_options.fields
    default_language = settings.LANGUAGE_CODE.split('-')[0]
    target_languages = [lang[0] for lang in settings.LANGUAGES if lang[0] != default_language]

    # --- DEBUGGING MESSAGE ---
    modeladmin.message_user(request, f"DEBUG: Source lang: '{default_language}'. Target langs: {target_languages}.", messages.INFO)

    if not target_languages:
        modeladmin.message_user(request, "No target languages found. Make sure other languages are active in the 'Languages' admin.", messages.WARNING)
        return

    translator_service = Translator()
    translated_count = 0
    error_count = 0
    items_processed = 0

    for obj in queryset:
        items_processed += 1
        changed = False
        for field_name in translatable_fields:
            source_field = f"{field_name}_{default_language}"
            source_text = getattr(obj, source_field, None)

            if not source_text or not source_text.strip():
                continue
            
            # --- DEBUGGING MESSAGE ---
            modeladmin.message_user(request, f"DEBUG: Found source text for '{obj}.{field_name}': '{source_text[:50]}...'", messages.SUCCESS)

            for lang_code in target_languages:
                target_field = f"{field_name}_{lang_code}"
                target_text = getattr(obj, target_field, None)
                
                if not target_text or not target_text.strip():
                    try:
                        # --- DEBUGGING MESSAGE ---
                        modeladmin.message_user(request, f"DEBUG: Translating '{field_name}' to '{lang_code}'...", messages.INFO)
                        translated_text = translator_service.translate(source_text, src=default_language, dest=lang_code).text
                        setattr(obj, target_field, translated_text)
                        changed = True
                    except Exception as e:
                        modeladmin.message_user(request, f"Error translating '{source_text}' to {lang_code} for {obj}: {e}", messages.WARNING)
                        error_count += 1
                else:
                    # --- DEBUGGING MESSAGE ---
                    modeladmin.message_user(request, f"DEBUG: Skipping '{obj}.{target_field}' because it already has a value: '{target_text[:50]}...'", messages.WARNING)

        if changed:
            obj.save()
            translated_count += 1

    if translated_count > 0:
        modeladmin.message_user(request, f"Successfully translated {translated_count} out of {items_processed} selected item(s).", messages.SUCCESS)
    if error_count > 0:
        modeladmin.message_user(request, f"Encountered {error_count} errors during translation.", messages.ERROR)
    if translated_count == 0 and error_count == 0:
        modeladmin.message_user(request, "No items needed translation. Please check the debug messages for details.", messages.INFO)

translate_selected_items.short_description = "Translate selected items (via Google Translate)"


class PatientAdmin(TabbedTranslationAdmin):
    list_display = ('name', 'birth_date', 'age', 'gender', 'parent_phone')
    readonly_fields = ('age',)
    search_fields = ('name', 'parent_phone')
    list_filter = ('gender',)
    actions = [translate_selected_items]


class VisitAdmin(TabbedTranslationAdmin):
    list_display = ('patient', 'visit_date', 'doctor', 'diagnosis')
    search_fields = ('patient__name', 'doctor__username', 'diagnosis')
    list_filter = ('visit_date', 'doctor')
    autocomplete_fields = ['patient']
    actions = [translate_selected_items]


class MedicationAdmin(admin.ModelAdmin):
    list_display = ('visit', 'name', 'dosage', 'duration_days')
    search_fields = ('name', 'visit__patient__name')
    autocomplete_fields = ['visit']
    actions = [translate_selected_items]


admin.site.register(Patient, PatientAdmin)
admin.site.register(Visit, VisitAdmin)
admin.site.register(Medication, MedicationAdmin)

