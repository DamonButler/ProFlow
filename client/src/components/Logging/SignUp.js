import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../User";

function SignUp({addUserToState}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [image, setImage] = useState("")
    const {refreshUser} = useContext(UserContext)
    const navigate = useNavigate();
  
    const user = {
        username: username,
        password: password,
        email: email,
        image: image
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)
        })
            .then(r => {
                if (r.ok){
                    r.json().then(addUserToState(user))
                    refreshUser()
                    navigate('/')
                } else {
                    console.log('failure')
                }   
            })
        e.target.reset()
    }

  return (
    <div>
      <div>
        Welcome to ProFlow!
      </div>
      <div>
        <div>
          <h2>
            Create a New Account
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              name="username"
              placeholder="username"
            />
          </div>
          <div>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="text"
              name="password"
              placeholder="password"
            />
          </div>
          <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              name="email"
              placeholder="email address"
            />
          <div>
            <input
              onChange={(e) => setImage(e.target.value)}
              type="text"
              name="image"
              placeholder="profile photo URL"
            />
          </div>
          <button type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
