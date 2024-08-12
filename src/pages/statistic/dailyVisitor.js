// DailyVisitor.jsx
import axios from 'axios';
import { useEffect, useState } from 'react';
import BarChart_ from '../../components/barChart';



export default function DailyVisitor() {
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
            });
    }, []);

    return (
        <BarChart_
            title="주간 방문자 수"
            visitorCount={`금일 방문자 수: ${todayVisitors}`}
            data={dailyVisitors}
            labels={['월', '화', '수', '목', '금', '토', '일']}
        />
    );
}
