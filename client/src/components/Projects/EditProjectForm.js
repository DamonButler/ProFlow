import React, {useState} from 'react'

function EditProjectForm({ project, onClose, handleUpdateProject }) {
    const [formData, setFormData] = useState({
      name: project.name,
      description: project.description,
      start_date: project.start_date,
      end_date: project.end_date,
      status: project.status,
      user_id: project.user_id
    });
  
    const handleChange = (event) => {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value
      });
    };
  
    const handleSubmit = (event) => {
        event.preventDefault();
    
        fetch(`/projects/${project.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
          .then(response => response.json())
          .then(data => {
            handleUpdateProject(data); // Pass updated project data to callback
            onClose();
          })
          .catch(error => console.log(error));
      };
  
    return (
      <div className="project-form-container">
        <h2>Edit Project</h2>
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
          <button type="submit">Update</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    );
  }
  

export default EditProjectForm;
