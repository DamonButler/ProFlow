import React from 'react'
import { NavLink } from 'react-router-dom'

function Sidebar() {

  function refreshPage() {
    window.location.href = '/';
  }
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/projects" >
            Projects
          </NavLink>
        </li>
        <li>
          <NavLink to="/myaccount" >
            Profile
          </NavLink>
        </li>
        <li style={{ marginLeft: 'auto' }}>
          <NavLink to="/login" onClick={refreshPage}>
            Logout
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}


export default Sidebar