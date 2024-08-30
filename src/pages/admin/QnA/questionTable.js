import React from 'react';
import styles from '../../../styles/admin/question/questionTable.module.css';

const QuestionTable = ({ props, questions, onQuestionClick }) => {
  return (
    <div className={styles.inquiryContainer}>
      <h2 className={styles.title}>{props}</h2>
      <div className={styles.searchContainer}>
      <div className={styles.searchInputWrapper}>
    <input 
      type="text" 
      placeholder="검색어를 입력하세요" 
      className={styles.searchInput} 
    />
    <button className={styles.searchButton}>
      <img src="/images/icons/search.svg" alt="검색" />
    </button>
  </div>
      </div>
      <div className={styles.filterContainer}>
        <select className={styles.filterButton}>
            <option value="all" selected>전체</option>
            <option value="사용법">사용법</option>
            <option value="신고">신고</option>
        </select>
      </div>
      <table className={styles.inquiryTable}>
        <thead>
          <tr>
            <th className='col-1'>번호</th>
            <th className='col-1'>유형</th>
            <th className='col-3'>문의 제목</th>
            <th className='col-2'>문의 일자</th>
            <th className='col-2'>작성자</th>
            <th className='col-1'>답변 여부</th>
          </tr>
        </thead>
        <tbody>
        {questions.length > 0 ? (
            questions.map((question, index) => (
              <tr key={question.id} onClick={() => onQuestionClick(question)} className={styles.clickableCell}>
                <td className="col-1 text-center">{index + 1}</td>
                <td className="col-1 text-center">{question.questionCategory.questionCategoryName}</td>
                <td className="col-3 text-center">{question.questionTitle}</td>
                <td className="col-2 text-center">{question.questionDate.slice(0,10)}</td>
                <td className="col-2 text-center">{question.user.name}</td>
                <td className="col-1 text-center">{question.isHasAnswer ? 'Yes' : 'No'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className={`text-center ${styles.noData}`}>
                새로 등록된 문의 사항이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionTable;