import React, { useState } from 'react';
import { Modal, Button } from 'semantic-ui-react';
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
      {projects.map(project => (
        <ProjectCard
          key={project.id}
          id={project.id}
          name={project.name}
          description={project.description}
          start_date={project.start_date}
          end_date={project.end_date}
          status={project.status}
          user_id={project.user_id}
        />
      ))}

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

