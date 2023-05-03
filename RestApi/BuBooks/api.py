from ninja import NinjaAPI
from ninja import ModelSchema
from django.contrib.auth.models import User
from ninja.pagination import paginate
from typing import List
from rest_framework.authtoken.models import Token

from .models import Book, Category, Cart, Comment, Author, Sale, Wishlist

api = NinjaAPI(csrf=True)


class UserSchema(ModelSchema):
    class Config:
        model = User
        model_fields = ['id', 'username', 'first_name', 'last_name']


class BookSchema(ModelSchema):
    class Config:
        model = Book
        model_fields = ['id', 'title', 'language', 'synopsis', 'category', 'series',
                        'volumeNumber', 'target_audience', 'mature_content', 'price',
                        'book_cover', 'book_file', 'status', 'sales']


class CommentSchema(ModelSchema):
    class Config:
        model = Comment
        model_fields = "__all__"


class CartSchema(ModelSchema):
    class Config:
        model = Cart
        model_fields = "__all__"


class WishListSchema(ModelSchema):
    class Config:
        model = Wishlist
        model_fields = "__all__"


class SaleSchema(ModelSchema):
    class Config:
        model = Sale
        model_fields = "__all__"


class CategorySchema(ModelSchema):
    class Config:
        model = Category
        model_fields = "__all__"


class AuthorSchema(ModelSchema):
    class Config:
        model = Author
        model_fields = "__all__"


@api.get("/library", response=List[BookSchema])
@paginate
def library(request):
    queryset = Book.objects.all()
    return list(queryset)


@api.get("/categories", response=List[CategorySchema])
def categories(request):
    queryset = Category.objects.all()
    return list(queryset)


@api.post("/login")
def login(request, userschema: UserSchema):

    token = Token.objects.create()
    return token.key
