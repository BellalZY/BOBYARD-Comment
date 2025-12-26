from rest_framework import serializers
from .models import Comment

class CommentSerializer(serializers.ModelSerializer):
    date = serializers.DateTimeField(source="created_at", read_only=True)

    class Meta:
        model = Comment
        fields = "__all__"
        read_only_fields = ["date", "likes", "image"]