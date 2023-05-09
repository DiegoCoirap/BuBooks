from django.contrib.auth import authenticate, login, logout
import json
from ninja import NinjaAPI, Schema
from ninja import ModelSchema
from django.contrib.auth.models import User
from ninja.pagination import paginate
from django.utils import timezone
from typing import List
from rest_framework.authtoken.models import Token
from django.shortcuts import get_object_or_404
from .models import Book, Category, Cart, Comment, Author, Sale, Wishlist
from ninja.security import HttpBearer
from django.contrib.auth.hashers import check_password

# https://django-ninja.rest-framework.com/guides/authentication/ ejempplo auth
# https://django-ninja.rest-framework.com/tutorial/other/crud/ ejemplo books
# https://docs.djangoproject.com/en/4.2/topics/auth/default/#how-to-log-a-user-in

api = NinjaAPI(csrf=True)


class AuthBearer(HttpBearer):
    def authenticate(self, request, token):
        data = json.loads(request.body.decode('utf-8'))
        username = data.get('username')
        if username:
            user = get_object_or_404(User, username=username)
            try:
                user_token = Token.objects.get(user=user)
            except Token.DoesNotExist:
                raise "Unauthorized"
            if token == user_token.key:
                return token


class Error(Schema):
    message: str


class ChangePassword(Schema):
    username: str
    new_password: str


class UserIn(ModelSchema):
    class Config:
        model = User
        model_fields = ['username', 'email', 'password']


class LogIn(ModelSchema):
    class Config:
        model = User
        model_fields = ['username', 'password']


class UserToken(Schema):
    sessionToken: str


class BookSchema(ModelSchema):
    class Config:
        model = Book
        model_fields = ['title', 'language', 'synopsis', 'category', 'series',
                        'volumeNumber', 'target_audience', 'mature_content', 'price',
                        'book_cover', 'book_file', 'status', 'sales']


class LanguageOption(Schema):
    languageCode: str
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


def createtoken(secret):
    token_user = User.objects.get(username=secret)
    t = Token.objects.filter(user=token_user).exists()
    if t:
        token_key = get_object_or_404(Token, user=token_user)
        return token_key.key
    else:
        token_key = Token.objects.create(user=token_user).key
        return token_key


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


@api.post("/sign-in-user", response={200: UserIn, 401: Error}, auth=None)
def signinuser(request, use: UserIn):
    try:
        User.objects.create_user(**use.dict())
        return 200, {"message": "User created successfully"}
    except Exception as e:
        return 401, {"message": "Something went wrong, please try again", "Error": str(e)}


@api.post("/login")
def login(request, use: LogIn):
    username = use.username
    password = use.password
    user = authenticate(username=username, password=password)
    if user is not None:
        token_key = createtoken(use.username)
        return token_key
    else:
        return ":("


@api.delete("/logout")
def logout_view(request, delete_user: UserToken):
    token = delete_user.sessionToken
    Token.objects.filter(key=token).delete()
    return "LogOut was successful"


@api.post("/create-book")
def create_book(request, created_book: BookSchema):
    book = created_book
    book.save()


@api.post("/profile", response={200: UserIn, 403: Error})
def user_profile(request, key: UserToken):
    if not request.user.is_authenticated:
        return 403, {"message": "Please sign in first"}
    token = key.sessionToken
    token_user = Token.objects.filter(key=token)
    user = get_object_or_404(id=token_user.user_id)
    my_books = get_object_or_404(user_id=user.id)
    wish_list = get_object_or_404(user_id=user.id)
    return my_books, wish_list


@api.post("/change-password", auth=AuthBearer())
def change_password(request, change: ChangePassword):
    username = change.username
    user = get_object_or_404(User, username=username)
    if User is not None:
        user.set_password(str(change.new_password))
        user.save()
        return "Change was successful, pls log in again"
    else:
        return "Wrong username"
