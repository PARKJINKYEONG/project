import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from '../../styles/userQna.module.css'; // 스타일 파일 임포트
import { FAQ_CONTENT } from './faqContent';
import { Link, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import axios from 'axios';

const FaQ = () => {
    const [expanded, setExpanded] = useState(false);
    const [searchTerm, setSearchTerm] = useState(''); // 검색어를 위한 상태 추가
    const [faqs,setFAQ] = useState([]);

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

    const fetchFAQ = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/ask/category/FAQ');
          console.log('faq',response.data);
          setFAQ(response.data);
        } catch (error) {
          console.error('문의사항을 불러오는 중 오류가 발생했습니다.', error);
        }
      };

      useEffect(() => {
        fetchFAQ();
      }, []);

    return (
        <>
            <Box 
                sx={{ 
                    textAlign: 'center', 
                    mb: 2, 
                    p: 2, 
                    backgroundImage: 'url(/images/hot-air-balloon.jpg)', 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center 50%', 
                    height: 250,
                    marginTop:10
                }}
            />
            <div className={styles.qnaContainer}>
                <div className={styles.paddingContainer}>
                    <div className={styles.headerStyle}>FAQ</div>
                    <div className={styles.headerMenuStyle}>
                    <Link className={styles.tabStyle} to={'/announcement'}>NOTICE</Link>
                    <Link className={styles.tabStyle} to={"/userQna"}>| Q&A </Link>
                    <Link className={styles.tabStyle} to={"/userFaq"}>| FAQ</Link>
                    </div>
                </div>
                <table className={styles.tableStyle}>
                    <thead className='text-center'>
                        <tr className={styles.thStyle}>
                            <th className='col-12'>자주 묻는 질문</th>
                        </tr>
                    </thead>
                    <tbody> 
                        
                        {faqs.length > 0 ? (
                            faqs.map((faq, index) => (
                                <tr key={faq.id}>
                                    <td className="col-9 text-center">
                                    <Accordion key={index} expanded={expanded === index} onChange={handleChange(index)} >
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`${index}bh-content`} id={`${index}bh-header`} >
                                            <Typography sx={{ width: '50%', flexShrink: 0, color: 'blue' }}>
                                            {faq.questionTitle}
                                            </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                            <Typography>
                                            {faq.questionContent}
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                        <td className='col-12'>
                        <Accordion expanded={expanded === 1} onChange={handleChange(1)} >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`1bh-content`} id={`1bh-header`} >
                                <Typography sx={{ width: '50%', flexShrink: 0 }}>
                                자주 묻는 질문을 준비중입니다.
                                </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                                <Typography>
                                    안녕하세요, 저희는 Travel Joy 팀입니다. 저희 사이트 잘부탁드려요.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        </td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default FaQ;
