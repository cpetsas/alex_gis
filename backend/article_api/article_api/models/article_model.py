from django.db import models
from django.core.exceptions import ValidationError
from . import author_model, category_model

class NewsArticle(models.Model):
    title = models.CharField(max_length=40)
    summary = models.CharField(max_length=200)
    content = models.CharField(max_length=3000)
    published = models.BooleanField(default=False)
    published_date = models.DateField()
    article_author = models.ForeignKey(author_model.Author, on_delete=models.CASCADE, related_name="author")
    article_category = models.ForeignKey(category_model.NewsCategory, on_delete=models.CASCADE, related_name="category")

    def clean(self):
        if self.published and not self.published_date:
            raise ValidationError("Can't have a published article without a published date")
        super().clean()