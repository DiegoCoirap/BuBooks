from django.db import models
from django.contrib.auth.models import User


def author_directory_path(instance, filename):
    # Image will be uploaded to Media/images/author/author_<id>/<filename>
    return f"images/authors/author_{instance.user.username}/pfp/{filename}"


# Create your models here.
class Author(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    about_you = models.TextField()
    image = models.ImageField(upload_to=author_directory_path)

    def __str__(self):
        return f"{self.name}"


class Category(models.Model):
    category = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.category}"


def book_directory_path(instance, filename):
    # File will be uploaded to Media/books/book_<id>/<filename>
    return f"books/author_{instance.id_author.user.id}/{filename}"


def book_cover_directory_path(instance, filename):
    # Image will be uploaded to Media/images/book_cover/book_<id>/<filename>
    return f"images/authors/author_{instance.id_author.user.id}/book/{filename}"


class Book(models.Model):
    supplier = models.BigIntegerField()
    supplier_book_id = models.BigIntegerField()
    id_author = models.ForeignKey(Author, on_delete=models.CASCADE, default=0)
    title = models.CharField(max_length=100)

    # Make a Choice field with the languages
    class Language(models.TextChoices):
        Spanish = "ES"
        English = "EN"
        French = "FR"
        German = "DE"
        Japanese = "JA"
        Korean = "KO"
        Russian = "RU"
        Portuguese = "PT"
        Chinese = "ZH"
        Italian = "IT"
        Hindi = "HI"

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
    book_cover = models.ImageField(upload_to=book_cover_directory_path)
    book_file = models.FileField(upload_to=book_directory_path)

    # choices of the book status, default value = on sale.

    # noinspection SpellCheckingInspection
    class Status(models.TextChoices):
        Forsale = "O"
        Archived = "A"

    status = models.TextField(choices=Status.choices)
    sales = models.BigIntegerField()

    def __str__(self):
        return f"{self.title}"


class Comment(models.Model):
    title = models.CharField(max_length=100)
    comment = models.TextField()

    # Make a Choice field with the ratings
    class Rating(models.IntegerChoices):
        Zero = 0
        One = 1
        Two = 2
        Three = 3
        Four = 4
        Five = 5

    rating = models.IntegerField(choices=Rating.choices)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    book_id = models.ForeignKey(Book, on_delete=models.CASCADE)


class Cart(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    book_id = models.ForeignKey(Book, on_delete=models.CASCADE)


class Wishlist(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    book_id = models.ForeignKey(Book, on_delete=models.CASCADE)


class Sale(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    book_id = models.ForeignKey(Book, on_delete=models.CASCADE)
