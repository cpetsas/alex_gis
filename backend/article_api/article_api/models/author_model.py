from django.db import models

class Author(models.Model):
    name = models.CharField(max_length=30)
    surname = models.CharField(max_length=30)
    job_description = models.CharField(max_length=50)

    class Meta:
        db_table = "authors"