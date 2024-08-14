import React, { useState } from 'react';
import styles from '../../../styles/questionManagement.module.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import QuestionView from './questionView.js';

const initialNotices = [
  { id: 1, date: '2024-08-01', title: '문의 사항' },
  { id: 2, date: '2024-08-02', title: '문의 사항' }
];

const QuestionManagement  = () => {
  const [questions, setQuestion] = useState(initialNotices);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
  };

  return (
    <div className={styles.container}>
      {selectedQuestion ? (
        <QuestionView question={selectedQuestion} setIsEditing={setSelectedQuestion} />
      ) : (        
          <TableContainer>
            <h2>문의사항</h2>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={styles.idColumn}>번호</TableCell>
                  <TableCell className={styles.titleColumn}>문의 제목</TableCell>
                  <TableCell className={styles.dateColumn}>문의 일</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {questions.map((question) => (
                  <TableRow key={question.id} className={styles.tableRow}>
                    <TableCell>{question.id}</TableCell>
                    <TableCell onClick={() => handleQuestionClick(question)} className={styles.clickableCell}>
                      {question.title}
                    </TableCell>
                    <TableCell className={styles.dateColumn}>{question.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      )}  
    </div>
  );
};

export default QuestionManagement ;