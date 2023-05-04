import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../User';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'semantic-ui-react';

function Login() {
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
        setUser(user);
        setOpen(false);
        navigate('/');
      });
  }

  return (
    <div className="proflow-body">
      <h1 className="proflow-title">ProFlow Project Management</h1>
      <div className="login-container">
        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={<Button className="login-button">Login</Button>}
        >
          <Modal.Header className="login-header">ProFlow Login</Modal.Header>
          <Modal.Content>
            <form onSubmit={handleSubmit} className="login-form">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" className="submit-button">Submit</Button>
            </form>
          </Modal.Content>
        </Modal>
      </div>
    </div>
  );
}

export default Login;