import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PieChart_ from '../../components/pieChart';


export default function PopularPackages() {
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/statistics/popularPackages')
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
                setPackages(filteredData);
            })
            .catch(e => {
                console.log('인기 패키지 데이터를 가져오는데 오류가 생겼습니다', e);
            });
    }, []);

    return (
        <PieChart_
            title="인기 패키지 보기"
            data={packages}
        />
    );
}
