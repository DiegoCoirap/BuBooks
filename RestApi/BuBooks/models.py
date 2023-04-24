from django.db import models


# Create your models here.


class User(models.Model):
    email = models.CharField(max_length=1000)
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=2000)
    session_token = models.CharField(max_length=2000)


class Author(models.Model):
    username = models.CharField(max_length=100, unique=True)
    email = models.CharField(max_length=1000)
    password = models.CharField(max_length=2000)
    session_token = models.CharField(max_length=2000)
    name = models.CharField(max_length=100)
    about_you = models.CharField(max_length=1000)
    url_image = models.CharField(max_length=1000)


class Category(models.Model):
    category = models.CharField(max_length=50)


class Book(models.Model):
    supplier = models.BigIntegerField()
    supplier_book_id = models.BigIntegerField()
    title = models.CharField(max_length=100)
    url_cover = models.CharField(max_length=2000)
    language = models.CharField(max_length=50)
    synopsis = models.CharField(max_length=1000)
    category = models.ManyToManyField(Category)
    series = models.CharField(max_length=500)
    volumeNumber = models.IntegerField()
    target_audience = models.IntegerField()
    mature_content = models.BooleanField()
    price = models.FloatField()
    url_book = models.CharField(max_length=2000)
    url_fragment = models.CharField(max_length=2000)
    # choices of the book status, default value = on sale.
    Archived = "A"
    OnSale = "OS"
    status_choices = [(Archived, "Archived"), (OnSale, "On Sale")]
    status = models.CharField(status_choices, default=OnSale, max_length=100)
    sales = models.BigIntegerField()
    id_author = models.ForeignKey(Author, on_delete=models.CASCADE)

    def is_on_sale(self):
        return self.status in {self.OnSale}


class Comment(models.Model):
    comment = models.CharField(max_length=1000)
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
    date = models.DateTimeField()
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    book_id = models.ForeignKey(Book, on_delete=models.CASCADE)