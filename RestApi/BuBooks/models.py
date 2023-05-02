from django.db import models
from django.contrib.auth.models import User


def author_directory_path(instance, filename):
    # Image will be uploaded to Media/images/authors/author_<id>/<filename>
    return "images/authors/author_{0}/{1}".format(instance.user.id, filename)


# Create your models here.
class Author(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    about_you = models.TextField()
    image = models.ImageField(upload_to=author_directory_path)

    def __str__(self):
        return f"{self.user}"


class Category(models.Model):
    category = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.category}"


def book_directory_path(instance, filename):
    # File will be uploaded to Media/books/book_<id>/<filename>
    return "books/book_{0}/{1}".format(instance.user.id, filename)


def book_cover_directory_path(instance, filename):
    # Image will be uploaded to Media/images/book_cover/book_<id>/<filename>
    return "images/book_cover/book_{0}/{1}".format(instance.user.id, filename)


class Book(models.Model):
    supplier = models.BigIntegerField()
    supplier_book_id = models.BigIntegerField()
    # id_author = models.ForeignKey(Author, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    # Make a Choice field with the languages
    language = models.CharField(max_length=50)
    synopsis = models.TextField()
    category = models.ManyToManyField(Category)
    series = models.CharField(max_length=500)
    volumeNumber = models.IntegerField()

    class TargetAudience(models.IntegerChoices):
        Baby = "3"
        Kid = "7"
        EarlyAdolescence = "12"
        Teenagers = "16"
        Adult = "18"

    target_audience = models.IntegerField(choices=TargetAudience.choices)
    mature_content = models.BooleanField()
    price = models.DecimalField(max_digits=5, decimal_places=2)
    book_cover = models.ImageField(upload_to=book_cover_directory_path)
    book_file = models.FileField(upload_to=book_directory_path)

    # choices of the book status, default value = on sale.

    class Status(models.TextChoices):
        Onsale = "O"
        Archived = "A"

    status = models.CharField(choices=Status.choices, max_length=1)
    sales = models.BigIntegerField()

    def __str__(self):
        return f"{self.title}"


class Comment(models.Model):
    title = models.CharField(max_length=100)
    comment = models.TextField()
    # Make a Choice field with the ratings
    rating = models.IntegerField()
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
