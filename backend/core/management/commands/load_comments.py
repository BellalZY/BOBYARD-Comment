import json
from django.core.management.base import BaseCommand
from django.utils.dateparse import parse_datetime
from comments.models import Comment


class Command(BaseCommand):
    help = "Load comments from JSON file into database"

    def handle(self, *args, **options):
        with open("data/comments.json", "r") as f:
            data = json.load(f)

        comments = data.get("comments", [])

        created_count = 0

        for item in comments:
            comment, created = Comment.objects.get_or_create(
                author=item["author"],
                text=item["text"],
                defaults={
                    "likes": item.get("likes", 0),
                    "image": item.get("image", ""),
                    "created_at": parse_datetime(item["date"]),
                },
            )

            if created:
                created_count += 1

        self.stdout.write(
            self.style.SUCCESS(f"Loaded {created_count} comments successfully.")
        )
