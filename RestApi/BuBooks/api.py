from datetime import datetime
from django.contrib.auth import authenticate

from django.core.mail import send_mail
from django.http import BadHeaderError, HttpResponseRedirect, HttpResponse
from ninja import NinjaAPI, Schema
from ninja import ModelSchema
from ninja.security import HttpBearer
from ninja.errors import ValidationError, AuthenticationError, HttpError
from django.contrib.auth.models import User
from ninja.pagination import paginate
from typing import List
from rest_framework.authtoken.models import Token
from django.shortcuts import get_object_or_404
from .models import Book, Category, Cart, Comment, Author, Sale, Wishlist, UserExtraData

# https://django-ninja.rest-framework.com/guides/authentication/ example auth
# https://django-ninja.rest-framework.com/tutorial/other/crud/ example books
# https://docs.djangoproject.com/en/4.2/topics/auth/default/#how-to-log-a-user-in

api = NinjaAPI(csrf=True)


class AuthBearer(HttpBearer):
    def authenticate(self, request, key):
        if request.headers.get('Authorization'):
            token = request.headers.get('Authorization')
            auth_token = validate_token(token)
            try:
                user_token = get_object_or_404(Token, key=auth_token)
                user = get_object_or_404(User, username=user_token.user)
            except Token.DoesNotExist:
                return 403, "UnAuthorized"
            try:
                user_token = get_object_or_404(Token, user=user)
            except Token.DoesNotExist:
                return 403, "UnAuthorized"
            if key == user_token.key:
                return key
        else:
            return 403, "UnAuthorized"


# ValidateEmail not implemented yet
class ValidateEmail(Schema):
    subject: str
    message: str
    from_email: "bubooks@gmail.com"


class ChangePassword(Schema):
    username: str
    new_password: str


class UserRegister(Schema):
    username: str
    email: str
    password: str
    is_author: bool


class ModifyUser(Schema):
    username: str
    email: str


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


class CartIn(ModelSchema):
    class Config:
        model = Cart
        model_fields = ['book']


class SalesIn(ModelSchema):
    class Config:
        model = Sale
        model_fields = ['book']


class CartOut(Schema):
    title: str
    author: str
    language: str
    book_cover: str


class WishListIn(ModelSchema):
    class Config:
        model = Wishlist
        model_fields = ['book']


class WishListOut(Schema):
    title: str
    author: str
    language: str
    book_cover: str


class SaleIn(ModelSchema):
    class Config:
        model = Sale
        model_fields = ["book"]


class SalesOut(Schema):
    title: str
    author: str
    language: str
    book_cover: str
    book_file: str
    date: str


class CategorySchema(ModelSchema):
    class Config:
        model = Category
        model_fields = ["category"]


class AuthorIn(ModelSchema):
    class Config:
        model = Author
        model_fields = ['alias', 'about_you', 'image']


class CommentIn(Schema):
    title: str
    comment: str
    rating: int
    book: str


class CommentOut(Schema):
    title: str
    comment: str
    rating: str
    user: str


class GetBookComment(Schema):
    book: str


def validate_token(token_header):
    if token_header:
        if token_header.startswith('Bearer '):
            auth_token = token_header[7:]
            return auth_token
        else:
            return 403, "UnAuthorized"
    else:
        return 403, "UnAuthorized"


def retrieve_token(username):
    user = get_object_or_404(User, username=username)
    token = Token.objects.filter(user=user).first()
    if token is None:
        try:
            token = Token.objects.create(user=user)
        except token.DoesNotExist:
            return 503, "Service Unavailable. Please retry later."

    return token.key


def retrieve_user(token_header):
    auth_token = validate_token(token_header)
    token_query = get_object_or_404(Token, key=auth_token)
    user_query = get_object_or_404(User, username=token_query.user)
    return user_query


def retrieve_author(token_header):
    user_query = retrieve_user(token_header)
    author_query = get_object_or_404(Author, user=user_query.id)
    return author_query


def is_user_an_author(user):
    User_extra_data = get_object_or_404(UserExtraData, user=user)
    is_author = User_extra_data.is_author
    return is_author


# validate_email not implemented yet
def validate_email(email_data):
    subject = email_data.subject
    message = email_data.message
    from_email = email_data.from_email
    if subject and message and from_email:
        try:
            send_mail(subject, message, from_email, ["admin@example.com"])
        except BadHeaderError:
            return HttpResponse("Invalid header found.")
        return HttpResponseRedirect("/contact/thanks/")
    else:
        return 422, "Invalid Body"


