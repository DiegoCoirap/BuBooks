from django.contrib import admin

from .models import Book, Category, Cart, Comment, Author, Sale, Wishlist

# Register your models here.

admin.site.register(Book)
admin.site.register(Author)
admin.site.register(Category)
admin.site.register(Cart)
admin.site.register(Comment)
admin.site.register(Sale)
admin.site.register(Wishlist)

# admin custom class investigar