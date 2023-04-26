import React from 'react';

function ProjectCard(props) {
  const { id, name, description, start_date, end_date, status } = props;

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
  

  return (
    <div className="project-card">
      <h2>{name}</h2>
      <p>{description}</p>
      <p>{start_date} - {end_date}</p>
      <p>{status}</p>
      {/* <button onClick={handleDelete}>Delete</button> */}
    </div>
  );
}

export default ProjectCard;
