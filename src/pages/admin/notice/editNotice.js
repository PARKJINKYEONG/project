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
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={handleSave} style={{ fontSize: '0.875rem', borderRadius: '4px', color: '#fff',width: '70px'}} >수정</button>
            <button type="button" onClick={() => setIsEditing(false)} style={{ fontSize: '0.875rem', borderRadius: '4px', color: '#fff',width: '70spx'}}>삭제</button>
            <button type="button" onClick={() => setIsEditing(false)} style={{ fontSize: '0.875rem', borderRadius: '4px', color: '#fff',width: '70px'}}>뒤로</button>
            </div>
          </form>
        </div>
      );
};

export default EditNotice;