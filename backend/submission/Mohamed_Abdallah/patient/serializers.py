from rest_framework import serializers
from .models import Patient, Visit, Medication


class MedicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medication
        fields = ['id', 'name', 'dosage', 'duration_days']


class VisitSerializer(serializers.ModelSerializer):
    medications = MedicationSerializer(many=True, read_only=True)
    doctor = serializers.ReadOnlyField(source='doctor.username')

    class Meta:
        model = Visit
        fields = ['id', 'visit_date', 'doctor', 'symptoms', 'diagnosis', 'notes', 'medications']


class PatientSerializer(serializers.ModelSerializer):
    visits = VisitSerializer(many=True, read_only=True)
    age = serializers.CharField(source='age', read_only=True)

    class Meta:
        model = Patient
        fields = ['id', 'name', 'birth_date', 'age', 'gender', 'parent_phone', 'visits', 'created_at', 'updated_at']
