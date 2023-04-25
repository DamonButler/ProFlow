from config import db, bcrypt
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    _password = db.Column(db.String, nullable=False)
    image = db.Column(db.String)

    projects = db.relationship('Project', backref='user', lazy=True)

    @hybrid_property
    def password_hash(self):
        return self._password

    @password_hash.setter
    def password_hash(self, password=''):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password, password.encode('utf-8'))

    @validates('_password')
    def pass_hashing(self, key, attr):
        password_hash = bcrypt.generate_password_hash(attr.encode('utf-8'))
        return password_hash.decode('utf-8')


class Project(db.Model, SerializerMixin):
    __tablename__ = 'projects'

    serialize_rules = ("-user_projects", "-user")

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    start_date = db.Column(db.String, nullable=False)
    end_date = db.Column(db.String, nullable=True)
    status = db.Column(db.String, default='Not started', nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    tasks = db.relationship('Task', backref='project', lazy=True)


class UserProject(db.Model, SerializerMixin):
    __tablename__ = 'user_projects'

    serialize_rules = ('-projects', '-tasks')

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)
    created_at = db.Column(db.String)


class Task(db.Model, SerializerMixin):
    __tablename__ = 'tasks'

    serialize_rules = ("-project",)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    start_date = db.Column(db.String)
    end_date = db.Column(db.String, nullable=True)
    status = db.Column(db.String, default='Not started', nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)

    @hybrid_property
    def user(self):
        return self.project.user

    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise ValueError('Name cannot be empty.')
        return name

