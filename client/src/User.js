import React, { useEffect, useState } from 'react';

const UserContext = React.createContext();

function UserProvider({children}) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/check_session").then(r => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

const refreshUser = () => {
  fetch("/check_session").then(r => {
      if (r.ok) {
          r.json().then((user) => setUser(user));
      }
  });
}

const addUserProject = (projectObj) => {
  const userCopy = {...user}
  userCopy.projects.push(projectObj)
  setUser(userCopy)
}

const deleteUserProject = (id) => {
  const userCopy = {...user}
  userCopy.projects = userCopy.projects.filter(project => {
    return project.id !== id
  })
  setUser(userCopy)
}

const editUserProject = updatedProject => {
  const userCopy = {...user}
  userCopy.projects = userCopy.projects.map(project => {
    if (project.id === updatedProject.id) {
      return {...updatedProject}
    } else {
      return project
    }
  })
}

return(
  <UserContext.Provider value = {{user, setUser, refreshUser, addUserProject, deleteUserProject, editUserProject}}>
    {children}
  </UserContext.Provider>
)
}

export {UserContext, UserProvider}

