// MonthlyVisitor.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import BarChart_ from "../../components/barChart";


export default function MonthlyVisitor() {
    const [monthlyVisitors, setMonthlyVisitors] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/statistics/monthlyVisitor')
            .then(resp => {
                console.log('resp.data:', resp.data);
                setMonthlyVisitors(resp.data.monthlyCount || []);
            })
            .catch(e => {
                console.log('월간 방문자 수를 가져오는데 오류가 생겼습니다', e);
            });
    }, []);

    return (
        <BarChart_
            title="월간 방문자 수"
            visitorCount={null} // 월간 방문자 수 페이지에서는 특정 방문자 수를 표시하지 않음
            data={monthlyVisitors}
            labels={['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']}
        />
    );
}
