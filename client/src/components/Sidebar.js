import React from 'react'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../User';
import { useContext } from 'react';

function Sidebar() {
  const { user, setUser } = useContext(UserContext);

  function handleLogout() {
    fetch('/logout', {
      method: 'DELETE',
    }).then(() => setUser(null));
  }

  return (
    <nav>
      <ul>
        {!user && (
          <>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Signup</NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/projects">Projects</NavLink>
            </li>
            <li>
              <NavLink to="/myaccount">
                {user ? user.username : 'Profile'}
              </NavLink>
            </li>
            <li style={{ marginLeft: 'auto' }}>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Sidebar;