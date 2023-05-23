from django.contrib.auth import authenticate
import json
from ninja import NinjaAPI, Schema
from ninja import ModelSchema
from ninja.files import UploadedFile
from django.contrib.auth.models import User
from ninja.pagination import paginate
from typing import List
from rest_framework.authtoken.models import Token
from django.shortcuts import get_object_or_404
from .models import Book, Category, Cart, Comment, Author, Sale, Wishlist, IsAuthor
from ninja.security import HttpBearer
from django.contrib.auth.hashers import check_password

# https://django-ninja.rest-framework.com/guides/authentication/ example auth
# https://django-ninja.rest-framework.com/tutorial/other/crud/ example books
# https://docs.djangoproject.com/en/4.2/topics/auth/default/#how-to-log-a-user-in

api = NinjaAPI(csrf=True)


class AuthBearer(HttpBearer):
    def authenticate(self, request, key):
        if request.headers.get('Authorization'):
            token = request.headers.get('Authorization')
            if token:
                if token.startswith('Bearer '):
                    auth_token = token[7:]
            try:
                user_id = get_object_or_404(Token, key=auth_token)
                user = get_object_or_404(User, username=user_id.user)
            except Token.DoesNotExist:
                raise "Unauthorized"
            try:
                user_token = Token.objects.get(user=user)
            except Token.DoesNotExist:
                raise "Unauthorized"
            if key == user_token.key:
                return key
        else:
            data = json.loads(request.body.decode('utf-8'))
            username = data.get('username')
            if username:
                user = get_object_or_404(User, username=username)
                try:
                    user_token = Token.objects.get(user=user)
                except Token.DoesNotExist:
                    raise "Unauthorized"
                if key == user_token.key:
                    return key


class ChangePassword(Schema):
    username: str
    new_password: str


class UserPetition(Schema):
    username: str
    email: str
    password: str
    is_author: bool


class LogIn(ModelSchema):
    class Config:
        model = User
        model_fields = ['username', 'password']


class BookSchema(ModelSchema):
    class Config:
        model = Book
        model_fields = ['title', 'language', 'synopsis', 'category', 'series',
                        'volumeNumber', 'target_audience', 'mature_content', 'price',
                        'book_cover', 'book_file']


class LanguageOption(Schema):
    languageCode: str
    languageLabel: str


class CommentSchema(ModelSchema):
    class Config:
        model = Comment
        model_fields = "__all__"


class CartIn(ModelSchema):
    class Config:
        model = Cart
        model_fields = "__all__"


class CartOut(Schema):
    title: str
    language: str
    book_cover: UploadedFile


class WishListIn(ModelSchema):
    class Config:
        model = Wishlist
        model_fields = "__all__"


class WishListOut(Schema):
    title: str
    language: str
    book_cover: UploadedFile
    book_file: UploadedFile


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
        model_fields = ['alias', 'about_you', 'image']


def retrieve_token(username):
    user = get_object_or_404(User, username=username)
    token = Token.objects.filter(user=user).first()
    if token is None:
        token = Token.objects.create(user=user)

    return token.key


def retrieve_author(token_header):
    if token_header:
        if token_header.startswith('Bearer '):
            auth_token = token_header[7:]
        token_table = get_object_or_404(Token, key=auth_token)
        user_query = get_object_or_404(User, username=token_table.user)
        author_query = get_object_or_404(Author, user_id=user_query.id)
        return author_query
    return "error"


@api.get("/library", response=List[BookSchema])
@paginate
def library(request):
    queryset = Book.objects.all()
    return list(queryset)


@api.get("/wish-list", response=List[WishListSchema])
def wish_list(request):
    queryset = Wishlist.objects.all()
    return list(queryset)


@api.get("/cart", response=List[CartSchema])
def cart(request):
    queryset = Cart.objects.all()
    return list(queryset)


@api.get("/categories", response=List[CategorySchema])
def categories(request):
    queryset = Category.objects.all()
    return list(queryset)


@api.get("/language-options")
def language_options(request) -> list[LanguageOption]:
    return [LanguageOption(languageCode=choice[0], languageLabel=choice[1]) for choice in Book.Language.choices]


@api.post("/sign-up-user", auth=None)
def signup_user(request, user_petition: UserPetition):
    user = {'username': user_petition.username, 'email': user_petition.email, 'password': user_petition.password}
    User.objects.create_user(**user)
    author_user = get_object_or_404(User, username=user_petition.username)
    IsAuthor.objects.create(User=author_user, is_author=user_petition.is_author, avatar=None)


@api.post("/create-author", auth=AuthBearer())
def create_author_data(request, author: AuthorIn):
    token = request.headers.get('Authorization')
    if token:
        if token.startswith('Bearer '):
            auth_token = token[7:]
        token_table = get_object_or_404(Token, key=auth_token)
        user_query = get_object_or_404(User, username=token_table.user)
        dictionary = {"user_id": user_query.id, "alias": author.alias, "about_you": author.about_you,
                      "image": author.image}
        Author.objects.create(**dictionary)
    else:
        return "Unauthorized"


@api.post("/login")
def login(request, use: LogIn):
    username = use.username
    password = use.password
    user = authenticate(username=username, password=password)
    if user is not None:
        token_key = retrieve_token(use.username)
        return token_key
    else:
        return ":("


@api.post("/create-book", auth=AuthBearer())
def create_book(request, created_book: BookSchema):
    token = request.headers.get('Authorization')
    author_query = retrieve_author(token)
    book = Book(
        id_author=author_query,
        title=created_book.title,
        language=created_book.language,
        synopsis=created_book.synopsis,
        series=created_book.series,
        volumeNumber=created_book.volumeNumber,
        target_audience=created_book.target_audience,
        mature_content=created_book.mature_content,
        price=created_book.price,
        book_cover=created_book.book_cover,
        book_file=created_book.book_file,
    )
    book.save()
    book.category.set(created_book.category)


@api.post("/change-password", auth=AuthBearer())
def change_password(request, change: ChangePassword):
    username = change.username
    user = get_object_or_404(User, username=username)
    if User is not None:
        user.set_password(str(change.new_password))
        user.save()
        token = request.headers.get('Authorization')
        if token:
            if token.startswith('Bearer '):
                auth_token = token[7:]
            user_id = get_object_or_404(Token, key=auth_token)
            user_id.delete()
        return "Change was successful, pls log in again"
    else:
        return "Wrong username"


@api.put("/modify-author", auth=AuthBearer())
def modify_author_data(request, author: AuthorIn):
    token = request.headers.get('Authorization')
    author_query = retrieve_author(token)
    author_query.alias = author.alias
    author_query.about_you = author.about_you
    author_query.image = author.image
    author_query.save()


@api.delete("/logout", auth=AuthBearer())
def logout_view(request):
    token = request.auth
    Token.objects.filter(key=token).delete()
    return "LogOut was successful"
