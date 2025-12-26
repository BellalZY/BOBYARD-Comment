from django.contrib import admin
from .models import Comment

# Register your models here.
class CommentAdmin(admin.ModelAdmin):
    list_display = ("id", "author", "created_at", "likes")
    search_fields = ("author", "text")
    ordering = ("-created_at")