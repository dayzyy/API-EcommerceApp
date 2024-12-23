from django.contrib import admin

from .models import Product

class ProductAdmin(admin.ModelAdmin):
    add_fields = ['category', 'price', 'sale', 'description', 'image']
    change_fields = ['category', 'price', 'sale', 'description', 'image', 'ordered_by']

    def get_fields(self, request, obj=None):
        if obj:
            return self.change_fields
        else:
            return self.add_fields
    
    list_display = ('category', 'price', 'sale', 'desc','ordered_by')
    list_filter = ('category', 'ordered_by', 'sale')
    search_fields = ('category',)
    ordering = ('-created_at',)

admin.site.register(Product, ProductAdmin)
