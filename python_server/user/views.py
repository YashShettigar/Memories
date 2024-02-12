import bcrypt
import jwt
from .models import user_collection
from django.http import JsonResponse
from datetime import datetime, timedelta, timezone
import json
import requests
from dotenv import dotenv_values

def signup(request):
    if request.method == "POST":
        request_data = json.loads(request.body.decode('utf=8'))

        # find whether user exists
        existing_user = user_collection.find_one({"email": request_data['email']})

        # runs when User already exists
        if existing_user:
            existing_user['_id'] = str(existing_user['_id'])
            return JsonResponse({'message': 'User already exists.'}, status=400)
        
        # runs when entered and confirmed passwords requested by the client are not same
        if not request_data['password'] == request_data['confirmPassword']:
            return JsonResponse({'message': 'Passwords don\'t match.'}, status=400)
        
        # following code executes when user doesn't exist in our database
        byte_password = request_data['password'].encode('utf-8')
        _salt = bcrypt.gensalt()

        hashed_password = bcrypt.hashpw(byte_password, _salt)

        _user_record = {
            'name': f'{request_data["firstName"]} {request_data["lastName"]}',
            'email': request_data['email'],
            'password': str(hashed_password.decode('utf-8'))
        }

        _user_id = str(user_collection.insert_one(_user_record).inserted_id)
        token = None

        try:
            exp_time = (datetime.now(tz=timezone.utc)+timedelta(hours=2)).timestamp()
            token = jwt.encode({'email': request_data['email'], 'id': _user_id}, "test", algorithm="HS256", headers={'exp': exp_time})
        except Exception as exc:
            # this block runs when InvalidOperation exception is raised when accessing the inserted_id which is due to operation being unacknowledged
            return JsonResponse({'message': f'Something went wrong!\n{str(exc)}'}, status=500)

        # used while API testing
        _user_record.pop('_id')
        return JsonResponse({'result': {'id': _user_id, **_user_record}, 'token': token}, status=201)
    else:
        return JsonResponse({'message': 'Bad Request.'}, status=400)

def signin(request):
    if request.method == "POST":
        request_data = json.loads(request.body.decode('utf-8'))

        if 'code' in request_data:
            return google_login(request_data)
        
        existing_user = user_collection.find_one({'email': request_data['email']})

        if not existing_user:
            return JsonResponse({'message': "User doesn't exist."}, status=404)
        
        bytes_password = request_data['password'].encode('utf=8')
        is_password_correct = bcrypt.checkpw(bytes_password, existing_user['password'].encode('utf-8'))

        if not is_password_correct:
            return JsonResponse({'message': 'Invalid credentials.'}, status=400)
        
        try:
            exp_time = (datetime.now(tz=timezone.utc)+timedelta(hours=2)).timestamp()
            token = jwt.encode({'email': existing_user['email'], 'id': str(existing_user['_id'])}, 'test', algorithm="HS256", headers={'exp': exp_time})
        except:
            return JsonResponse({'message': 'Something went wrong!'}, status=500)
        
        # used while API Testing
        existing_user['_id'] = str(existing_user['_id'])
        existing_user.pop('password')
        return JsonResponse({'result': existing_user, 'token': token}, status=200)
    else:
        return JsonResponse({'message': 'Bad Request.'}, status=400)
    
def google_login(request_body):
    
    config = dotenv_values('.env')

    code = request_body['code']
    
    # print(config)
    tokens = requests.post(config['OAUTH_TOKEN_URL'], {
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': config['REDIRECT_URL'],
        'client_id': config['CLIENT_ID'],
        'client_secret': config['CLIENT_SECRET']
    })

    tokens = json.loads(tokens.text)

    user_info = jwt.decode(tokens['id_token'], algorithms=["RS256"], options={ 'verify_signature': False })

    result = {'_id': user_info['sub'], 'name': user_info['name'], 'email': user_info['email'], 'picture': user_info['picture']}

    if tokens:
        return JsonResponse({'result': result, 'token': tokens['id_token']}, status=200)
    else:
        return JsonResponse({'message': 'Not found!'}, status=404)
    