@api.post("/sign-up-user", auth=None)
def signup_user(request, user_petition: UserRegister):
    if user_petition is not None:
        already_exists = User.objects.get(username=user_petition.username)
        if already_exists is None:
            user = {'username': user_petition.username, 'email': user_petition.email,
                    'password': user_petition.password}
            try:
                User.objects.create_user(**user)
            except RuntimeError:
                return 503, "Service Unavailable. Please retry later."
            author_user = get_object_or_404(User, username=user_petition.username)
            UserExtraData.objects.create(user=author_user, is_author=user_petition.is_author, avatar=None)
        else:
            return 422, "Invalid Body"

            return {"status": 200, "message": "User has been successfully created"}
    return {"status": 422, "message": "body is empty"}


@api.post("/create-author", auth=AuthBearer())
def create_author_data(request, author: AuthorIn):
    try:
        token = request.headers.get('Authorization')
        auth_token = validate_token(token)
        token_table = get_object_or_404(Token, key=auth_token)
        user_query = get_object_or_404(User, username=token_table.user)
        dictionary = {"user_id": user_query.id, "alias": author.alias, "about_you": author.about_you,
                      "image": author.image}
        Author.objects.create(**dictionary)
        return {"status": 200, "message": "Author profile has been successfully created"}
    except AttributeError:
        return 403, "UnAuthorized"


@api.post("/login")
def login(request, use: LogIn):
    username = use.username
    password = use.password
    user = authenticate(username=username, password=password)
    if user is not None:
        token_key = retrieve_token(use.username)
        return token_key
    else:
        return 422, "Invalid Body"


