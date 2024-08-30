import React, { useEffect, useState } from 'react';
import styles from '../../../styles/admin/question/questionManagement.module.css';
import QuestionView from './questionView.js';
import axios from 'axios';
import useRequest from '../../../hooks/useRequest.js';
import QuestionTable from './questionTable.js';


const FAQManagement  = () => {
  const { get } = useRequest();
  const [faqs,setFAQ] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);


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

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
  };

  return <>
    <div className={styles.container}>
      {selectedQuestion ? (
        <QuestionView question={selectedQuestion} setIsEditing={setSelectedQuestion} />
      ) : (  
          <>      
          <QuestionTable props={'자주 묻는 질문'} questions={faqs} onQuestionClick={handleQuestionClick}/>
          </>
      )}  
    </div>
    </>;
};

export default FAQManagement ;