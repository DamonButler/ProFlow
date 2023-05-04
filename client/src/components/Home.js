import React, { useState, useEffect } from 'react';
import { Container, Header, List } from 'semantic-ui-react';

function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <Container className="home-container">
      <Header as="h1" className="home-title">
        Welcome to ProFlow!
      </Header>
      <h2 className='home-title' >Team Members:</h2>
      <div >
        <List className="user-container">
          {users.map(user => (
            <List.Item key={user.id} className='user-card'>
              <div>
              <h2 className='user-container-name' >{user.username}</h2>
                <img src={user.image} alt={user.username} />

              </div>
            </List.Item>
          ))}
        </List>
      </div>
    </Container>
  );
}

export default Home;

