import React, { useState } from "react";
import { Link } from "react-router-dom";
import './board.css';

const View = () => {
    const [comments, setComments] = useState([]);
    const [commentInput, setCommentInput] = useState('');

    const handleAddComment = () => {
        if (commentInput.trim()) {
            setComments([...comments, commentInput]);
            setCommentInput('');  // Clear the input field after adding
        }
    };

    const handleDeleteComment = (index) => {
        const newComments = comments.filter((_, i) => i !== index);
        setComments(newComments);
    };

    return (
        <>
            <div className="view-header">
                <h3>게시판</h3>
            </div>
            
            <div className="view-board">
                <table className="table">
                    <tbody>
                        <tr>
                            <td colSpan="4"></td>
                        </tr>
                        <tr>
                            <td className="title">제목</td>
                            <td>제목입니다.</td>
                            <td className="date col-2">2020-12-12</td>  
                        </tr>
                        <tr>
                            <td>글쓴이</td>
                            <td colSpan="2">김김동</td>                        
                        </tr>
                        <tr>
                            <td className="text-center" colSpan="5">
                                착한 사람에게만 보이는 내용입니다<br/><br/>
                                하나 <br/>둘<br/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div className="text-right">
                <button className="btn btn-primary">수정</button>
                <button className="btn btn-primary mx-1">삭제</button>
                <Link to="/board" className="btn btn-primary">목록</Link>
            </div>
            
            <hr />

            <div className="comments-section">
                <div className="comment-input d-flex">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="댓글을 입력하세요" 
                        value={commentInput} 
                        onChange={(e) => setCommentInput(e.target.value)} 
                    />
                    <button 
                        className="btn btn-primary ml-2" 
                        onClick={handleAddComment}
                    >
                        등록
                    </button>
                </div>
                <div className="comment-list">
                    {comments.map((comment, index) => (
                        <div className="comment d-flex justify-content-between align-items-center" key={index}>
                            <p><strong>익명:</strong> {comment}</p>
                            <button 
                                className="btn btn-danger btn-sm" 
                                onClick={() => handleDeleteComment(index)}
                            >
                                삭제
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
export default View;
