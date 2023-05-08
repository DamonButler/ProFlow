import React from 'react';

function Tasks({ selectedProject }) {
  return (
    <div>
      <h2>Tasks for {selectedProject.name}</h2>
      <p>{selectedProject.description}</p>
      <p>Due Date: {selectedProject.due_date}</p>
      <p>Status: {selectedProject.status}</p>
    </div>
  );
}

export default Tasks;


