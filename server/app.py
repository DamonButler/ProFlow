#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import make_response, request, session, jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import User, Project, Task, UserProject

# Views go here!
session_user = []

class Users(Resource):
    def get(self):
        users = User.query.all()
        return make_response(
            [user.to_dict() for user in users],
            200
        )
api.add_resource(Users, '/users')

class UserById(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        if not user:
            return make_response(
                {'error': 'User not found'},
                404
            )
        return make_response(
            user.to_dict(rules = ('projects',)),
            200
        )
api.add_resource(UserById, '/users/<int:id>')


class Signup(Resource):
    def post(self):
        data = request.get_json()
        temp_user = User(
            username = data['username'],
            email = data['email'],
            image = data['image'],
            _password = data['password']
        )
        temp_user.password_hash = temp_user._password
        new_password = temp_user._password

        new_user = User(
            username = data['username'],
            email = data['email'],
            image = data['image'],
            _password = new_password
        )
        db.session.add(new_user)
        db.session.commit()

        return make_response(
            {},
            200
        )
api.add_resource(Signup, '/signup')
        

class Login(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter(
            User.username == data['username']
        ).first()

        password = data['password']
        if not user:
            return {'error': 'Must enter a valid username and password'}, 404

        
        elif user.authenticate(password):
            session['user_id'] = user.id
            session_user.append(user.to_dict(rules=('projects',)))
            return make_response(
                user.to_dict(),
                200
            )
        return {'error': 'Must enter a valid username and password'}, 404
api.add_resource(Login, '/login')

class Logout(Resource):
    def delete(self):
        session.pop('user_id', None)
        return session.get('user_id')
        

api.add_resource(Logout, '/logout')

class CurrentSession(Resource):
    def get(self):

        user = session_user[0]
        if not user:
            return make_response(
                {'error': 'User not found'},
                404
            )
    
        return make_response(
            user,
            200
        )
api.add_resource(CurrentSession, '/current-session')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
