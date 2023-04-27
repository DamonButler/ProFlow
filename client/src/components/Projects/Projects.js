import React, { useState, useEffect } from 'react';
import { Button, Card, Modal } from 'semantic-ui-react';
import ProjectForm from './ProjectForm';
import EditProjectForm from './EditProjectForm';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deletingProject, setDeletingProject] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showTasksModal, setShowTasksModal] = useState(false);

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

  const handleDeleteModal = (project) => {
    setDeletingProject(project);
    setShowDeleteModal(true);
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

  const handleTasksModal = (project) => {
    setSelectedProject(project);
    setShowTasksModal(true);
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
          <Button basic color='blue' onClick={() => handleEdit(eachProject)}>Manage</Button>
          <Button basic color='green' onClick={() => handleTasksModal(eachProject)}>Tasks</Button>
          <Button basic color='red' onClick={() => handleDeleteModal(eachProject)}>Delete</Button>
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
      <Modal
        open={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingProject(null);
        }}
      >
        <Modal.Header>Manage Project</Modal.Header>
        <Modal.Content>
          <EditProjectForm
            project={editingProject}
            handleUpdateProject={handleUpdateProject}
          />
       </Modal.Content>
  </Modal>
  <Modal
    open={showDeleteModal}
    onClose={() => {
      setShowDeleteModal(false);
      setDeletingProject(null);
    }}
  >
    <Modal.Header>Delete Project</Modal.Header>
    <Modal.Content>
      <p>Are you sure you want to delete {deletingProject?.name}?</p>
    </Modal.Content>
    <Modal.Actions>
      <Button
        basic
        color="red"
        onClick={() => {
          handleDelete(deletingProject.id);
          setShowDeleteModal(false);
          setDeletingProject(null);
        }}
      >
        Delete
      </Button>
      <Button basic color="blue" onClick={() => setShowDeleteModal(false)}>
        Cancel
      </Button>
    </Modal.Actions>
  </Modal>
  <Modal
    open={showTasksModal}
    onClose={() => {
      setShowTasksModal(false);
      setSelectedProject(null);
    }}
  >
    <Modal.Header>{selectedProject?.name} Tasks</Modal.Header>
    <Modal.Content>
      {selectedProject?.tasks?.length === 0 ? (
        <p>No tasks assigned to this project.</p>
      ) : (
        <ul>
          {selectedProject?.tasks?.map((task) => (
            <li key={task.id}>{task.name}</li>
          ))}
        </ul>
      )}
    </Modal.Content>
    <Modal.Actions>
      <Button basic color="blue" onClick={() => setShowTasksModal(false)}>
        Close
      </Button>
    </Modal.Actions>
  </Modal>
</>
  )
          }

export default Projects;
