import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PieChart_ from '../../components/pieChart';


export default function Alert() {
    const [alertTimes, setAlertTimes] = useState([]);
    const [alertKeywords, setAlertKeywords] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/statistics/alertTimes')
            .then(resp => {
                console.log('Response data:', resp.data);
                const rawData = resp.data;
                const totalValue = rawData.reduce((sum, item) => sum + item.value, 0);
                const percentageData = rawData.map(item => ({
                    ...item,
                    value: ((item.value / totalValue) * 100).toFixed(2)
                }));
                const etc = percentageData.find(item => item.label === '기타');
                const filteredData = percentageData.filter(item => item.label !== '기타');
                filteredData.sort((a, b) => parseFloat(b.value) - parseFloat(a.value));
                if (etc) {
                    filteredData.push(etc);
                }
                setAlertTimes(filteredData);
            })
            .catch(e => {
                console.log('신고 처리시간 데이터를 가져오는데 오류가 생겼습니다', e);
            });

        axios.get('http://localhost:8080/statistics/alertKeywords')
            .then(resp => {
                console.log('Response data:', resp.data);
                const rawData = resp.data;
                const totalValue = rawData.reduce((sum, item) => sum + item.value, 0);
                const percentageData = rawData.map(item => ({
                    ...item,
                    value: ((item.value / totalValue) * 100).toFixed(2)
                }));
                const etc = percentageData.find(item => item.label === '기타');
                const filteredData = percentageData.filter(item => item.label !== '기타');
                filteredData.sort((a, b) => parseFloat(b.value) - parseFloat(a.value));
                if (etc) {
                    filteredData.push(etc);
                }
                setAlertKeywords(filteredData);
            })
            .catch(e => {
                console.log('신고 키워드 데이터를 가져오는데 오류가 생겼습니다', e);
            });
    }, []);

    return (
        <div>
            <PieChart_
                title="신고 처리 시간"
                data={alertTimes}
            />
            <PieChart_
                title="신고 키워드"
                data={alertKeywords}
            />
        </div>
    );
}
