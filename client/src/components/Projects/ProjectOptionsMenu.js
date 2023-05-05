import { useState } from 'react';
import { Button, Dropdown, Modal } from 'semantic-ui-react';

function ProjectOptionsMenu({ onEdit, onDelete }) {
  const [showModal, setShowModal] = useState(false);

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    onDelete();
    setShowModal(false);
  };

  return (
    <>
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
      >
        <Modal.Header>Delete Project</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete this project?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            basic
            color="red"
            onClick={handleConfirmDelete}
          >
            Delete
          </Button>
          <Button
            basic
            color="blue"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
      <Dropdown icon='ellipsis vertical'>
        <Dropdown.Menu>
          <Dropdown.Item icon='edit' text='Edit' onClick={onEdit} />
          <Dropdown.Item icon='delete' text='Delete' onClick={handleDeleteClick} />
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default ProjectOptionsMenu;
