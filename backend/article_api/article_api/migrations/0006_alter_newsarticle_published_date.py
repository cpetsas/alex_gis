# Generated by Django 5.0.4 on 2024-05-03 08:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('article_api', '0005_alter_newsarticle_table'),
    ]

    operations = [
        migrations.AlterField(
            model_name='newsarticle',
            name='published_date',
            field=models.DateField(null=True),
        ),
    ]
