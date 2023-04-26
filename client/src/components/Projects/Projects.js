import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5555/projects/')
      .then(response => response.json())
      .then(data => setProjects(data))
      .catch(error => console.log(error));
  }, []);

  // const handleDelete = (id) => {
  //   const updatedProjects = projects.filter(project => project.id !== id);
  //   setProjects(updatedProjects);
  // }

  const projectComponents = projects.map((eachProject) => {
    return (
      <ProjectCard 
        key={eachProject.id}
        // handleDelete={handleDelete}
        {...eachProject}
      />
    )
  })

  return (
    <>
      <div><ProjectForm /></div>
      <div className="projects-container">
        {projectComponents}
      </div>
    </>
  );
}

export default Projects;
