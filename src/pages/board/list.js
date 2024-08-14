import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './board.css';

const List = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;
    const [posts, setPosts] = useState([
        { id: 1, no: 30, title: '첫번째 글 제목입니다', poster: '김김동', date: '2024-10-11', view: 100 },
        { id: 2, no: 31, title: '두번째 글 제목입니다', poster: '김동동', date: '2012-11-10', view: 999 },
        { id: 3, no: 32, title: '글 제목입니다 세번째', poster: '동김동', date: '2022-09-10', view: 987 },
        { id: 4, no: 33, title: '제목입니다 글 네번째', poster: '동동김', date: '2034-05-05', view: 654 },
        { id: 5, no: 34, title: '제목입니다 다섯째 글', poster: '길동길', date: '2006-04-01', view: 321 },
        { id: 6, no: 35, title: '글 제목 여섯째입니다', poster: '홍길동', date: '2099-01-01', view: 123 },
        { id: 7, no: 36, title: '마지막 글 제목입니다', poster: '동길홍', date: '2023-07-07', view: 222 },
    ]);

    const filteredPosts = posts.filter(post => 
        post.title.includes(searchTerm) || 
        post.poster.includes(searchTerm) ||
        post.date.includes(searchTerm)
    );

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <div className="header">
                <h3>게시판</h3>
            </div>

            <div className="board">
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th className="col-1">NO</th>
                            <th>TITLE</th>
                            <th className="col-1">POSTER</th>
                            <th className="col-2">DATE</th>
                            <th className="col-1">VIEW</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentPosts.length > 0 ? (
                            currentPosts.map(post => (
                                <tr key={post.id}>
                                    <td>{post.no}</td>
                                    <td className="text-start">
                                        <Link to={`/board/${post.id}`}>{post.title}</Link>
                                    </td>
                                    <td>{post.poster}</td>
                                    <td>{post.date}</td>
                                    <td>{post.view}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">등록된 글이 없습니다</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="footer d-flex justify-content-between align-items-center mt-2">
                    <div className="search-bar">
                        <input type="text" value={searchTerm} onChange={handleSearchChange} 
                            placeholder="검색어를 입력하세요" 
                            className="search-input"/>
                    </div>
                    
                    <div className="pagination">
                        {Array.from({ length: Math.ceil(filteredPosts.length / postsPerPage) }, (_, i) => (
                            <button key={i + 1} onClick={() => paginate(i + 1)}
                                className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                {i + 1}
                            </button>
                        ))}
                    </div>

                    <Link to="/board/form" className="btn btn-primary">글 작성</Link>
                </div>
            </div>
        </>
    );
}
export default List;
