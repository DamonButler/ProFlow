import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import Sidebar from './components/Sidebar'
import Projects from "./components/Projects/Projects";
import MyAccount from "./components/MyAccount/MyAccount"
import SignUp from './components/Logging/SignUp'
import Login from './components/Logging/Login'
import { UserProvider } from "./User";
import Team from "./components/Team";

function App() {
    const [signUp, setSignUp] = useState(false)
    const [users, setUsers] = useState([])
    const [user, setUser] = useState(null);
    const [projects, setProjects] = useState([])
    const [tasks, setTasks] = useState([])

    const handleSignupClick=() =>{
        setSignUp(!signUp)
    }

    const handleLogin = (loggedInUser) => {
        setUser(loggedInUser);
    };

    const handleLogout = () => {
        setUser(null);
    };

    useEffect(() => {
        fetch('http://127.0.0.1:5555/projects')
        .then(r => r.json())
        .then(data => setProjects(data))
    }, [])
  

    const addProjectsToState = (newProjectObj) => {
        setProjects([newProjectObj, ...projects])
    }

    
    const addUserToState = (newUserObj) => {
        setUsers([newUserObj, ...users])
    }

    const handleProjectDelete = (id) => {
        setProjects(projects.filter(project => {
            return project.id !== id
        }))
    }

    const handleTaskDelete = (id) => {
        setTasks(tasks.filter(task => {
            return task.id !== id
        }))
    }

    
    return (

        <div >
            <UserProvider>
            <div className='pageContainer'>
                {<Sidebar handleLogout={handleLogout} />}
                <div>
                    <Routes>
                        <Route path="/team" element={<Team />} />
                        <Route path="/projects" element={<Projects key={projects.id} id = {projects.id} addProjectsToState={addProjectsToState} handleProjectDelete={handleProjectDelete} handleTaskDelete={handleTaskDelete}/>} />
                        <Route path='/login' element={<Login handleLogin={handleLogin}/>} />
                        <Route path='/signup' element={<SignUp addUserToState={addUserToState} />} />
                        <Route path='/myaccount' element={<MyAccount />} />
                    </Routes>
                </div>
                
            </div> 
            </UserProvider>
        </div>
    )}

  

export default App
