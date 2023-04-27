import React, { useState, useEffect } from 'react';
import { Button, Card, Modal } from 'semantic-ui-react';
import ProjectForm from './ProjectForm';
import EditProjectForm from './EditProjectForm';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/projects');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/projects/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed to delete project.');
      }
      const updatedProjects = projects.filter((project) => project.id !== id);
      setProjects(updatedProjects);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setShowEditModal(true);
  };
  

  const handleUpdateProject = async (updatedProject) => {
    try {
      const response = await fetch(`/projects/${updatedProject.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProject),
      });

      if (!response.ok) {
        throw new Error('Failed to update project.');
      }

      const data = await response.json();
      setProjects((projects) =>
        projects.map((project) => (project.id === data.id ? data : project))
      );
      setEditingProject(null);
      setShowEditModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const projectComponents = projects.map((eachProject) => {
    return (
      <Card key={eachProject.id}>
        <Card.Content>
          <Card.Header>{eachProject.name}</Card.Header>
          <Card.Meta>{eachProject.status}</Card.Meta>
          <Card.Description>{eachProject.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button basic color='blue' onClick={() => handleEdit(eachProject)}>Edit</Button>
          <Button basic color='red' onClick={() => handleDelete(eachProject.id)}>Delete</Button>
        </Card.Content>
      </Card>
    );
  });

  return (
    <>
      <div>
        <ProjectForm />
      </div>
      <div className="projects-container">{projectComponents}</div>
      <Modal open={showEditModal} onClose={() => setShowEditModal(false)}>
        <Modal.Header>Edit Project</Modal.Header>
        <Modal.Content>
    <EditProjectForm
      project={editingProject}
      handleUpdateProject={handleUpdateProject}
    />
</Modal.Content>
      </Modal>
    </>
  );
}

export default Projects;
