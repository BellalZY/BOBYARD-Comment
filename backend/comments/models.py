from django.db import models

# Create your models here.
class Comment(models.Model):
    author = models.CharField(max_length=100)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True) 
    likes = models.PositiveBigIntegerField(default=0)
    image = models.URLField(blank=True)

    def __str__(self):
        return f"{self.author}: {self.text[:30]}"