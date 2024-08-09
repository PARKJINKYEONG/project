import { BarChart } from '@mui/x-charts';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from '../../styles/dailyVisitor.module.css';

export default function DailyVisitor() {
    const [dailyVisitors, setDailyVisitors] = useState([]);

    useEffect(() => {
        axios.get('/statistics/dailyVisitor')
            .then(resp => {
                setDailyVisitors(resp.data);
            })
            .catch(e => {
                console.log('방문자 수를 가져오는데 오류가 생겼습니다', e);
            });
    }, []);

    // 예시 데이터
    

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>주간 방문자 수</h1>
            <p className={styles.visitorCount}>금일 방문자 수: {dailyVisitors}</p>
            <div className={styles.chartContainer}>
            <BarChart
            xAxis={[
                {
                id: 'barCategories',
                data: ['월', '화', '수','목','금','토','일'],
                scaleType: 'band',
                },
            ]}
            series={[
                {
                data: [30, 50, 30,60,70,90,100],
                },
            ]}
            width={800}
            height={400}
            />
            </div>
        </div>
    );
}
