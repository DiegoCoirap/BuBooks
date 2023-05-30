from django.db import models
from django.contrib.auth.models import User


class UserExtraData(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    is_author = models.BooleanField()
    avatar = models.ImageField()

    def check_author(self):
        if self.is_author:
            return 'Is an author'
        else:
            return 'Is an user'


def author_directory_path(instance, filename):
    # Image will be uploaded to Media/images/author/author_<id>/<filename>
    return f"images/authors/author_{instance.user.username}/pfp/{filename}"


# Create your models here.
class Author(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    alias = models.CharField(max_length=100, null=True)
    about_you = models.TextField(null=True)
    image = models.ImageField(upload_to=author_directory_path, null=True)

    def __str__(self):
        return f"{self.alias}"


class Category(models.Model):
    category = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.category}"


def book_directory_path(instance, filename):
    # File will be uploaded to Media/books/book_<id>/<filename>
    return f"books/author_{instance.author.user.id}/{filename}/"


def book_cover_directory_path(instance, filename):
    # Image will be uploaded to Media/images/book_cover/book_<id>/<filename>
    return f"images/authors/author_{instance.author.user.id}/book/{filename}/"


class Book(models.Model):
    author = models.ForeignKey(Author, on_delete=models.CASCADE, default=0)
    title = models.CharField(max_length=100, unique=True)

    # Make a Choice field with the languages
    class Language(models.TextChoices):
        Spanish = "ES", "Spanish"
        English = "EN", "English"
        French = "FR", "French"
        German = "DE", "German"
        Japanese = "JA", "Japanese"
        Korean = "KO", "Korean"
        Russian = "RU", "Russian"
        Portuguese = "PT", "Portuguese"
        Chinese = "ZH", "Chinese"
        Italian = "IT", "Italian"
        Hindi = "HI", "Hindi"

    language = models.TextField(choices=Language.choices)
    synopsis = models.TextField()
    category = models.ManyToManyField(Category)
    series = models.CharField(max_length=500)
    volumeNumber = models.IntegerField()

    class TargetAudience(models.TextChoices):
        Baby = "0-5"
        Kid = "5-10"
        EarlyAdolescence = "10-15"
        Teenagers = "15-20"
        YoungAdult = "20-25"
        Adult = "25+"

    target_audience = models.TextField(choices=TargetAudience.choices)
    mature_content = models.BooleanField()
    price = models.DecimalField(max_digits=5, decimal_places=2)
    book_cover = models.ImageField(upload_to=book_cover_directory_path, default=None)
    book_file = models.FileField(upload_to=book_directory_path, default=None)

    # choices of the book status, default value = archived.

    # noinspection SpellCheckingInspection
    class Status(models.TextChoices):
        Forsale = "O"
        Archived = "A"

    status = models.TextField(choices=Status.choices, default="A")
    sales = models.BigIntegerField(default=0)

    def __str__(self):
        return f"{self.title}"


class Comment(models.Model):
    title = models.CharField(max_length=100)
    comment = models.TextField()

    class Rating(models.IntegerChoices):
        Zero = 0
        One = 1
        Two = 2
        Three = 3
        Four = 4
        Five = 5

    rating = models.IntegerField(choices=Rating.choices)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)

    def __str__(self):
        response = f" BOOK: {self.book}, USER: {self.user}, RATING: {self.rating}"
        return f"{response}"


class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)

    def __str__(self):
        response = f" BOOK: {self.book}, USER: {self.user}"
        return f"{response}"


class Wishlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)

    def __str__(self):
        response = f" BOOK: {self.book}, USER: {self.user}"
        return f"{response}"


class Sale(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)

    def __str__(self):
        response = f" BOOK: {self.book}, USER: {self.user}"
        return f"{response}"
