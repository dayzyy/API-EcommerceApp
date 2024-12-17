from django.db import models

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

    created_at = models.DateTimeField(auto_now_add=True)
    description = models.CharField(max_length=100)
    category = models.CharField(max_length=30, choices=Category.choices)
    image = models.ImageField(upload_to='images/', null=True, blank=True)


    price = models.DecimalField(max_digits=6, decimal_places=2)
    is_ordered = models.BooleanField(default=False)
