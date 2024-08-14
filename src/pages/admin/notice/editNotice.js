import React from "react";

const EditNotice = ({ setIsEditing }) => {

    const handleSave = () => {
        setIsEditing(false);
    };
    return (
        <div>
          <h2>공지 수정</h2>
          <form>
            <div>
              <label>제목</label>
              <input type="text" value={'공지사항'}/>
            </div>
            <div>
              <label>내용:</label>
              <textarea>어떤 사항에 대한 공지사항입니다.</textarea>
            </div>
            <button type="button" onClick={handleSave} style={{ marginRight: '10px' }}>수정</button>
            <button type="button" onClick={() => setIsEditing(false)} style={{ marginRight: '10px' }}>삭제</button>
            <button type="button" onClick={() => setIsEditing(false)}>뒤로가기</button>
          </form>
        </div>
      );
};

export default EditNotice;