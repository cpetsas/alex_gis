# Generated by Django 5.0.4 on 2024-05-02 14:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('article_api', '0004_alter_newsarticle_article_author_and_more'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='newsarticle',
            table='news_articles',
        ),
    ]
