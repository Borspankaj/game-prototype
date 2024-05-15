
from django.shortcuts import render
from rest_framework.response import Response
import pyrebase
from django.conf import settings
from rest_framework.decorators import api_view


database = []
@api_view(['GET'])
def home(request) :
    print(1111)
    connect_firebase()
    return Response()

@api_view(['GET'])
def get_word(request) :
    return Response()

def connect_firebase() :
    firebase_config = settings.FIREBASE
    config={
        'apiKey': firebase_config['apiKey'],
        'authDomain': firebase_config['authDomain'],
        'databaseURL': firebase_config['databaseURL'],
        'projectId': firebase_config['projectId'],
        'storageBucket': firebase_config['storageBucket'],
        'messagingSenderId': firebase_config['messagingSenderId'],
        'appId': firebase_config['appId']
    }

    firebase = pyrebase.initialize_app(config)
    authe = firebase.auth()
    database.append(firebase.database())


def get_random_word() :
    words = database[0].child()

    