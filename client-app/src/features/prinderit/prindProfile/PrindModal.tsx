import { Modal } from "semantic-ui-react";
import PrindiForm from '../form/PrindiForm';
interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

function PrindModal(props: ModalProps) {
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
          <PrindiForm />
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>

      </Modal.Actions>
    </Modal>
  );
}

export default PrindModal;
