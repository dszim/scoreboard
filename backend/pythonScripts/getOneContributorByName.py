import pymongo
from pymongo import MongoClient
import sys
import json

client = MongoClient()
db = client.scoreboard
contributors = db.contributors
contributions = db.contributions

def getContributorByName(name):
    contributorWorkouts = contributions.find({'name': name})
    for doc in contributorWorkouts:
        print(doc)
    
    sys.stdout.write(json.dumps(list(contributorWorkouts)))
    sys.stdout.flush()
    sys.exit(0)

getContributorByName(sys.argv[1])