import React from 'react';
import styles from '../../styles/statisticHome.module.css';
import GroupsIcon from '@mui/icons-material/Groups';
import GroupIcon from '@mui/icons-material/Group';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import SearchIcon from '@mui/icons-material/Search';
import { AiFillAlert } from "react-icons/ai";
import StatisticCard from '../../components/statisticHome_';

const StatisticHome = () => {
    return (
        <div className={`container ${styles.container}`}>
            <div className={styles.statisticHomeContainer}>
                <div className={styles.row}>
                    <StatisticCard
                        title="일일 방문자 수"
                        description="일일 방문자 수를 확인하세요."
                        linkTo="/statistics/dailyVisitor"
                        linkLabel="일일 방문자 수 보기"
                        IconComponent={GroupIcon}
                        iconStyle={{ marginLeft: 140 }}
                    />
                    <StatisticCard
                        title="월간 방문자 수"
                        description="월별 방문자 수를 확인하세요."
                        linkTo="/statistics/monthlyVisitor"
                        linkLabel="월간 방문자 수 보기"
                        IconComponent={GroupsIcon}
                        iconStyle={{ marginLeft: 100 }}
                    />
                    <StatisticCard
                        title="인기있는 패키지들"
                        description="가장 인기있는 패키지들을 살펴보세요."
                        linkTo="/statistics/popularPackages"
                        linkLabel="인기 패키지 보기"
                        IconComponent={CardGiftcardIcon}
                        iconStyle={{ marginLeft: 100 }}
                    />
                    <StatisticCard
                        title="검색어"
                        description="방문자들이 가장 많이 사용한 검색어를 알아보세요."
                        linkTo="/statistics/searchKeywords"
                        linkLabel="검색어 보기"
                        IconComponent={SearchIcon}
                        iconStyle={{ marginLeft: 180 }}
                    />
                    <StatisticCard
                        title="신고"
                        description="신고 관련된 통계를 알아보세요."
                        linkTo="/statistics/alert"
                        linkLabel="신고 통계 보기"
                        IconComponent={AiFillAlert}
                        iconStyle={{ marginLeft: 250 }}
                    />
                </div>
            </div>
        </div>
    );
};

export default StatisticHome;
