// import React, { useState, useEffect } from "react";
// import { Routes, Route } from "react-router";
// import Sidebar from './components/Sidebar'
// import Projects from "./components/Projects/Projects";
// import MyAccount from "./components/MyAccount/User"
// import Home from "./components/Home";

// function Main() {
//   const [user, setUser] = useState(null);
//   const [projects, setProjects] = useState([])

//   useEffect(() => {
//     fetch('http://127.0.0.1:5555/projects')
//     .then(r => r.json())
//     .then(data => setProjects(data))
//   }, [])
  

//   const addProjectsToState = (newProjectObj) => {
//     setProjects([newProjectObj, ...projects])
//   }

//   const showRemainingProjects = (id) => {
//     const newProjectArray = projects.filter(projectObj => projectObj.id !== id)
//     setProjects(newProjectArray)
//   }

//   return (
//     <div className='pageContainer'>
//       <Sidebar/>
//       <div>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/projects" element={<Projects addProjectsToState={addProjectsToState} showRemainingProjects={showRemainingProjects} />} />
//             <Route path="/myaccount" element={<MyAccount />}/>
//           </Routes>
//       </div>
//     </div>
//   );
// }

// export default Main;
