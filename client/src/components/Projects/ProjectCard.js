import React, {useState} from 'react';


function ProjectCard(props) {
  const { id, name, description, start_date, end_date, status } = props;

  return (
    <div className="project-card">
      <h2>{name}</h2>
      <p>{description}</p>
      <p>{start_date} - {end_date}</p>
      <p>{status}</p>
    </div>
  );
      }

export default ProjectCard;
