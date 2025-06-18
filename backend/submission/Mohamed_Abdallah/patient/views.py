from rest_framework import viewsets, permissions
from .models import Patient, Visit, Medication
from .serializers import PatientSerializer, VisitSerializer, MedicationSerializer


class PatientViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows patients to be viewed or edited.
    """
    queryset = Patient.objects.all().order_by('-created_at')
    serializer_class = PatientSerializer


class VisitViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows visits to be viewed or edited for a specific patient.
    """
    serializer_class = VisitSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """ 
        This view should return a list of all the visits for
        the patient as determined by the patient_pk portion of the URL.
        """
        patient_pk = self.kwargs['patient_pk']
        return Visit.objects.filter(patient__pk=patient_pk).order_by('-visit_date')

    def perform_create(self, serializer):
        """
        Associate the visit with the patient from the URL and the logged-in doctor.
        """
        patient = Patient.objects.get(pk=self.kwargs['patient_pk'])
        serializer.save(patient=patient, doctor=self.request.user)


class MedicationViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows medications to be viewed or edited for a specific visit.
    """
    serializer_class = MedicationSerializer

    def get_queryset(self):
        """
        This view should return a list of all the medications for
        the visit as determined by the visit_pk portion of the URL.
        """
        visit_pk = self.kwargs['visit_pk']
        return Medication.objects.filter(visit__pk=visit_pk)

    def perform_create(self, serializer):
        """
        Associate the medication with the visit from the URL.
        """
        visit = Visit.objects.get(pk=self.kwargs['visit_pk'])
        serializer.save(visit=visit)

