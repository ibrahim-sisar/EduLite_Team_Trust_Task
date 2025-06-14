import os
import django
# ✅ ضبط إعدادات المشروع — عدّل المسار حسب مسار إعداداتك
# ✅ غيّر "core" إلى اسم مجلد settings.py
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings')

# ✅ تهيئة Django
django.setup()
import random
from datetime import timedelta, date
from django.utils import timezone
from faker import Faker

from patient.models import Patient, Visit, Medication  # غيّر `your_app` لاسم تطبيقك
from django.contrib.auth import get_user_model

fake = Faker()


def create_dummy_data(num_patients=10):
    User = get_user_model()
    doctor = User.objects.filter(is_staff=True).first()
    if not doctor:
        print("❌ No doctor found. Please create at least one staff user.")
        return

    for _ in range(num_patients):
        # Create a patient
        name = fake.name()
        birth_date = fake.date_between(start_date='-2y', end_date='-1d')  # عمره أقل من سنتين
        gender = random.choice(['M', 'F'])
        phone = fake.phone_number()

        patient = Patient.objects.create(
            name=name,
            birth_date=birth_date,
            gender=gender,
            parent_phone=phone
        )

        # Create 1 to 3 visits per patient
        for _ in range(random.randint(1, 3)):
            symptoms = fake.sentence(nb_words=6)
            diagnosis = fake.word()
            notes = fake.text(max_nb_chars=100)

            visit = Visit.objects.create(
                patient=patient,
                doctor=doctor,
                symptoms=symptoms,
                diagnosis=diagnosis,
                notes=notes
            )

            # Create 1 to 2 medications per visit
            for _ in range(random.randint(1, 2)):
                med_name = fake.word().capitalize()
                dosage = f"{random.randint(2, 10)}ml every {random.choice([6, 8, 12])} hours"
                duration = random.randint(3, 7)

                Medication.objects.create(
                    visit=visit,
                    name=med_name,
                    dosage=dosage,
                    duration_days=duration
                )

    print(f"✅ Created {num_patients} patients with visits and medications.")

if __name__ == "__main__":
    create_dummy_data(10)