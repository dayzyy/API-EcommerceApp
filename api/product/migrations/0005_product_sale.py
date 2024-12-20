# Generated by Django 5.1.4 on 2024-12-20 06:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0004_alter_product_price'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='sale',
            field=models.IntegerField(blank=True, choices=[(10, '10%'), (25, '25%'), (50, '50%'), (65, '65%'), (75, '75%')], null=True),
        ),
    ]