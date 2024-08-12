// VisitorChart.jsx
import React from 'react';
import { BarChart } from '@mui/x-charts';

import styles from '../styles/barChart.module.css';


const BarChart_ = ({ title, visitorCount, data, labels, width = 800, height = 400 }) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{title}</h1>
            {visitorCount !== null && (
                <p className={styles.visitorCount}>방문자 수: {visitorCount}</p>
            )}
            <div className={styles.chartContainer}>
                {data && data.length > 0 ? (
                    <BarChart
                        xAxis={[
                            {
                                id: 'barCategories',
                                data: labels,
                                scaleType: 'band',
                            },
                        ]}
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

export default BarChart_;
