#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import make_response, request, session, jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import User, Project, Task

class Users(Resource):
    def get(self):
        return "Does this work?"
    
api.add_resource(Users, '/users')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
