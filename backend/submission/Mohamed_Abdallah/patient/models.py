from django.db import models
from datetime import date
from django.conf import settings

class Patient(models.Model):
    # Baby's full name
    name = models.CharField(max_length=100)

    # Date of birth of the baby
    birth_date = models.DateField()

    # Gender of the baby (e.g., male/female)
    GENDER_CHOICES = [('M', 'Male'), ('F', 'Female')]
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)

    # Contact number for the parent/guardian
    parent_phone = models.CharField(max_length=15)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def age(self):
        """
        Calculates the current age of the patient in years, months, and days.
        """
        if not self.birth_date:
            return None

        today = date.today()
        years = today.year - self.birth_date.year
        months = today.month - self.birth_date.month

        if today.day < self.birth_date.day:
            months -= 1

        if months < 0:
            years -= 1
            months += 12

        if years == 0 and months == 0:
            days = (today - self.birth_date).days
            return f"{days} day{'s' if days != 1 else ''}"

        age_parts = []
        if years > 0:
            age_parts.append(f"{years} year{'s' if years > 1 else ''}")
        if months > 0:
            age_parts.append(f"{months} month{'s' if months > 1 else ''}")

        return ", ".join(age_parts)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Patient'
        verbose_name_plural = 'Patients'

class Visit(models.Model):
    # Reference to the baby patient who had this visit
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='visits')

    # Doctor who conducted the visit
    doctor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='visits')

    # Date and time when the visit was recorded (automatically set when created)
    visit_date = models.DateTimeField(auto_now_add=True)

    # Symptoms the baby showed during this visit (e.g., fever, cough)
    symptoms = models.TextField()

    # Doctor's diagnosis for this visit (e.g., flu, cold)
    diagnosis = models.TextField()

    # Any additional notes (optional)
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.patient.name} - {self.visit_date.date()}"

    class Meta:
        verbose_name = 'Visit'
        verbose_name_plural = 'Visits'

class Medication(models.Model):
    # Link to the visit where this medication was prescribed
    visit = models.ForeignKey(Visit, on_delete=models.CASCADE, related_name='medications')

    # Name of the medication (e.g., Panadol)
    name = models.CharField(max_length=100)

    # Dosage instructions (e.g., "5ml every 8 hours")
    dosage = models.CharField(max_length=100)

    # How many days the medication should be taken
    duration_days = models.IntegerField()

    def __str__(self):
        return f"{self.name} for {self.visit.patient.name}"

    class Meta:
        verbose_name = 'Medication'
        verbose_name_plural = 'Medications'
