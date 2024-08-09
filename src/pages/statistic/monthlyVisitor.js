import { BarChart } from "@mui/x-charts";
import styles from '../../styles/monthlyVisitor.module.css'
export default function MonthlyVisitor(){

    return <>
        
        <div className={styles.container}>
            <h1 className={styles.title}>월간 방문자 수</h1>
            
            <div className={styles.chartContainer}>
            <BarChart
            xAxis={[
                {
                id: 'barCategories',
                data: ['1월', '2월', '3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
                scaleType: 'band',
                },
            ]}
            series={[
                {
                data: [900, 1500, 900,1800,2100,2700,3000,3000,2700,2300,1900,1200],
                },
            ]}
            width={800}
            height={400}
            />
            </div>
        </div>
    
    </>
}