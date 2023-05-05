import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../User';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Modal } from 'semantic-ui-react';
import SignUp from './SignUp';

function Login() {
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginFailed, setLoginFailed] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((r) => r.json())
      .then((user) => {
        if (user) {
          setUser(user);
          setOpen(false);
          navigate('/projects');
        } else {
          setLoginFailed(true);
        }
      });
  }

  return (
    <div className="proflow-body">
      <div className="proflow-image"> <img className='proflow-image' src='https://i.imgur.com/aIR61eo.png' alt='home pic' /></div>
      <div className="proflow-login">
        <div className="proflow-login-container">
          <div className="proflow-title">ProFlow</div>
          <div className="proflow-project-description">The project management platform built for your team’s next project.</div>
          <div className="proflow-info"></div>
          <div className="login-container">
          <Modal
            className='login-modal'
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<button className="login-button">Log In</button>}
          >
            <div className="login-modal-content">
              <div className="login-form-container">
                <br/><br/><br/><br/><br/>
                <Modal.Header className="login-header">Log In</Modal.Header>
                <form onSubmit={handleSubmit} className="login-form">
                <br/>
                <p className='login-p'>Login with your username and password</p>
                <br/>
                  <label className='login-labels'>Username</label>
                  <input
                    type="text"
                    placeholder='Enter Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <label className='login-labels'>Password</label>
                  <input
                    type="password"
                    placeholder='Enter Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button type="submit" className="submit-button">Log In</Button>
                </form>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <div>Don't have an account?<Link to="/signup">Sign Up</Link></div>
              </div>
              <div className="login-image-container">
                <img className="login-image" src="https://i.imgur.com/p6bhNL6.png" alt="login pic" />
              </div>
            </div>
          </Modal>
          <SignUp />
          {loginFailed && (
            <Modal
              onClose={() => setLoginFailed(false)}
              open={true}
            >
              <Modal.Header>Login Failed</Modal.Header>
              <Modal.Content>
                <p>Incorrect username or password. Please try again.</p>
              </Modal.Content>
              <Modal.Actions>
                <Button onClick={() => setLoginFailed(false)}>OK</Button>
              </Modal.Actions>
            </Modal>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}

export default Login;