from django.urls import path, include
from rest_framework_nested import routers
from .views import PatientViewSet, VisitViewSet, MedicationViewSet

# Create a router and register the base viewset.
router = routers.SimpleRouter()
router.register(r'patients', PatientViewSet, basename='patients')

# Create a nested router for visits within patients.
visits_router = routers.NestedSimpleRouter(router, r'patients', lookup='patient')
visits_router.register(r'visits', VisitViewSet, basename='patient-visits')

# Create a nested router for medications within visits.
medications_router = routers.NestedSimpleRouter(visits_router, r'visits', lookup='visit')
medications_router.register(r'medications', MedicationViewSet, basename='visit-medications')

# The API URLs are now determined automatically by the routers.
urlpatterns = [
    path('', include(router.urls)),
    path('', include(visits_router.urls)),
    path('', include(medications_router.urls)),
]
