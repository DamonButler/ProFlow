import React, { useState } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';

function EditProjectForm({ project, handleUpdateProject }) {
  const [formData, setFormData] = useState({
    name: project.name,
    description: project.description,
    start_date: project.start_date,
    end_date: project.end_date,
    status: project.status,
    user_id: project.user_id,
  });
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/projects/${project.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update project.');
      }

      const updatedProject = await response.json();
      handleUpdateProject(updatedProject); // Pass updated project data to callback
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Edit</Button>}
    >
      <Modal.Header>Edit Project</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <input type="text" name="description" value={formData.description} onChange={handleChange} />
          </Form.Field>
          <Form.Field>
            <label>Start Date</label>
            <input type="date" name="start_date" value={formData.start_date} onChange={handleChange} />
          </Form.Field>
          <Form.Field>
            <label>End Date</label>
            <input type="date" name="end_date" value={formData.end_date} onChange={handleChange} />
          </Form.Field>
          <Form.Field>
            <label>Status</label>
            <input type="text" name="status" value={formData.status} onChange={handleChange} />
          </Form.Field>
          <Form.Field>
            <label>User ID</label>
            <input type="number" name="user_id" value={formData.user_id} onChange={handleChange} />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>Cancel</Button>
        <Button
          content="Update"
          labelPosition='right'
          icon='checkmark'
          onClick={handleSubmit}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}

export default EditProjectForm;
