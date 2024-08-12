import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../styles/statisticHome.module.css';


const StatisticCard = ({ title, description, linkTo, linkLabel, IconComponent, iconStyle }) => {
    return (
        <div className={styles.colMd6}>
            <div className={styles.statisticCard}>
                <div className={styles.cardBody}>
                    <h5 className={styles.cardTitle}>
                        {title} <IconComponent style={{ fontSize: 50, ...iconStyle }} />
                    </h5>
                    <p className={styles.cardText}>{description}</p>
                    <Link to={linkTo} className={`btn btn-primary ${styles.statisticLink}`}>
                        {linkLabel}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default StatisticCard;
