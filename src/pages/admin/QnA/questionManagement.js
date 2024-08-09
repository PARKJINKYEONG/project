import React, { useState } from 'react';
import styles from '../../../styles/questionManagement.module.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Button } from 'bootstrap';
import { QuestionAnswer } from '@mui/icons-material';
import QuestionView from './questionView.js';

const initialNotices = [
  { id: 1, date: '2024-08-01', title: '문의 사항' },
  { id: 2, date: '2024-08-02', title: '문의 사항 ' },
  { id: 3, date: '2024-08-02', title: '문의 사항 ' },
  { id: 4, date: '2024-08-02', title: '문의 사항 ' },
  { id: 5, date: '2024-08-02', title: '문의 사항 ' },
  { id: 6, date: '2024-08-02', title: '문의 사항 ' },
  { id: 7, date: '2024-08-02', title: '문의 사항 ' },
  { id: 8, date: '2024-08-02', title: '문의 사항 '},
  { id: 9, date: '2024-08-02', title: '문의 사항 ' },
  { id: 10, date: '2024-08-02', title: '문의 사항 ' },
  { id: 11, date: '2024-08-02', title: '문의 사항 ' },
  { id: 12, date: '2024-08-02', title: '문의 사항 ' },
  { id: 13, date: '2024-08-02', title: '문의 사항 ' },
  { id: 14, date: '2024-08-02', title: '문의 사항 ' },
  { id: 15, date: '2024-08-02', title: '문의 사항 ' },
  { id: 16, date: '2024-08-02', title: '문의 사항 ' },
  { id: 17, date: '2024-08-02', title: '문의 사항 '},
  { id: 18, date: '2024-08-02', title: '문의 사항 '},
  { id: 19, date: '2024-08-02', title: '문의 사항 '},
  { id: 20, date: '2024-08-02', title: '문의 사항 ' },
  { id: 21, date: '2024-08-02', title: '문의 사항 ' },
  { id: 22, date: '2024-08-02', title: '문의 사항 ' }
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