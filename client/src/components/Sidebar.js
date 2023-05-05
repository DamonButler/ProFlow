import React from 'react'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../User';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  function handleLogout() {
    fetch('/logout', {
      method: 'DELETE',
    }).then(() => setUser(null));
    navigate('/login')
  }

  return (
    <nav className="sidebar">
      <ul className="sidebar__list">
        {!user && (
          <>
            <li className="sidebar__item">
              <NavLink to="/login" className="sidebar__link"></NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li className="sidebar__item">
              <NavLink to="/" className="sidebar__link">Home</NavLink>
            </li>
            <li className="sidebar__item">
              <NavLink to="/projects" className="sidebar__link">Projects</NavLink>
            </li>
            <li className="sidebar__item">
              <NavLink to="/myaccount" className="sidebar__link">
                {user ? user.username : 'Profile'}
              </NavLink>
            </li>
            <li className="sidebar__item" style={{ marginLeft: 'auto' }}>
              <button onClick={handleLogout} className="sidebar__button">Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Sidebar;