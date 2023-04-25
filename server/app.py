#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import make_response, request, session, jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import User, Project, Task, UserProject

class Users(Resource):
    def get(self):
        return "Does this work?"
    
api.add_resource(Users, '/users')

class Projects(Resource):
    def get(self):
        return "Does this work?"
    
api.add_resource(Projects, '/projects')

class UserProjects(Resource):
    def get(self):
        return "Does this work?"

class Tasks(Resource):
    def get(self):
        return "Does this work?"
    
api.add_resource(Tasks, '/tasks')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
