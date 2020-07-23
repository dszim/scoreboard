import pymongo
from pymongo import MongoClient
import sys
import json

client = MongoClient()
db = client.scoreboard
collection = db.contributions
contributors = db.contributors

def insertOneWorkout(workout):
    result = collection.insert_one(json.loads(workout))   
    sys.stdout.write(result.inserted_id)
    sys.stdout.flush()
    sys.exit(0)

insertOneWorkout(sys.argv[1])
