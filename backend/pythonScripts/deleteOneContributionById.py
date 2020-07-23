import pymongo
from pymongo import MongoClient
from bson.objectid import ObjectId
import sys
import json

client = MongoClient()
db = client.scoreboard
contributions = db.contributions

def getContributorByName(id):
    # contributorWorkouts = contributions.find({"_id": ObjectId(id)})
    result = contributions.delete_one({"_id": ObjectId(id)})
    sys.stdout.write("deleted document: " + id + ". " + result)
    sys.stdout.flush()
    sys.exit(0)

getContributorByName(sys.argv[1])