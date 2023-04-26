import React, {useState} from 'react';
import EditProjectForm from './EditProjectForm';
import Tasks from '../Tasks/Tasks';


function ProjectCard(props) {
  const { id, name, description, start_date, end_date, status } = props;
  const [showEditForm, setShowEditForm] = useState(false);
  const [showTasks, setShowTasks] = useState(false);


//   const handleDelete = () => {
//     fetch(`http://localhost:5555/projects/${id}`, {
//       method: 'DELETE'
//     })
//     .then(response => {
//       if (response.ok) {
//         props.handleDelete(id);
//       } else {
//         throw new Error('Network response was not ok.');
//       }
//     })
//     .catch(error => console.log(error));
//   }
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
      {showTasks && <Tasks projectId={id} />}
      {/* <button onClick={handleDelete}>Delete</button> */}
      <button onClick={handleEdit}>Edit</button>
      {showEditForm && (
        <EditProjectForm project={props} onClose={handleCancelEdit} />
      )}
    </div>
  );
      }

export default ProjectCard;
