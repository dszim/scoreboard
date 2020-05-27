import pymongo
from pymongo import MongoClient
import sys
import json

client = MongoClient()
db = client.scoreboard
collection = db.contributions
contributors = db.contributors

def getUniqueContributorsByName():
    collatedContributors = collection.aggregate([
        {"$group": { "_id": "$name"}}
    ])
    sys.stdout.write(json.dumps(list(collatedContributors)))
    sys.stdout.flush()
    sys.exit(0)

getUniqueContributorsByName()