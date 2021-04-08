import React from 'react';
import { useBoolean } from "@fluentui/react-hooks";
import ModalWindow from "../../ModalWindow"
import styles from './styles/Submit.module.scss';

// const styles = {
//   button: {
//     'background-color': '#C4C4C4',
//     'border-radius': '30px',
//     'padding': '2rem 1rem'
//   }
// }



const Submit = () => {
  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);
  const modalText = 'Do you want to save changes?';
  console.log(styles);

  return (
    <React.Fragment>
      <ModalWindow open={isModalOpen} text={modalText} hideModal={hideModal} />
      <div className = {styles['button__wrapper']}>
        <button className={styles.button} onClick={showModal}>Accept</button>
      </div>
    </React.Fragment>
  )

}

export default Submit;