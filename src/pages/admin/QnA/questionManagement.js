import React, { useEffect, useState } from 'react';
import styles from '../../../styles/questionManagement.module.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import QuestionView from './questionView.js';
import axios from 'axios';


const QuestionManagement  = () => {
  const [questions, setQuestion] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/questions');
      setQuestion(response.data);
    } catch (error) {
      console.error('문의사항을 불러오는 중 오류가 발생했습니다.', error);
    }
  };

  useEffect(() => {
    fetchQuestions(); // 컴포넌트가 마운트될 때 문의사항을 불러옵니다.
  }, []);

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
              {questions.length > 0 ? (
                questions.map((question) => (
                  <TableRow
                    key={question.id}
                    onClick={() => handleQuestionClick(question)}
                    className={`${styles.tableRow} ${styles.clickableRow}`}
                    hover
                  >
                    <TableCell>{question.id}</TableCell>
                    <TableCell>{question.title}</TableCell>
                    <TableCell className={styles.dateColumn}>{question.date}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    문의사항이 없습니다
                  </TableCell>
                </TableRow>
              )}
              </TableBody>
            </Table>
          </TableContainer>
      )}  
    </div>
  );
};

export default QuestionManagement ;