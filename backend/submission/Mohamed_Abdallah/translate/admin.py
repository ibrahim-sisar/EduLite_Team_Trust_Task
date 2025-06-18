from django.contrib import admin, messages
import subprocess
import os
from .models import Language

@admin.register(Language)
class LanguageAdmin(admin.ModelAdmin):
    list_display = ('name', 'code', 'is_active')
    search_fields = ('name', 'code')
    actions = ['activate_and_compile_languages']

    def activate_and_compile_languages(self, request, queryset):
        """
        Admin action to create/update .po files and compile .mo files for selected languages.
        """
        project_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        success_count = 0
        error_count = 0

        for language in queryset:
            try:
                # Step 1: Run makemessages
                makemessages_cmd = ['python3', 'manage.py', 'makemessages', '-l', language.code]
                result_make = subprocess.run(makemessages_cmd, capture_output=True, text=True, cwd=project_dir)
                if result_make.returncode != 0:
                    error_message = result_make.stderr or result_make.stdout
                    self.message_user(request, f"Error during makemessages for '{language.name}': {error_message}", messages.ERROR)
                    error_count += 1
                    continue

                # Step 2: Run compilemessages
                compilemessages_cmd = ['python3', 'manage.py', 'compilemessages', '-l', language.code]
                result_compile = subprocess.run(compilemessages_cmd, capture_output=True, text=True, cwd=project_dir)
                if result_compile.returncode != 0:
                    error_message = result_compile.stderr or result_compile.stdout
                    self.message_user(request, f"Error during compilemessages for '{language.name}': {error_message}", messages.ERROR)
                    error_count += 1
                    continue
                
                success_count += 1

            except FileNotFoundError:
                self.message_user(request, "Error: 'python3' or 'manage.py' not found. Check system PATH and file locations.", messages.ERROR)
                error_count += 1
            except Exception as e:
                self.message_user(request, f"An unexpected error occurred with '{language.name}': {e}", messages.ERROR)
                error_count += 1

        if success_count > 0:
            self.message_user(request, f"Successfully activated and compiled {success_count} language(s).", messages.SUCCESS)
        if error_count > 0:
            self.message_user(request, f"Failed to process {error_count} language(s).", messages.WARNING)

    activate_and_compile_languages.short_description = "Activate & Compile selected languages"
