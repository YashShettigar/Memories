from pymongo import MongoClient

from dotenv import dotenv_values

config = dotenv_values('.env')

# declaring this application as client to the MongoDB server & establishing the connection with it
client = MongoClient(config['CONNECTION_URL'])

# Instance for db queries. The argument inside square braces depicts the database name
db = client['test']