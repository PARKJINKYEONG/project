import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QnAstyle from '../../styles/userQna.module.css';
import { FAQ_CONTENT } from './faqContent';


const FaQ = () => {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <>
            <div className="qna-container">
                <div className={`text-center ${QnAstyle.headerImage}`}>
                    <img src="/images/Mask_group.png" alt="Header" className="header-image" />
                </div>
                <div className="menu">
                <button>Q&A</button>
                <button>FAQ</button>
                <input type="text" placeholder="검색" />
                <button>검색</button>
                <button >신고접수</button>
                
                </div>
                <div className="qna-section">
                    <h2>FAQ</h2>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Add your table rows here */}
                        </tbody>
                    </table>
                </div>
                <div className="accordion-section">
                    <div>
                        {Object.keys(FAQ_CONTENT).map((key) => (
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
                                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                        {FAQ_CONTENT[key].summary}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        {FAQ_CONTENT[key].details}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default FaQ;
