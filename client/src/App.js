import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router";
import Sidebar from './components/Sidebar'
import Projects from "./components/Projects/Projects";
import MyAccount from "./components/MyAccount/MyAccount"
import SignUp from './components/Logging/SignUp'
import Login from './components/Logging/Login'
import { UserProvider } from "./User";

function App() {
    const [signUp, setSignUp] = useState(false)
    const [users, setUsers] = useState([])

    const handleSignupClick=() =>{
        setSignUp(!signUp)
    }

    const [user, setUser] = useState(null);

    const handleLogin = (loggedInUser) => {
        setUser(loggedInUser);
    };

    const handleLogout = () => {
        setUser(null);
    };

    const [projects, setProjects] = useState([])

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

    
    return (

        <div >
            <UserProvider>
            <div className='pageContainer'>
                {<Sidebar handleLogout={handleLogout} />}
                <div>
                    <Routes>
                        <Route path="/" element={user ? <h2>Welcome {user?.username}!</h2> : <h2>Welcome to ProFlow</h2>} />
                        <Route path="/projects" element={<Projects key={projects.id} id = {projects.id} addProjectsToState={addProjectsToState} handleProjectDelete={handleProjectDelete}/>} />
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
