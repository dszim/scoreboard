import json
import pymongo
from pymongo import MongoClient
import sys

client = MongoClient()
db = client.scoreboard
collection = db.contributions
contributors = db.contributors

def sortit(e):
    return e['meters']

def getUniqueContributorsByNameAndTotalMeters():
    collatedContributors = collection.aggregate([
        {"$group": { "_id": "$name", "meters": { "$sum": "$distance" }, "time": { "$sum": "$time" }, "count": { "$sum": 1 }}}
    ])

    rowerList = list(collatedContributors)
    rowerList.sort(key=sortit)
    sys.stdout.write(json.dumps(rowerList))
    sys.stdout.flush()
    sys.exit(0)

getUniqueContributorsByNameAndTotalMeters()