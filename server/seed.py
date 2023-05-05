#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# # Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db

from models import db, User, Project, Task, UserProject

app.app_context().push()

faker = Faker()

print("Deleting data...")
User.query.delete()
Project.query.delete()
Task.query.delete()
UserProject.query.delete()


print("Creating Users...")

u1 = User( username = 'Damon', email = "damon@proflow.com", _password = "password", image = "data:image/jpeg;base64,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")
u2 = User( username = 'Lauren', email = "lauren@proflow.com", _password = "password", image = "https://scontent-ord5-1.xx.fbcdn.net/v/t1.6435-9/86440374_10214175413213893_564389738128080896_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=jV6QzJITg-wAX94SX8h&_nc_ht=scontent-ord5-1.xx&oh=00_AfAFkqYz046kUKkAqrjYRfA7y7gHwcvXOPrtL3Gzqrun6g&oe=647236B2")
u3 = User( username = 'Megan', email = "megan@proflow.com", _password = "password", image = "https://scontent-ord5-1.xx.fbcdn.net/v/t1.18169-9/20106381_1628016840572821_4142912690782109668_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=UTI9exoaDXwAX-RoPbW&_nc_ht=scontent-ord5-1.xx&oh=00_AfAMgPZXLluBCtAysxWpALvRk2DHDb2GPZzsxZ2wbw7Zig&oe=647256FD")
u4 = User( username = 'Kyle', email = "kyle@proflow.com", _password = "password", image = "https://scontent-ord5-1.xx.fbcdn.net/v/t1.18169-9/10348282_10153039089778679_84708933128524464_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=cdbe9c&_nc_ohc=h_D-6kbm8CYAX8pExAx&_nc_ht=scontent-ord5-1.xx&oh=00_AfCoQu4qPuu0_8dVHRDMI5K8ZmXOYTkxwIxPr-Sfr5fwYQ&oe=64724AB5")



db.session.add_all([u1, u2, u3, u4])

db.session.commit()

print("Creating Projects...")

p1 = Project( name = 'Flatiron', description = "Final project for the 15 week course!", start_date = faker.date(), end_date = faker.date(), status = "In progress", user_id = u1.id)
p2 = Project( name = 'Frozen', description = "Ever feel like you wish time could be frozen?", start_date = faker.date(), end_date = faker.date(), status = "Completed", user_id = u1.id)
p3 = Project( name = 'Delta', description = "Just booked a flight!", start_date = faker.date(), end_date = faker.date(), status = "Completed", user_id = u2.id)
p4 = Project( name = 'Capstone', description = "Showing off the skills!", start_date = faker.date(), end_date = faker.date(), status = "In progress", user_id = u3.id)
p5 = Project( name = 'Backend Broken', description = "If you know, you know....", start_date = faker.date(), end_date = faker.date(), status = "Calamity", user_id = u4.id)
p6 = Project( name = 'Banking App', description = "Redesign Chase App", start_date = faker.date(), end_date = faker.date(), status = "In progress", user_id = u1.id)
p7 = Project( name = 'Case Manager App', description = "New case management app", start_date = faker.date(), end_date = faker.date(), status = "Canceled", user_id = u1.id)
p8 = Project( name = 'Youtube Redesign', description = "Redesign youtube layout", start_date = faker.date(), end_date = faker.date(), status = "In progress", user_id = u1.id)
p9 = Project( name = 'Deep Freeze Inc', description = "Getting cold in here", start_date = faker.date(), end_date = faker.date(), status = "Canceled", user_id = u1.id)
p10 = Project( name = 'Crazy Horse Redesign', description = "New website design for Crazy Horse", start_date = faker.date(), end_date = faker.date(), status = "In progress", user_id = u1.id)
p11 = Project( name = 'Sittin Bowl', description = "Full rebranding needed", start_date = faker.date(), end_date = faker.date(), status = "Canceled", user_id = u1.id)

db.session.add_all([p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11])


db.session.commit()

print("Creating Tasks...")

t1 = Task( name = 'Finish Backend', description = "Finish building out the backend so that the frontend devs can begin working", start_date = faker.date(), end_date = faker.date(), status = "Work in progress", project_id = p1.id)
t2 = Task( name = 'Send for code review', description = "Code is done and being sent to the senior dev for review", start_date = faker.date(), end_date = faker.date(), status = "Not started", project_id = p1.id)
t3 = Task( name = 'Build out basic frontend and backend functionality', description = "Build out the basics and send for review once completed", start_date = faker.date(), end_date = faker.date(), status = "Completed", project_id = p2.id)
t4 = Task( name = 'Assign Team members', description = "We need one frontend dev, one backend dev", start_date = faker.date(), end_date = faker.date(), status = "Work in progress", project_id = p3.id)
t5 = Task( name = 'Rebuild the broken back end', description = "Calamity on the backend, work on a fix, or rebuild.", start_date = faker.date(), end_date = faker.date(), status = "Calamity", project_id = p4.id)


print("Creating User Projects...")


up1 = UserProject(user_id=u1.id, project_id=p1.id, created_at=faker.date())
up2 = UserProject(user_id=u2.id, project_id=p2.id, created_at=faker.date())
up3 = UserProject(user_id=u3.id, project_id=p3.id, created_at=faker.date())
up4 = UserProject(user_id=u4.id, project_id=p4.id, created_at=faker.date())
up5 = UserProject(user_id=u4.id, project_id=p5.id, created_at=faker.date())


db.session.add_all([t1, t2, t3, t4, t5])
db.session.add_all([up1, up2, up3, up4, up5])
db.session.commit()

print("Seeding done!")
