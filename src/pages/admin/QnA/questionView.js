import axios from "axios";
import React, { useState } from "react";

const QuestionView = ({ question,setIsEditing }) => {
    const [answer, setAnswer] = useState(question.answer || '');  // 답변 상태 관리

    const handleSave = async () => {
      try {
        await axios.put(`http://localhost:8080/api/questions/${question.id}`, { answer });
        setIsEditing(null);  // 답변 저장 후 목록으로 돌아갑니다.
      } catch (error) {
        console.error('답변을 저장하는 중 오류가 발생했습니다.', error);
      }
    };
  
    const handleDelete = async () => {
      try {
        await axios.delete(`http://localhost:8080/api/questions/${question.id}`);
        setIsEditing(null);  // 삭제 후 목록으로 돌아갑니다.
      } catch (error) {
        console.error('문의사항을 삭제하는 중 오류가 발생했습니다.', error);
      }
    };
    return (
        <div>
          <h2>문의사항</h2>
          <form>
            <div>
              <label>문의 제목</label><br/>
              <input type="text" value={question.title} readOnly/>
            </div>
            <div>
              <label>내용</label>
              <textarea value={question.content} readOnly></textarea>
            </div>
            <button type="button" onClick={handleDelete} style={{ fontSize: '0.875rem', borderRadius: '4px', color: '#fff',width: '70px'}}>삭제</button>

            <div>
              <label>답변</label>
              <textarea value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="여기에 답변을 입력하세요"></textarea>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={handleSave} style={{ fontSize: '0.875rem', borderRadius: '4px', color: '#fff',width: '70px'}}>답변</button>
            <button type="button" onClick={() => setIsEditing(null)} style={{ fontSize: '0.875rem', borderRadius: '4px', color: '#fff',width: '70px'}}>뒤로</button>
            </div>
          </form>
        </div>
      );
};

export default QuestionView;