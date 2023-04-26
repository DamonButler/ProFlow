#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# # Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db

from models import db, User, Project, Task, UserProject

with app.app_context():

    faker = Faker()

    print("Deleting data...")
    User.query.delete()
    Project.query.delete()
    Task.query.delete()


    print("Creating Users...")

    # users = [User( username= faker.user_name(), email = faker.email(),  _password= "password", image = faker.image_url()) for _ in range(1,5)]
    users = [User( username= "damon", email = faker.email(),  _password= "password", image = faker.image_url())]

    # u1 = User( username= 'b', email = 'b@1.com',  _password= 'password', image = 'https://t3.ftcdn.net/jpg/02/47/26/12/360_F_247261221_eGirP3pgZpNU8RY3yRG1qEslnRkNGKCk.jpg')
    # u2 = User( username= 'c', email = 'c@1.com', _password= 'password', image = 'https://i.pinimg.com/originals/92/a2/27/92a2274106026911bfb86ba6763fd921.jpg')
    # u3 = User( username= 'd', email = 'd@1.com', _password= 'password', image = 'https://static.vecteezy.com/system/resources/previews/002/007/779/original/cool-cartoon-wizard-vector.jpg')
    # u4 = User( username= 'e', email = 'e@1.com', _password= 'password', image = 'https://www.kindpng.com/picc/m/732-7323240_how-to-wizard-robes-cartoon-hd-png-download.png')



    print("Creating Projects...")

    projects = [Project( name= faker.name(), description = faker.word(),  start_date= faker.word(), end_date = faker.word(), status = faker.word(), user_id = '1') for _ in range(1,5)]
 

    # p1 = Project(name = 'Cosmo', description = 'Kitten', start_date = '6', end_date = '1', status = '1', user_id = u1)
    # p2 = Project(name = 'Basil', description = 'Great Dane', start_date = '145', end_date = '5', status = '2', user_id = u2)
    # p3 = Project(name = 'Ammo', description = 'Lab', start_date = '96', end_date = '5', status = '3', user_id = u3)
    # p4 = Project(name = 'Birdie', description = 'NewfyDoodle', start_date = '62', end_date = '1', status = '4', user_id = u4)
    # p5 = Project(name = 'Zeke', description = 'Great Pyrenees', start_date = '150', end_date = '9', status = '5', user_id = u4)


    print("Creating Tasks...")

    tasks = [Task( name= faker.name(), description = faker.word(),  start_date= faker.word(), end_date = faker.word(), status = faker.word(), project_id = 1) for _ in range(1,5)]

    # t1 = Task(name = 'Chaos Central', description = "102 Whilwind Ave, Chicago, IL, 20039", start_date = '4', end_date = 'constant wind, drinking fountain, turf', status = 'https://images.unsplash.com/photo-1494947665470-20322015e3a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', project_id = p1)
    # t2 = Task(name = 'Open Meadows', description = "2983 Green St, Bend, OR, 69401", start_date = '5', end_date = 'gentle rolling hills, quiet breeze, birds chirping', status = 'https://images.unsplash.com/photo-1621851327323-bc467dd48d86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80', project_id = p2)
    # t3 = Task(name = 'Dirt Bowl', description = "73 Dessert St, Phoenix, AZ, 98703", start_date = '2', end_date = 'dust, cactus', status = 'https://images.unsplash.com/photo-1470208564179-dd5b52a0d010?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1262&q=80', project_id = p3)
    # t4 = Task(name = 'Splash Park', description = "19 Ocean View, Oceanside, CA, 302036", start_date = '4', end_date = 'pool, puddles, fountains', status = 'https://images.unsplash.com/photo-1600179787118-5cac22037b2f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', project_id = p4)
    # t5 = Task(name = 'Fetch Zone', description = "36 Trailside Run, Boston, MA, 80372", start_date = '5', end_date = 'endless tennis balls, 73 fenced in acres', status = 'https://images.unsplash.com/photo-1569992274375-e56b14e234f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1175&q=80', project_id = p5)

    print("Creating User Projects...")

    ups = [UserProject(user_id = "1", project_id = "2", created_at = "Today")]

    db.session.add_all(users)
    db.session.add_all(projects)
    db.session.add_all(tasks)
    db.session.add_all(ups)
    
    db.session.commit()

    print("Seeding done!")
