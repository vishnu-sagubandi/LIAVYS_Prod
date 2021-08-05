from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(Product)
admin.site.register(Review)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Category)
admin.site.register(ShippingAddress)


class HeroSectionImageInline(admin.TabularInline):
    model = HeroSectionImage
    extra = 3


class HeroSectionAdmin(admin.ModelAdmin):
    inlines = [HeroSectionImageInline, ]


admin.site.register(HeroSection, HeroSectionAdmin)
