from django.http import JsonResponse
from ninja import NinjaAPI, Schema
from ninja import ModelSchema
from django.contrib.auth.models import User
from ninja.pagination import paginate
from django.utils import timezone
from typing import List
from rest_framework.authtoken.models import Token
from django.shortcuts import get_object_or_404
from .models import Book, Category, Cart, Comment, Author, Sale, Wishlist
from django.contrib.auth.hashers import check_password

# https://docs.djangoproject.com/en/4.2/topics/auth/default/#how-to-log-a-user-in

api = NinjaAPI(csrf=True)


class UserIn(ModelSchema):
    class Config:
        model = User
        model_fields = ['username', 'email', 'first_name', 'password', 'last_name']


class LogIn(ModelSchema):
    class Config:
        model = User
        model_fields = ['username', 'password']


class BookSchema(ModelSchema):
    class Config:
        model = Book
        model_fields = ['id', 'title', 'language', 'synopsis', 'category', 'series',
                        'volumeNumber', 'target_audience', 'mature_content', 'price',
                        'book_cover', 'book_file', 'status', 'sales']


class LanguageOption(Schema):
    languageCode:  str
    languageLabel: str


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


class AuthorIn(ModelSchema):
    class Config:
        model = Author
        model_fields = "__all__"


def createtoken(key):
    user = User.objects.get(username=key)

    checkToken = Token.objects.filter(user_id=key)
    if checkToken is None:
        token = Token.objects.create(user=user)
        return token.key
    else:
        print(user)
        return checkToken


@api.get("/library", response=List[BookSchema])
@paginate
def library(request):
    queryset = Book.objects.all()
    return list(queryset)


@api.get("/categories", response=List[CategorySchema])
def categories(request):
    queryset = Category.objects.all()
    return list(queryset)


@api.get("/language-options")
def language_options(request) -> list[LanguageOption]:
    return [LanguageOption(languageCode=choice[0], languageLabel=choice[1]) for choice in Book.Language.choices]


@api.post("/signinuser")
def signinuser(request, use: UserIn):
    try:
        User.objects.create_user(**use.dict())
        return {"success": True, "message": str("200")}
    except Exception as e:
        return {"success": False, "message": str(e)}


@api.post("/signinauthor")
def signinauthor(request, use: UserIn):
    try:
        user = User.objects.create_user(**use.dict())
        try:
            AuthorUser = get_object_or_404(User, username=user.username)
            Author.objects.create(user_id=AuthorUser.id, name="", about_you="", image=None)
            return {"success": True, "message": str("200")}
        except Exception as e:
            return {"success": False, "message": str(e)}

    except Exception as e:
        return {"success": False, "message": str(e)}


@api.post("/loginuser")
def loginuser(request, use: LogIn):
    try:
        user = get_object_or_404(User, username=use.username)
        is_valid_password = check_password(use.password, user.password)
        if is_valid_password:
            token = createtoken(user.username)
            if token is None:
                return {"success": False, "message": "Error generating Token"}
        else:
            return {"success": False, "message": "Wrong password"}
        now = timezone.now()
        lastlogin = user.last_login = now
        lastlogin.save()
        return token
    except Exception as e:
        return {"success": False, "message": str(e)}
