// PieChart_.jsx
import React from 'react';
import { PieChart } from '@mui/x-charts';

import styles from '../styles/pieChart.module.css';


const PieChart_ = ({ title, data, colors, width = 600, height = 400 }) => {
    return (
        <div className={styles.container}>
            {title && <h1 className={styles.title}>{title}</h1>}
            <div className={styles.chartContainer}>
                {data && data.length > 0 ? (
                    <PieChart
                        colors={colors || data.map(item => item.color)}
                        series={[
                            {
                                data: data,
                            },
                        ]}
                        width={width}
                        height={height}
                    />
                ) : (
                    <p>데이터를 불러오는 중입니다...</p>
                )}
            </div>
        </div>
    );
};

export default PieChart_;
