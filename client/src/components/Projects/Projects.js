import React, { useState, useEffect } from 'react';
import { Button, Card, Modal , Grid} from 'semantic-ui-react';
import ProjectForm from './ProjectForm';
import EditProjectForm from './EditProjectForm';
import ProjectOptionsMenu from './ProjectOptionsMenu'
import { UserContext } from '../../User';
import { useContext } from 'react';


function Projects({handleProjectDelete}) {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deletingProject, setDeletingProject] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showTasksModal, setShowTasksModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const {user, refreshUser} = useContext(UserContext)



  useEffect(() => {
    async function fetchData() {
      try {
        const sessionResponse = await fetch('/check_session');
        const sessionData = await sessionResponse.json();
        const userId = sessionData.id;
        const response = await fetch(`/projects?user_id=${userId}`);
        const data = await response.json();
        
        const projectsWithUserId = data.map(project => ({
          ...project,
          user_id: userId,
        }));
        setProjects(projectsWithUserId);
      } catch (error) {
        console.log(error);
      }
    }
  
    fetchData();
  }, []);

  const handleDelete = (projectId) => {
    console.log('Deleting project with ID:', projectId);
    fetch(`/projects/${projectId}`, { method: "DELETE" })
      .then(() => {
        refreshUser();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleProjectAddition = (project) => {
    fetch('/projects')
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
        refreshUser();
      })
      .catch((error) => console.log(error));
  };
  

  const handleEdit = (project) => {
    setEditingProject(project);
    setShowEditModal(true);
  };

  const handleDeleteModal = (project) => {
    setDeletingProject(project);
    setShowDeleteModal(true);
  };

  const handleUpdateProject = async (updatedProject) => {
    try {
      const response = await fetch(`/projects/${updatedProject.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProject),
      });

      if (!response.ok) {
        throw new Error('Failed to update project.');
      }

      const data = await response.json();
      setProjects((projects) =>
        projects.map((project) => (project.id === data.id ? data : project))
      );
      setEditingProject(null);
      setShowEditModal(false);
    } catch (error) {
    }
  };

  const handleTasksModal = (project) => {
    setSelectedProject(project);
    setShowTasksModal(true);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'In progress':
        return { color: 'orange' };
      case 'Completed':
        return { color: 'green' };
      case 'Canceled':
        return { color: 'red' };
      default:
        return { color: 'black' };
    }
  };
  
  const projectComponents = (user?.projects || []).map((eachProject) => {
    return (
      <Card key={eachProject.id}>
        <Card.Content>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div><Card.Header>{eachProject.name}</Card.Header>
            </div>
            <div> <Card.Meta style={getStatusStyle(eachProject.status)}>{eachProject.status}</Card.Meta></div>
          </div>
          <br/>
          <Card.Description>{eachProject?.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button basic color='blue' onClick={() => handleEdit(eachProject)}>Manage</Button>
          <Button basic color='green' onClick={() => handleTasksModal(eachProject)}>Tasks</Button>
          <Button basic color='red' onClick={() => handleDeleteModal(eachProject)}>Delete</Button>
        </Card.Content>
      </Card>
    );
  });
  
  

  return (
    <>
    <div>
      <h2>All Projects</h2>
      </div>
        <div className="create-project-container">
          <ProjectForm handleProjectAddition={handleProjectAddition} />
        </div>
        <br/><br/>
        <div className="projects-container">
        <Grid className="projects-grid" 
        columns={4} doubling>
          {projectComponents}
        </Grid>
      </div>
      <Modal
        open={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingProject(null);
        }}
      >
        <Modal.Header>Manage Project</Modal.Header>
        <Modal.Content>
          <EditProjectForm
            project={editingProject}
            handleUpdateProject={handleUpdateProject}
          />
        </Modal.Content>
      </Modal>
      <Modal
        open={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeletingProject(null);
        }}
      >
        <Modal.Header>Delete Project</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete {deletingProject?.name}?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            basic
            color="red"
            onClick={() => {
              handleDelete(deletingProject.id);
              setShowDeleteModal(false);
              setDeletingProject(null);
              handleProjectDelete = { handleProjectDelete };
            }}
          >
            Delete
          </Button>
          <Button
            basic
            color="blue"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
      <Modal
        open={showTasksModal}
        onClose={() => {
          setShowTasksModal(false);
          setSelectedProject(null);
        }}
      >
        <Modal.Header>{selectedProject?.name} Tasks</Modal.Header>
        <Modal.Content>
          {selectedProject?.tasks?.length === 0 ? (
            <p>No tasks assigned to this project.</p>
          ) : (
            <Card.Group>
              {selectedProject?.tasks?.map((task) => (
                <Card
                  key={task.id}
                  onClick={() => handleTaskClick(task)}
                >
                  <Card.Content>
                    <Card.Header>{task.name}</Card.Header>
                    <Card.Meta>{task.status}</Card.Meta>
                  </Card.Content>
                </Card>
              ))}
            </Card.Group>
          )}
        </Modal.Content>
        <Modal.Actions>
          <Button
            basic
            color="blue"
            onClick={() => setShowTasksModal(false)}
          >
            Close
          </Button>
        </Modal.Actions>
      </Modal>
      <Modal
        open={!!selectedTask}
        onClose={() => setSelectedTask(null)}
      >
        <Modal.Header>{selectedTask?.name}</Modal.Header>
        <Modal.Content>
          <p>Description: {selectedTask?.description}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            basic
            color="blue"
            onClick={() => setSelectedTask(null)}
          >
            Back
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
          }

export default Projects;