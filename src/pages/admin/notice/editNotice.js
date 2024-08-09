import React from "react";

const EditNotice = ({ setIsEditing  }) => {

    const handleSave = () => {
        setIsEditing(false);
    };
    return (
        <div>
          <h2>공지 수정</h2>
          {/* notice 객체의 데이터를 사용하여 폼을 초기화합니다 */}
          <form>
            <div>
              <label>제목:</label>
              <input type="text" />
            </div>
            <div>
              <label>내용:</label>
              <textarea></textarea>
            </div>
            <button type="button" onClick={handleSave}>수정</button>
            <button type="button" onClick={() => setIsEditing(false)}>삭제</button>
            <button type="button" onClick={() => setIsEditing(false)}>뒤로가기</button>
          </form>
        </div>
      );
};

export default EditNotice;