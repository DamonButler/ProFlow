import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function SignUp({handleSignupClick}) {
  const navigate = useNavigate();

  const [session, setSession] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      username: username,
      password: password,
      email: email,
      image: image,
    };
    fetch('/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user),
    })
      .then((r) => {
        if (r.ok) {
          r.json().then(() => {
            console.log('success');
            setSession(true);
          });
        } else {
          console.log('failure');
        }
      })
      .catch((error) => {
        console.log('error: ', error);
      });
    e.target.reset();
  };

  const setSignupState = (e) => {
    e.preventDefault();
    handleSignupClick(e);
    navigate('/');
  };

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
        <div>
          <button onClick={setSignupState}>
            Return to Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
