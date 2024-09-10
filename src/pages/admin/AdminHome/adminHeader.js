import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../../styles/admin/adminHome.module.css';

const AdminHeader = ({ title }) => {
    return (
        <>
            <div className={styles.mainContentHeader}>
                <h3>{title?title:"관리자"}</h3>
                <Link to="/" className={styles.logoButton}>
                    <img src="/images/sample_logo.png" alt="logo" style={{ height: '40px', fill: 'white' }} />
                </Link>
            </div>
        </>
    );
};

export default AdminHeader;