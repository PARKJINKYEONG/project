// Graph.jsx
import { LineChart } from '@mui/x-charts/LineChart';
import styles from '../../../styles/dailyVisitor.module.css';

export default function Graph() {
    return (
        <LineChart
            xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }]}
            series={[
                {
                    data: [2, 5.5, 2, 8.5, 1.5, 5],
                },
            ]}
            width={900}
            height={400}
        />
    );
}
