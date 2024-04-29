from django.db import models


class User(models.Model):
    username = models.CharField(max_length=20, primary_key=True)
    role = models.CharField(max_length=10, choices=[("admin", "Admin"),
                                                    ("user", "User"),
                                                    ("superadmin", "Superadmin")])
    token = models.CharField(max_length=50, unique=True)
    
    class Meta:
        db_table = "users"