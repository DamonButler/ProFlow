import React, { useEffect, useState } from 'react';

function Tasks(props) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`/tasks?projectId=${props.projectId}`)
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.log(error));
  }, [props.projectId]);

  const taskComponents = tasks.map(task => (
    <Task key={task.id} {...task} />
  ));

  return <div className="task-container">{taskComponents}</div>;
}

function Task(props) {
  const { id, name, description, due_date, status } = props;

  return (
    <div className="task">
      <h3>{name}</h3>
      <p>{description}</p>
      <p>Due Date: {due_date}</p>
      <p>Status: {status}</p>
    </div>
  );
}

export default Tasks;
