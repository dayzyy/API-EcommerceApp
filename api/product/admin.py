from django.contrib import admin

from .models import Product

class ProductAdmin(admin.ModelAdmin):
    add_fields = ['category', 'price', 'description', 'image']
    change_fields = ['category', 'price', 'sale', 'description', 'image', 'is_ordered'] 

    def get_fields(self, request, obj=None):
        if obj:
            return self.change_fields
        else:
            return self.add_fields
    
    list_display = ('category', 'price', 'sale', 'is_ordered')
    list_filter = ('category', 'is_ordered', 'sale')
    search_fields = ('category',)
    ordering = ('-created_at',)

admin.site.register(Product, ProductAdmin)
