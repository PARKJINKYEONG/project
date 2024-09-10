// Statistics.jsx
import axios from 'axios';
import styles from '../../../styles/dailyVisitor.module.css';
import VisitGraph from './visitGraph';
import { useEffect, useState } from 'react';
import Graph from './graph';

export default function VisitStatistics() {

    const [dailyVisitors, setDailyVisitors] = useState([]);
    const [todayVisitors, setTodayVisitors] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/statistics/dailyVisitor')
            .then(resp => {
                console.log('Response data:', resp.data);
                setDailyVisitors(resp.data.dailyCount || []);
                setTodayVisitors(resp.data.todayCount || 0);
            })
            .catch(e => {
                console.log('방문자 수를 가져오는데 오류가 생겼습니다', e);
            })
    }, []);

    return (
        <>

            <div className={styles.dashboard}>
                <VisitGraph title={"일일 방문 현황"}/>
                <p className={styles.date}>2024.08.28 ~ 2024.08.28</p>
                <h3 className={styles.graphTitle}>방문 현황 그래프</h3>
                <Graph />
            </div>
        </>
    );
}

