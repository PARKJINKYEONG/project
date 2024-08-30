import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from '../../styles/userQna.module.css'; // 스타일 파일 임포트
import { FAQ_CONTENT } from './faqContent';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

const FaQ = () => {
    const [expanded, setExpanded] = useState(false);
    const [searchTerm, setSearchTerm] = useState(''); // 검색어를 위한 상태 추가
    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    // 검색어가 FAQ 내용에 포함된 항목만 필터링
    const filteredFaqContent = Object.keys(FAQ_CONTENT).filter((key) => {
        const summary = FAQ_CONTENT[key].summary.toLowerCase();
        const details = FAQ_CONTENT[key].details.toLowerCase();
        const term = searchTerm.toLowerCase();
        return summary.includes(term) || details.includes(term);
    });

    const handleNoticeClick = () => {
        navigate('/announcement'); // 공지사항 페이지로 이동
    };
    const handleQNAClick = () => {
        navigate('/userQna'); // QnA 페이지로 이동
    };
    const handleFaqClick = () => {
        navigate('/userFaq'); // FAQ 페이지로 이동
    };

    return (
        <>
            <div className={styles.qnaContainer}>
            <Box 
                  sx={{ 
                      textAlign: 'center', 
                      mb: 2, 
                      p: 2, 
                      backgroundImage: 'url(/images/QnA.webp)', 
                      backgroundSize: 'cover', 
                      backgroundPosition: 'center 50%', 
                      height: 200
                  }}
              >
            </Box>
                <div className={styles.paddingContainer}>
                    <div className={styles.headerStyle}>FAQ</div>
                    <div className={styles.headerMenuStyle}>
                        <span className={styles.tabStyle} onClick={handleNoticeClick}>NOTICE</span>
                        <span className={styles.tabStyle} onClick={handleQNAClick}>| Q&A</span>
                        <span className={styles.tabStyle}>| FAQ</span>
                    </div>
                </div>

                <div className={styles.accordionSection}>
                    <div>
                        {(filteredFaqContent && filteredFaqContent.length > 0) ? (
                            filteredFaqContent.map((key) => (
                                <Accordion
                                    key={key}
                                    expanded={expanded === key}
                                    onChange={handleChange(key)}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls={`${key}bh-content`}
                                        id={`${key}bh-header`}
                                    >
                                        <Typography sx={{ width: '50%', flexShrink: 0, color: 'blue' }}>
                                            {FAQ_CONTENT[key].summary}
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            {FAQ_CONTENT[key].details}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            ))
                        ) : (
                            <Typography>검색 결과가 없습니다.</Typography>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default FaQ;
