import React, {useState} from 'react'
import SignUp from './components/Logging/SignUp'
import LogIn from './components/Logging/Login'

function App() {
    const [signUp, setSignUp] = useState(false)
    const handleSignupClick=() =>{
        setSignUp(!signUp)
    }
    
  return (

    <div >
      {signUp ? (
              <div>
                <SignUp handleSignupClick = {handleSignupClick}/>
              </div>
            ):(
              <div>
                <LogIn handleSignupClick = {handleSignupClick}/>
              </div>
            )} 
    </div>
  )}

export default App