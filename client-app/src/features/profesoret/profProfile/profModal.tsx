import React from 'react';
import { Modal } from "semantic-ui-react";
import ProfesoriForm from "../form/ProfesoriForm";
interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  //Profesori: any;
}

function ProfModal(props: ModalProps) {
  const { open, setOpen } = props;

 
  return (
    <Modal
      onClose={() => {
        setOpen(false);
      }}
      open={open}
      autoComplete="off"
    >

      <Modal.Header>Edito te dhenat</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
         <ProfesoriForm  />

        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
   
      </Modal.Actions>
    </Modal>
  );
}

export default ProfModal;
