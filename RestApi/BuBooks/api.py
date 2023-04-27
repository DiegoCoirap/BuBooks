from ninja import NinjaAPI
from ninja.security import django_auth
from BuBooks.models import Book

api = NinjaAPI(csrf=True)


# Generate data with Factory boy django

@api.get("/pets", auth=django_auth)
def pets(request):
    return f"Authenticated user {request.auth}"


@api.get("/add")
def add(request, a: int, b: int):
    return {"result": a + b}


@api.get("/library")
def main(request):
    books = Book.objects.all()
    output = []
    for row in books:
        dictionary = {'id': row.id, 'title': row.title, 'url_cover': row.url_cover, 'price': row.price}
        output.append(dictionary)
    return output
