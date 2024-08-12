import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PieChart_ from '../../components/pieChart';


export default function SearchKeywords() {
    const [keywords, setKeywords] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/statistics/searchKeywords')
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
                setKeywords(filteredData);
            })
            .catch(e => {
                console.log('검색어 통계 데이터를 가져오는데 오류가 생겼습니다', e);
            });
    }, []);

    return (
        <PieChart_
            title="검색어 통계"
            data={keywords}
        />
    );
}
