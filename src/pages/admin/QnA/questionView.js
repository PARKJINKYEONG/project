import React from "react";

const QuestionView = ({setIsEditing }) => {

    const handleSave = () => {
        setIsEditing(null);
    };
    return (
        <div>
          <h2>문의사항</h2>
          <form>
            <div>
              <label>문의 제목</label><br/>
              <input type="text" value={'문의 제목'}/>
            </div>
            <div>
              <label>내용</label>
              <textarea>문의 사항입니다</textarea>
            </div>
            <button type="button" onClick={() => setIsEditing(false)} style={{ fontSize: '0.875rem', borderRadius: '4px', color: '#fff',width: '70px'}}>삭제</button>
            <div>
              <label>답변</label>
              <textarea>문의 답변입니다</textarea>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={handleSave} style={{ fontSize: '0.875rem', borderRadius: '4px', color: '#fff',width: '70px'}}>답변</button>
            <button type="button" onClick={handleSave} style={{ fontSize: '0.875rem', borderRadius: '4px', color: '#fff',width: '70px'}}>뒤로</button>
            </div>
          </form>
        </div>
      );
};

export default QuestionView;