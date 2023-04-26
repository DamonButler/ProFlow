import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';
import EditProjectForm from './EditProjectForm';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);


  useEffect(() => {
    fetch('/projects')
      .then(response => response.json())
      .then(data => setProjects(data))
      .catch(error => console.log(error));
  }, []);

  const handleDelete = (id) => {
    const updatedProjects = projects.filter(project => project.id !== id);
    setProjects(updatedProjects);
  }

  const handleEdit = (project) => {
    setEditingProject(project);
  }

  const handleUpdateProject = (updatedProject) => {
    const updatedProjects = projects.map(project => {
      if (project.id === updatedProject.id) {
        return updatedProject;
      } else {
        return project;
      }
    });
    setProjects(updatedProjects);
    setEditingProject(null);
  }

  const projectComponents = projects.map((eachProject) => {
    return (
      <ProjectCard 
        key={eachProject.id}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
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
      {editingProject && (
        <EditProjectForm 
          project={editingProject}
          onClose={() => setEditingProject(null)}
          handleUpdateProject={handleUpdateProject}
        />
      )}
    </>
  );
}

export default Projects;
