import axios from "axios";
import React, { useState } from "react";

const EditNotice = ({ notice,setIsEditing, fetchNotices }) => {
    const [title, setTitle] = useState(notice.title);
    const [content, setContent] = useState(notice.content);

    const handleSave = async () => {
      try {
        await axios.put(`http://localhost:8080/api/notices/${notice.id}`, { title, content });
        fetchNotices(); // 공지사항 목록을 다시 불러옵니다.
        setIsEditing(false); // 수정 화면에서 나옵니다.
      } catch (error) {
        console.error('공지사항을 수정하는 중 오류가 발생했습니다.', error);
      }
    };
  
    const handleDelete = async () => {
      try {
        await axios.delete(`http://localhost:8080/api/notices/${notice.id}`);
        fetchNotices(); // 공지사항 목록을 다시 불러옵니다.
        setIsEditing(false); // 수정 화면에서 나옵니다.
      } catch (error) {
        console.error('공지사항을 삭제하는 중 오류가 발생했습니다.', error);
      }
    };
    return (
        <div>
          <h2>공지 수정</h2>
          <form>
            <div>
              <label>제목</label>
              <input type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: '600px', marginBottom: '10px' }}/>
            </div>
            <div>
              <label>내용:</label>
              <textarea value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="5"
              style={{ width: '600px', marginBottom: '10px',height: '400px' }}></textarea>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={handleSave} style={{ fontSize: '0.875rem', borderRadius: '4px', color: '#fff',width: '70px'}} >수정</button>
            <button type="button" onClick={handleDelete} style={{ fontSize: '0.875rem', borderRadius: '4px', color: '#fff',width: '70spx'}}>삭제</button>
            <button type="button" onClick={() => setIsEditing(false)} style={{ fontSize: '0.875rem', borderRadius: '4px', color: '#fff',width: '70px'}}>뒤로</button>
            </div>
          </form>
        </div>
      );
};

export default EditNotice;