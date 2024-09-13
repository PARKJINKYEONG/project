// Statistics.jsx
import styles from '../../../styles/dailyVisitor.module.css';

export default function VisitGraph({title}) {
    return (
        <>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.stats}>
                <div className={styles.statItem}>
                    <p>방문자수</p>
                    <h1>1,784</h1>
                    <span className={styles.up}>▲</span>
                </div>
                <div className={styles.statItem}>
                    <p>방문횟수</p>
                    <h1>2,245</h1>
                    <span className={styles.up}>▲</span>
                </div>
                <div className={styles.statItem}>
                    <p>재방문자수</p>
                    <h1>1,981</h1>
                    <span className={styles.down}>▼</span>
                </div>
                <div className={styles.statItem}>
                    <p>일일 평균 방문자수</p>
                    <h1>1,673</h1>
                    <span className={styles.up}>▲</span>
                </div>
            </div>
        </>
    );
}
