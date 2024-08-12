import React from 'react';
import Modal from 'react-modal';

import styles from '../styles/bookmarkDetails.module.css';


Modal.setAppElement('#root');

export default function CustomModal({ isOpen, onRequestClose, contentLabel, children }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={contentLabel}
      className={styles.Modal}
      overlayClassName={styles.Overlay}
    >
      {children}
    </Modal>
  );
}
