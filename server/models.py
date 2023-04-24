from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.String(50), nullable=False)

class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    start_date = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    end_date = db.Column(db.DateTime, nullable=True)
    status = db.Column(db.String(20), default='Not started', nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    tasks = db.relationship('Task', backref='project', lazy=True)

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    start_date = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    end_date = db.Column(db.DateTime, nullable=True)
    status = db.Column(db.String(20), default='Not started', nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)
