import React from 'react';
import { useBoolean } from "@fluentui/react-hooks";
import ModalWindow from "../../../ModalWindow";
import styles from './styles/Submit.module.scss';

const Submit = () => {
  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);
  const modalText = 'Do you want to save changes?';
  console.log(styles);

  return (
    <React.Fragment>
      <ModalWindow open={isModalOpen} text={modalText} hideModal={hideModal} />
      <div className = {styles['button__wrapper']}>
        <a className={styles.button} onClick={showModal}>Accept</a>
      </div>
    </React.Fragment>
  )

}

export default Submit;