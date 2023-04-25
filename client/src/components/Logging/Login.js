import React, {useState} from 'react'
// import {useHistory} from 'react-router-dom'
import { Route, Routes } from "react-router-dom";
import Main from '../../Main';

const sessionUser = []


function LogIn({handleSignupClick}) {

    const [session, setSession] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    if (session === false){
    
    const newUser = {
      username: username,
      password: password,
    }

    sessionUser.push(newUser)

    
    const handleSubmit = (e) => {
      e.preventDefault()
      fetch("/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newUser)
      })
        .then(r => {
            if (r.status === 200){
            r.json()
            setSession(!session)
            } else {
            console.log('login failed')
            }
      })
        e.target.reset()
    }
  
    const setSignupState = (e) => {
      handleSignupClick(e)
    }

    return (
        <div>
          <div>Welcome to ProFlow!</div>
          <div>
            <div>
              <h2>Login Here</h2>
          </div>
                <form onSubmit={handleSubmit}>
                  <div>
                    <input onChange={(e) => setUsername(e.target.value)} type="text" name="username" placeholder="username" />
                  </div>
                  <div>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="password" />
                  </div>
                <button type="submit">Submit</button>
                </form>
                <div>
                    <button onClick={setSignupState} >Need an account? Create one!</button>
                </div>
            </div>
      </div>
    );
    }
    else{
        return (
            <div>
                <Routes path="*">
                <Route path="*" element={<Main currentUser={sessionUser[sessionUser.length - 1]} />} />
                </Routes>
            </div>
        )
    }
}

export default LogIn;