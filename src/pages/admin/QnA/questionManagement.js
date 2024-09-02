import React, { useEffect, useState } from 'react';
import styles from '../../../styles/admin/question/questionManagement.module.css';
import QuestionView from './questionView.js';
import axios from 'axios';
import useRequest from '../../../hooks/useRequest.js';
import QuestionTable from './questionTable.js';


const QuestionManagement  = () => {
  const { get } = useRequest();
  const [questions, setQuestion] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/ask/all');
      //console.log(response.data);
      setQuestion(response.data);
    } catch (error) {
      console.error('문의사항을 불러오는 중 오류가 발생했습니다.', error);
    }
  };


  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
  };

  return <>
    <div className={styles.container}>
      {selectedQuestion ? (
        <QuestionView question={selectedQuestion} setIsEditing={setSelectedQuestion} />
      ) : (  
          <>      
          <QuestionTable props={'문의사항'} questions={questions} onQuestionClick={handleQuestionClick}/>
          </>
      )}  
    </div>
    </>;
};

export default QuestionManagement ;