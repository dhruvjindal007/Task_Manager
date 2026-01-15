from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import Task
from .serializers import TaskSerializer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class TaskViewSet(ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(
        operation_description="Get all tasks for logged-in user",
        responses={200: TaskSerializer(many=True)})
    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def update(self, request, *args, **kwargs):
        # Force PARTIAL update even for PUT
        kwargs["partial"] = True
        return super().update(request, *args, **kwargs)

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
