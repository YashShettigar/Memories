from django.db import models
from db_connection import db

# create an instance for 'Users' collection within the db

user_collection = db['users']
