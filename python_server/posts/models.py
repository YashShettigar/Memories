from django.db import models
from db_connection import db

# create an instance for 'PostMessages' collection within the db

posts_collection = db['postmessages']
