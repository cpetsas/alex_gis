from django.db import models


class NewsCategory(models.Model):
    name = models.CharField(max_length=20, unique=True)
    description = models.CharField(max_length=100)

    class Meta:
        db_table = "news_categories"