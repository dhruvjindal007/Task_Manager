from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    description = serializers.CharField(
        required=False,
        allow_blank=True
    )

    category = serializers.CharField(
        required=False,
        allow_blank=True
    )

    due_date = serializers.DateField(
        required=False,
        allow_null=True
    )

    class Meta:
        model = Task
        fields = "__all__"
        read_only_fields = ["user"]
