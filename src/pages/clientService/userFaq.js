import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QnAstyle from '../../styles/userQna.module.css';
import { FAQ_CONTENT } from './faqContent';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

const FaQ = () => {
    const [expanded, setExpanded] = useState(false);
    const [searchTerm, setSearchTerm] = useState(''); // 검색어를 위한 상태 추가
    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleQNAClick = () => {
        navigate('/userQna'); // FAQ 페이지로 이동
    };
    const handleeCrmClick = () => {
        navigate('/eCrm'); // eCrm 페이지로 이동
    };
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

    return (
        <>
            <div className="qna-container">
                <Box 
                    sx={{ 
                        textAlign: 'center', 
                        mb: 2, 
                        p: 2, 
                        backgroundImage: 'url(/images/QnA.webp)', 
                        backgroundSize: 'cover', 
                        backgroundPosition: 'center 50%', 
                        height: 300
                    }}
                >
                </Box>
                <div className="menu" style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ flex: 1 }}>
                        <button onClick={handleQNAClick}>Q&A</button>
                        <button>FAQ</button>
                        <button onClick={handleeCrmClick}>신고접수</button>
                    </div>
                    <div>
                        <input 
                            type="text" 
                            placeholder="검색" 
                            style={{ width: '800px', height:'45px' }}
                            value={searchTerm} // 입력값 상태에 바인딩
                            onChange={(e) => setSearchTerm(e.target.value)} // 입력값 변경 시 상태 업데이트
                        />
                        <button>검색</button>
                    </div>
                </div>
                <div className="qna-section">
                    <h2>FAQ</h2>
                </div>
                <div className="accordion-section">
                    <div>
                        {filteredFaqContent.length > 0 ? (
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
