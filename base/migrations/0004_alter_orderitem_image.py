# Generated by Django 3.2.5 on 2021-08-07 10:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_auto_20210804_1614'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orderitem',
            name='image',
            field=models.TextField(blank=True, null=True),
        ),
    ]