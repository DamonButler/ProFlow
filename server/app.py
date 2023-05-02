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
        users = [u.to_dict() for u in User.query.all()]
        return make_response(
            users,
            200
        )
api.add_resource(Users, '/users')

class UserById(Resource):
    def get(self, id):
        user = User.query.filter(User.id == id).first()
        if not user:
            return make_response(
                {'error': 'User not found'},
                404
            )
        else:
            return make_response(
                user.to_dict(),
                200
            )
        
api.add_resource(UserById, '/users/<int:id>')

class Projects(Resource):
    def get(self):
        projects = Project.query.all()
        return make_response(
            [project.to_dict() for project in projects],
            200
        )
    def post(self):
            data = request.get_json()
            project = Project(
            name = data['name'],
            description = data['description'],
            start_date = data['start_date'],
            end_date = data['end_date'],
            status = data['status'],
            user_id = data['user_id']
            )
            db.session.add(project)
            db.session.commit()
            return make_response(project.to_dict(), 201)
       

api.add_resource(Projects, '/projects')

class ProjectsById(Resource):
    def get(self,id):
        project = Project.query.filter_by(id=id).first()
        if not project:
            return make_response(
                {'error': "Project not found"},
                404
            )
        return make_response(
            project.to_dict(),
            200
        )
    
    def delete(self, id):
        project = Project.query.filter_by(id=id).first()
        if not project:
            return make_response(
                {'error': 'Project not found.'},
                404
            )
        db.session.delete(project)
        db.session.commit()
        return make_response(
            {'delete': 'delete successful'},
            200
        )
    def patch(self, id):
        data = request.get_json()
        project = Project.query.filter_by(id=id).first()

        for key in data.keys():
            setattr(project, key, data[key])
        db.session.add(project)
        db.session.commit()


    
api.add_resource(ProjectsById, '/projects/<int:id>')

class Tasks(Resource):
    def get(self):
        tasks = Task.query.all()
        return make_response(
            [task.to_dict() for task in tasks],
            200
        )
    
    def post(self):
        task_data = request.get_json()

        new_task = Task(name=task_data['name'],
                        description=task_data['description'],
                        start_date=task_data['start_date'],
                        end_date=task_data['end_date'],
                        status=task_data['status'],
                        project_id=task_data['project_id'])
        db.session.add(new_task)
        db.session.commit()
        return {'message': 'Task created successfully.'}, 201

api.add_resource(Tasks, '/tasks')


class UserProjects(Resource):
    def get(self):
        ups = UserProject.query.all()
        return make_response(
            [up.to_dict() for up in ups],
            200
        )
api.add_resource(UserProjects, '/user_projects')



class Signup(Resource):
    def post(self):
        data = request.get_json()
        new_user = User(
            username = data['username'],
            email = data['email'],
            image = data['image'],
            _password = data['password']
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
            return {'error': 'Please enter a valid username and password'}, 404

        
        elif user.authenticate(password):
            session['user_id'] = user.id
            return make_response(
                user.to_dict(),
                200
            )
        return {'error': 'Must enter a valid username and password'}, 404
api.add_resource(Login, '/login')

class Logout(Resource):
    def delete(self):
        session.clear()
        return {'message': '204: No Content'}, 204

api.add_resource(Logout, '/logout')

class CheckSession(Resource):

    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            return user.to_dict()
        else:
            return {'message': '401: Not Authorized'}, 401

api.add_resource(CheckSession, '/check_session')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
