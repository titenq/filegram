import styles from '@/components/Modal/Modal.module.css';
import { IModal } from '@/interfaces/modalInterface';

const Modal = (props: IModal) => {
  if (!props.isOpen) {
    return null;
  };

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_content}>
        <p className={styles.modal_message}>{props.message}</p>
        <button className={styles.modal_button} onClick={props.onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
};

export default Modal;
