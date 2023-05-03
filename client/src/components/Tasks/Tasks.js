import React, { useEffect, useState } from 'react';
import {Button} from 'semantic-ui-react';

function Tasks(props) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`/tasks?projectId=${props.projectId}`)
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.log(error));
  }, [props.projectId]);

  const handleCompleteTask = (task) => {
    fetch(`/completeTask?id=${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: 'Completed' })
    })
      .then(response => response.json())
      .then(data => {
        const updatedTasks = tasks.map(t => {
          if (t.id === task.id) {
            return data;
          }
          return t;
        });
        setTasks(updatedTasks);
      })
      .catch(error => console.log(error));
  };

  const taskComponents = tasks.map(task => (
    <Task key={task.id} {...task} handleCompleteTask={handleCompleteTask} />
  ));

  return <div className="task-container">{taskComponents}</div>;
}

function Task(props) {
  const { name, description, due_date, status, handleCompleteTask } = props;

  return (
    <div className="task">
      <h3>{name}</h3>
      <p>{description}</p>
      <p>Due Date: {due_date}</p>
      <p>Status: {status}</p>
      {status !== 'Completed' && <Button onClick={() => handleCompleteTask(props)}>Complete</Button>}
    </div>
  );
}

export default Tasks;

