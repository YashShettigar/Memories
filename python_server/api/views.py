from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse

def welcome(request):
    if request.method == "GET":
        return JsonResponse({"message": "Welcome to Memories API."}, status=200)
    else:
        return JsonResponse({'message': 'Bad request.'}, status=400)

@ensure_csrf_cookie
def register_api_client(request):
    if request.method == "GET":
        # return render(request, 'template.html', status=200)
        return JsonResponse({"message": "API Client Registered successfully."}, status=201)
    else:
        # return render(request, 'template.html', status=201)
        return JsonResponse({'message': 'Bad request.'}, status=400)