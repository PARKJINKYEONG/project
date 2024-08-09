import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/statisticHome.module.css';

const StatisticHome = () => {
    return (
        <div className={`container ${styles.container}`}>
            <div className={styles.statisticHomeContainer}>
                <div className={styles.row}>
                    <div className={styles.colMd6}>
                        <div className={styles.statisticCard}>
                            <div className={styles.cardBody}>
                                <h5 className={styles.cardTitle}>일일 방문자 수</h5>
                                <p className={styles.cardText}>일일 방문자 수를 확인하세요.</p>
                                <Link to="/statistics/dailyVisitor" className={`btn btn-primary ${styles.statisticLink}`}>일일 방문자 수 보기</Link>
                            </div>
                        </div>
                    </div>
                    <div className={styles.colMd6}>
                        <div className={styles.statisticCard}>
                            <div className={styles.cardBody}>
                                <h5 className={styles.cardTitle}>월간 방문자 수</h5>
                                <p className={styles.cardText}>월별 방문자 수를 확인하세요</p>
                                <Link to="/statistics/monthlyVisitor" className={`btn btn-primary ${styles.statisticLink}`}>월간 방문자 수 보기</Link>
                            </div>
                        </div>
                    </div>
                    
                    <div className={styles.colMd6}>
                        <div className={styles.statisticCard}>
                            <div className={styles.cardBody}>
                                <h5 className={styles.cardTitle}>인기있는 패키지들</h5>
                                <p className={styles.cardText}>가장 인기있는 패키지들을 살펴보세요</p>
                                <Link to="/statistics/popularPackages" className={`btn btn-primary ${styles.statisticLink}`}>인기 패키지 보기</Link>
                            </div>
                        </div>
                    </div>
                    <div className={styles.colMd6}>
                        <div className={styles.statisticCard}>
                            <div className={styles.cardBody}>
                                <h5 className={styles.cardTitle}>검색어</h5>
                                <p className={styles.cardText}>방문자들이 가장 많이 사용한 검색어를 알아보세요.</p>
                                <Link to="/statistics/searchKeywords" className={`btn btn-primary ${styles.statisticLink}`}>검색어 보기</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatisticHome;
