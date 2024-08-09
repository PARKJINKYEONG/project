import React from 'react';
import styles from "../../styles/popularPackages.module.css"
import { PieChart } from '@mui/x-charts';



export default function PopularPackages() {
    // 원본 데이터
    const rawData = [
        { id: 0, value: 22, label: '오키나와', color: 'cyan' },
        { id: 1, value: 31, label: '하와이', color: 'blue' },
        { id: 2, value: 23, label: '로마', color: 'black' },
        { id: 3, value: 45, label: '파리', color: 'yellow' },
        { id: 4, value: 32, label: '뉴욕', color: 'lightblue' },
        { id: 5, value: 40, label: '런던', color: 'green' },
        { id: 6, value: 60, label: '기타', color: 'red' },
    ];

    // 전체 값의 합
    const totalValue = rawData.reduce((sum, item) => sum + item.value, 0);

    // 백분율 계산
    const percentageData = rawData.map(item => ({
        ...item, //구조 분해 후 나머지는 놔두고 value를 백분율로 대체 
        value: ((item.value / totalValue) * 100).toFixed(2) // 소수점 2자리까지 표현
    }));

    // "기타" 항목 분리
    const etc = percentageData.find(item => item.label === '기타');
    const filteredData = percentageData.filter(item => item.label !== '기타');

    // 백분율 기준으로 정렬
    filteredData.sort((a, b) => parseFloat(b.value) - parseFloat(a.value));

    // 정렬된 배열의 끝에 "기타" 항목 추가
    if (etc) {
        filteredData.push(etc);
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>인기 페키지 보기</h1>
            <div className={styles.chartContainer}>
                <PieChart
                    colors={['red', 'green', 'blue']} // Use palette
                    series={[
                        {
                            data: filteredData,
                        },
                    ]}
                    width={800}
                    height={400}
                />
            </div>
        </div>
    );
}
