# Generated by Django 4.2.6 on 2023-10-31 01:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('IdleGameV2', '0004_remove_scoreboard_cookies_scoreboard_description_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='scoreboard',
            old_name='description',
            new_name='cookie',
        ),
    ]