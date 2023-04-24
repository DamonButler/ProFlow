#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db

from models import db, User, Dog, Visit, Dog_Park, Review

with app.app_context():

    faker = Faker()