from django.db import models

from user.models import Account

class Product(models.Model):
    class Category(models.TextChoices):
        GAMING = 'Gaming', 'Gaming'
        CLOTH = 'Cloth', 'Cloth'
        ELECTRONICS = 'Electronics', 'Electronics'
        FURNITURE = 'Furniture', 'Furniture'
        TOYS = 'Toys', 'Toys'
        BOOKS = 'Books', 'Books'
        BEAUTY = 'Beauty', 'Beauty'
        SPORTS = 'Sports', 'Sports'
        AUTOMOTIVE = 'Automotive', 'Automotive'
        JEWELRY = 'Jewelry', 'Jewelry'
        HOME_APPLIANCES = 'Home Appliances', 'Home Appliances'
        MUSIC = 'Music', 'Music'
        PET_SUPPLIES = 'Pet Supplies', 'Pet Supplies'
        GROCERIES = 'Groceries', 'Groceries'
        HEALTH = 'Health', 'Health'
        GARDEN = 'Garden', 'Garden'
        OFFICE_SUPPLIES = 'Office Supplies', 'Office Supplies'
        FOOTWEAR = 'Footwear', 'Footwear'
        BABY_PRODUCTS = 'Baby Products', 'Baby Products'
        TRAVEL = 'Travel', 'Travel'

    class Sale(models.IntegerChoices):
        SLIGHT = 10, '10%'
        DECENT = 25, '25%'
        HALF = 50, '50%'
        CHEAP = 65, '65%'
        FREE = 75, '75%'

    created_at = models.DateTimeField(auto_now_add=True)
    description = models.CharField(max_length=100)
    category = models.CharField(max_length=30, choices=Category.choices)
    image = models.ImageField(upload_to='images/', null=True, blank=True)


    price = models.DecimalField(max_digits=6, decimal_places=2)
    sale = models.IntegerField(choices=Sale.choices, null=True, blank=True)
    ordered_by = models.ForeignKey(Account, related_name='products', blank=True, null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return f'{self.category} ({self.id})'

    def desc(self):
        return self.description
