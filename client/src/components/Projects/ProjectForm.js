import React, { useState } from 'react';
import { Modal, Button, Card } from 'semantic-ui-react';
import ProjectCard from './ProjectCard';

function ProjectForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    status: '',
    user_id: ''
  });

  const [projects, setProjects] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deletingProject, setDeletingProject] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showTasksModal, setShowTasksModal] = useState(false);

  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleEdit = (project) => {
    setEditingProject(project);
    setShowEditModal(true);
  };

  const handleDeleteModal = (project) => {
    setDeletingProject(project);
    setShowDeleteModal(true);
  };

  const handleTasksModal = (project) => {
    setSelectedProject(project);
    setShowTasksModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(r => r.json())
      .then(data => {
        setProjects([...projects, data]);
        setFormData({
          name: '',
          description: '',
          start_date: '',
          end_date: '',
          status: '',
          user_id: ''
        });
        setModalOpen(false);
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="project-form-container">
      <h2>Projects</h2>
      <Card.Group>
  {projects.map((project) => (
    <Card key={project.id}>
      <Card.Content>
        <Card.Header>{project.name}</Card.Header>
        <Card.Meta>{project.status}</Card.Meta>
        <Card.Description>{project.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button basic color='blue' onClick={() => handleEdit(project)}>
          Manage
        </Button>
        <Button basic color='green' onClick={() => handleTasksModal(project)}>Tasks</Button>
        <Button basic color='red' onClick={() => handleDeleteModal(project)}>
          Delete
        </Button>
      </Card.Content>
    </Card>
  ))}
</Card.Group>








      <Modal
        onClose={() => setModalOpen(false)}
        onOpen={() => setModalOpen(true)}
        open={modalOpen}
        trigger={<Button color='blue'>Create New Project</Button>}
      >
        <Modal.Header>Add a New Project</Modal.Header>
        <Modal.Content>
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </label>
            <br />
            <label>
              Description:
              <input type="text" name="description" value={formData.description} onChange={handleChange} />
            </label>
            <br />
            <label>
              Start Date:
              <input type="date" name="start_date" value={formData.start_date} onChange={handleChange} />
            </label>
            <br />
            <label>
              End Date:
              <input type="date" name="end_date" value={formData.end_date} onChange={handleChange} />
            </label>
            <br />
            <label>
              Status:
              <input type="text" name="status" value={formData.status} onChange={handleChange} />
            </label>
            <br />
            <label>
              User ID:
              <input type="number" name="user_id" value={formData.user_id} onChange={handleChange} />
            </label>
            <br />
            <Button type="submit" color='green'>Submit</Button>
          </form>
        </Modal.Content>
      </Modal>
    </div>
  );
}

export default ProjectForm;

