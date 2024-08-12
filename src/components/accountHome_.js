import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from '../styles/accountHome.module.css';


const AccountOption = ({ icon: Icon, title, link, linkText }) => {
  return (
    <div className={styles.option}>
      <div className={styles.icon}><Icon style={{ fontSize: 50 }} /></div>
      <div className={styles.details}>
        <h2>{title}</h2>
        <p>
          <NavLink to={link} className={styles.editLink}>
            {linkText}
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default AccountOption;
