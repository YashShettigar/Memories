from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from .models import posts_collection
from pymongo import ReturnDocument, DESCENDING
import bson
from datetime import datetime, timezone
import json
import jwt
import math
import re

@ensure_csrf_cookie
def get_posts(request):
    if request.method == "GET":
        page = request.GET.get("page")
        LIMIT = 4
        startIndex = (int(page)-1)*LIMIT
        total = posts_collection.count_documents({})
        lastIndex = total if total < startIndex+LIMIT else startIndex+LIMIT 

        post_messages = list(posts_collection.find()[startIndex : lastIndex].sort('createdAt', DESCENDING))
        for post in post_messages:
            post["_id"] = str(post["_id"])

        if post_messages:
            return JsonResponse({ 'data': post_messages, 'currentPage': int(page), 'numberOfPages': math.ceil(total/LIMIT) }, status=200)
        else:
            # if no document was found
            return JsonResponse({'message': 'Not found.'}, status=404)
    else:
        return JsonResponse({'message': "Bad Request."}, status=400)
    
def get_posts_by_search(request):
    if request.method == "GET":
        searchTitle = request.GET.get('searchQuery').strip()
        searchTags = request.GET.get('tags')

        searchTitle = re.compile(searchTitle, re.IGNORECASE)
        
        searchTags = list(searchTags.split(','))

        posts = list(posts_collection.find({ "$or": [{'title':searchTitle}, {'tags':{"$in": searchTags}}] }))

        if not posts:
            return JsonResponse({ 'message': 'No posts found!' }, status=404)
        
        for post in posts:
            post['_id'] = str(post['_id'])

        return JsonResponse({ 'data': posts }, status=200)        
    else:
        return JsonResponse({ 'message': 'Bad request' }, status=400)        
    
def get_single_post(request, id):
    if request.method == "GET":
        _post_id = id

        if not bson.ObjectId.is_valid(_post_id):
            return JsonResponse({ 'message': 'No post with that id.' }, status=404)
        
        post = posts_collection.find_one({ '_id': bson.ObjectId(_post_id) })

        if not post:
            return JsonResponse({ 'message': 'No post with that id.' }, status=404)
        
        post['_id'] = str(post['_id'])
        return JsonResponse({**post}, status=200)
    else:
        return JsonResponse({ 'message': 'Bad request' }, status=400)

def get_current_datetime():
    time = datetime.now(timezone.utc)
    modt = time.strftime("%Y-%m-%dT%H:%M:%S.%f%z")

    return modt[:-8]+modt[-5:-2]+":"+modt[-2:]

def authenticate(request):
    try: 
        _token = request.META['HTTP_AUTHORIZATION'].split()[1]
        _is_custom_token = len(_token) < 500

        if _token and _is_custom_token:
            _decoded_data = jwt.decode(_token, "test", algorithms=["HS256"])
            return {'type': 'bson', 'value': _decoded_data['id']}
        else:
            # For Google token auth
            _decoded_data = jwt.decode(_token, algorithms=["RS256"], options={ 'verify_signature': False })
            return {'type': 'sub', 'value': _decoded_data['sub']}

    except Exception as exc:
        print(f'Exception Occured.\n{exc}')
        return None


def create_post(request):
    post = json.loads(request.body.decode('utf=8'))
    user_id = authenticate(request)
    
    if user_id['type'] == 'bson' and not bson.ObjectId.is_valid(user_id['value']):
        return JsonResponse({'message': "Signup or Login to post your Memories."}, status=400)
    
    post_time = get_current_datetime()
    new_post = posts_collection.insert_one({**post, 'likes': [], 'comments': [], 'creator': user_id['value'], 'createdAt': post_time})

    if new_post:
        return JsonResponse({'_id': str(new_post.inserted_id), **post, 'creator': user_id['value'], 'createdAt': post_time}, status=201)
    else:
        return JsonResponse({'message': "Unable to create post"}, status=409)
    
def update_post(request, id):
    _post_id = id
    post = json.loads(request.body.decode('utf-8'))

    user_id = authenticate(request)
    
    if user_id['type'] == 'bson' and not bson.ObjectId.is_valid(user_id['value']):
        return JsonResponse({'message': "Signup or Login to post your Memories."}, status=400)
    
    if not bson.ObjectId.is_valid(_post_id):
        return JsonResponse({'message': 'No post with that id.'}, status=404)
    
    post = dict(filter(lambda attr: attr[0] != '_id', post.items()))
    
    updated_post = posts_collection.find_one_and_update({'_id': bson.ObjectId(_post_id)}, {"$set": {**post}}, return_document=ReturnDocument.AFTER)

    if not updated_post:
        return JsonResponse({'message': 'Internal Server Error'}, status=500)

    updated_post['_id'] = str(updated_post['_id'])
    return JsonResponse({**updated_post}, status=200)
    
def delete_post(request, id):
    _post_id = id
    
    user_id = authenticate(request)
    
    if user_id['type'] == 'bson' and not bson.ObjectId.is_valid(user_id['value']):
        return JsonResponse({'message': "Signup or Login to post your Memories."}, status=400)

    if not bson.ObjectId.is_valid(_post_id):
        return JsonResponse({'message': 'No post with that id.'}, status=404)
    
    deleted_post = posts_collection.find_one_and_delete({'_id': bson.ObjectId(_post_id)})

    if not deleted_post:
        return JsonResponse({'message': 'Internal Server Error.'}, status=500)
    
    return JsonResponse({'message': 'Post deleted successfully.'})

def like_post(request, id):
    _post_id = id

    user_id = authenticate(request)
    
    if user_id['type']=='bson' and not bson.ObjectId.is_valid(user_id['value']):
        return JsonResponse({'message': "Signup or Login to post your Memories."}, status=400)
    
    if not bson.ObjectId.is_valid(_post_id):
        return JsonResponse({'message': 'No post with that id.'}, status=404)
    
    post = posts_collection.find_one({'_id': bson.ObjectId(_post_id)})

    if not post:
        return JsonResponse({'message': 'No post with that id.'}, status=404)

    try:
        post['likes'].remove(user_id['value'])
    except ValueError:
        post['likes'].append(user_id['value'])


    post.pop('_id')
    updated_post = posts_collection.find_one_and_update({'_id': bson.ObjectId(_post_id)}, {"$set": {**post}}, return_document=ReturnDocument.AFTER)

    if not updated_post:
        return JsonResponse({'message': 'Internal Server Error.'}, status=500)
    
    updated_post['_id'] = str(updated_post['_id'])
    return JsonResponse({**updated_post}, status=200)

def commentPost(request, id):
    _post_id = id

    comment = json.loads(request.body.decode('utf-8'))['comment']

    user_id = authenticate(request)

    if user_id['type']=='bson' and not bson.ObjectId.is_valid(user_id['value']):
        return JsonResponse({'message': "Signup or Login to post your Memories."}, status=400)
    
    if not bson.ObjectId.is_valid(_post_id):
        return JsonResponse({'message': 'No post with that id.'}, status=404)
    
    post = posts_collection.find_one({'_id': bson.ObjectId(_post_id)})

    post.pop('_id')
    post['comments'].append(comment)

    updated_post = posts_collection.find_one_and_update({'_id': bson.ObjectId(_post_id)}, {"$set": {**post}}, return_document=ReturnDocument.AFTER)

    if not updated_post:
        return JsonResponse({'message': 'Internal Server Error.'}, status=500)
    
    updated_post['_id'] = str(updated_post['_id'])
    return JsonResponse({**updated_post}, status=200)
    