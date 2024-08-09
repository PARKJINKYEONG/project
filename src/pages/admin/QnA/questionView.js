import React, { useState } from "react";

const QuestionView = ({setIsEditing }) => {

    const handleSave = () => {
        setIsEditing(null);
    };
    return (
        <div>
          <h2>문의사항</h2>
          {/* notice 객체의 데이터를 사용하여 폼을 초기화합니다 */}
          <form>
            <div>
              <label>문의 제목</label>
              <input type="text"/>
            </div>
            <div>
              <label>내용</label>
              <textarea></textarea>
            </div>
            <button type="button" onClick={() => setIsEditing(false)}>삭제</button>
            <div>
              <label>답변</label>
              <textarea></textarea>
            </div>
            <button type="button" onClick={handleSave}>답변</button>
            <button type="button" onClick={handleSave}>뒤로가기</button>
          </form>
        </div>
      );
};

export default QuestionView;