@api.post("/create-book", auth=AuthBearer())
def create_book(request, created_book: BookSchema):
    token = request.headers.get('Authorization')
    user = retrieve_user(token)
    is_author = is_user_an_author(user)
    if is_author:
        author_query = retrieve_author(token)
        book = Book(
            author=author_query,
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
        return {"status": 200, "message": "Book created successfully"}
    else:
        return 403, "UnAuthorized"


@api.post("/add-book-wishlist", auth=AuthBearer())
def add_book_wishlist(request, payload: WishListIn):
    token = request.headers.get('Authorization')
    user = retrieve_user(token)
    is_author = is_user_an_author(user)
    if is_author:
        return 403, "UnAuthorized"
    else:
        book = get_object_or_404(Book, id=payload.book_id)
        book_wishlist = Wishlist(
            user_id=user,
            book_id=book,
        )
        book_wishlist.save()
        return {"status": 200, "message": "Book added to the Wishlist"}


@api.post("/create-comment", auth=AuthBearer())
def create_comment(request, payload: CommentIn):
    token_header = request.headers.get('Authorization')
    user = retrieve_user(token_header)
    is_author = is_user_an_author(user)
    if is_author:
        return 403, "UnAuthorized"
    else:
        book = get_object_or_404(Book, title=payload.book)
        comment = Comment(
            title=payload.title,
            comment=payload.comment,
            rating=payload.rating,
            user=user,
            book=book,
        )
        comment.save()
        return {"status": 200, "message": "Comment created successfully"}


@api.post("/add-book-cart", auth=AuthBearer())
def add_book_cart(request, payload: CartIn):
    token = request.headers.get('Authorization')
    user = retrieve_user(token)
    book = get_object_or_404(Book, id=payload.book_id)
    book_Cart = Cart(
        user_id=user,
        book_id=book,
    )
    book_Cart.save()
    return {"status": 200, "message": "Book added to the Cart"}


@api.post("/book-bought", auth=AuthBearer())
def sale(request, payload: SalesIn):
    token = request.headers.get('Authorization')
    user = retrieve_user(token)
    book = get_object_or_404(Book, id=payload.book_id)
    book.sales = book.sales + 1
    book.save()
    book_sale = Sale(
        date=datetime.now(),
        user_id=user,
        book_id=book,
    )
    book_sale.save()
    return {"status": 200, "message": "Book bought successfully"}


@api.get("/library", response=List[BookSchema])
@paginate
def library(request):
    queryset = Book.objects.all()
    return {"status": 200}, list(queryset)


@api.get("/wish-list", response=List[WishListOut], auth=AuthBearer())
def wish_list(request):
    token = request.headers.get('Authorization')
    user = retrieve_user(token)
    try:
        wishlist_books = Wishlist.objects.filter(user_id=user.id).values('book_id')
    except wishlist_books.DoesNotExist:
        return 404, "Object does not exist"
    SchemaOut = []
    for wishlist_book in wishlist_books:
        books = Book.objects.get(id=wishlist_book.book_id)
        author = Author.objects.get(id=books.author_id)
        book_info = {
            'title': books.title,
            'author': author.alias,
            'language': books.language,
            'book_cover': str(books.book_cover),
            'price': books.price
        }
        SchemaOut.append(book_info)
    return {"status": 200}, SchemaOut


@api.get("/cart", response=List[CartOut])
def cart(request):
    token = request.headers.get('Authorization')
    user = retrieve_user(token)
    try:
        cart_books = Cart.objects.filter(user_id=user.id).values('book_id')
    except cart_books.DoesNotExist:
        return 404, "Object does not exist"
    SchemaOut = []
    for cart_book in cart_books:
        books = Book.objects.get(id=cart_book.book_id)
        author = Author.objects.get(id=books.author_id)
        book_info = {
            'title': books.title,
            'author': author.alias,
            'language': books.language,
            'book_cover': str(books.book_cover),
            'price': books.price
        }
        SchemaOut.append(book_info)
    return {200}, SchemaOut


@api.get("/cart", response=List[CartOut])
def cart(request):
    token = request.headers.get('Authorization')
    user = retrieve_user(token)
    try:
        cart_books = Cart.objects.filter(user_id=user.id).values('book_id')
    except cart_books.DoesNotExist:
        return 404, "Object does not exist"
    SchemaOut = []
    for cart_book in cart_books:
        books = get_object_or_404(Book, id=cart_book.book_id)
        author = get_object_or_404(Author, id=books.author_id)
        book_info = {
            'title': books.title,
            'author': author.alias,
            'language': books.language,
            'book_cover': str(books.book_cover),
            'price': books.price
        }
        SchemaOut.append(book_info)
    return SchemaOut


@api.get("/my-books", response=List[SalesOut], auth=AuthBearer())
def my_books(request):
    token = request.headers.get('Authorization')
    user = retrieve_user(token)
    try:
        user_books = Sale.objects.filter(user_id=user.id)
    except user_books.DoesNotExist:
        return 404, "Object does not exist"
    SchemaOut = []
    for user_book in user_books:
        books = Book.objects.get(id=user_book.book_id)
        author = Author.objects.get(id=books.author_id)
        book_info = {
            'title': books.title,
            'author': author.alias,
            'language': books.language,
            'book_cover': str(books.book_cover),
            'book_file': str(books.book_cover),
            'date': str(user_book.date),
        }
        SchemaOut.append(book_info)
    return SchemaOut


@api.api_operation(["POST", "PATCH"], "/comments", auth=None, response=List[CommentOut])
def get_comments(request, payload: GetBookComment):
    book = get_object_or_404(Book, title=payload.book)
    comments = Comment.objects.filter(book=book.id)
    if comments is None:
        return 404, "Object does not exist"
    SchemaOut = []
    for comment in comments:
        comment_info = {
            'title': comment.title,
            'comment': comment.comment,
            'rating': comment.rating,
            'user': str(comment.user)
        }
        SchemaOut.append(comment_info)
    return SchemaOut


@api.get("/categories", response=List[CategorySchema])
def categories(request):
    queryset = Category.objects.all()
    return list(queryset)


@api.get("/language-options")
def language_options(request) -> list[LanguageOption]:
    return [LanguageOption(languageCode=choice[0], languageLabel=choice[1]) for choice in Book.Language.choices]


@api.put("/modify-author", auth=AuthBearer())
def modify_author_data(request, author: AuthorIn):
    token = request.headers.get('Authorization')
    author_query = retrieve_author(token)
    author_query.alias = author.alias
    author_query.about_you = author.about_you
    author_query.image = author.image
    author_query.save()
    return {"message": "Author profile has been created successfully", "status": 200}


@api.put("/modify-user", auth=AuthBearer())
def modify_user(request, payload: ModifyUser):
    token = request.header.get('Authorization')
    user = retrieve_user(token)
    if payload.username is not None:
        user.username = payload.username
    else:
        raise
    if payload.email is not None:
        user.email = payload.email
    user.save()
    return {"message": "User has been modified successfully", "status": 200}


@api.put("/change-password", auth=AuthBearer())
def change_password(request, payload: ChangePassword):
    if payload is None:
        return 422, "Invalid Body"
    username = payload.username
    user = get_object_or_404(User, username=username)
    if user is not None:
        user.set_password(str(payload.new_password))
        user.save()
        token = request.headers.get('Authorization')
        auth_token = validate_token(token)
        user_id = get_object_or_404(Token, key=auth_token)
        user_id.delete()
        return {"message": "User password has been successfully changed", "status": 200}
    else:
        return 422, "Invalid input"


@api.delete("/logout", auth=AuthBearer())
def logout(request):
    token = request.auth
    Token.objects.filter(key=token).delete()
    return {"status": 200, "message": "User LoggedOut successfully"}
