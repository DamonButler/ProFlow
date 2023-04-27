import React, {useState} from 'react';
import EditProjectForm from './EditProjectForm';
import Tasks from '../Tasks/Tasks';


function ProjectCard(props) {
  const { id, name, description, start_date, end_date, status } = props;
  const [showEditForm, setShowEditForm] = useState(false);
  const [showTasks, setShowTasks] = useState(false);

const handleEdit = () => {
    setShowEditForm(true);
  };
  const handleCancelEdit = () => {
    setShowEditForm(false);
  };
  
    
  const toggleShowTasks = () => {
    setShowTasks(!showTasks);
  };

  return (
    <div className="project-card">
      <h2>{name}</h2>
      <p>{description}</p>
      <p>{start_date} - {end_date}</p>
      <p>{status}</p>
      <button onClick={toggleShowTasks}>Show Tasks</button>
      {showTasks && <Tasks projectId={props.id} />}
      {/* <button onClick={handleDelete}>Delete</button> */}
      <button onClick={handleEdit}>Edit</button>
      {showEditForm && (
        <EditProjectForm project={props} onClose={handleCancelEdit} />
      )}
    </div>
  );
      }

export default ProjectCard;
