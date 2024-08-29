import React, { useState } from 'react';
import styles from '../../styles/testchangeInfo.module.css';
import SortButton from '../../components/sort_Table';



export default function Privacy() {

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };



  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const userDataPerPage = 20;
  const indexOfLastPost = currentPage * userDataPerPage;
  const indexOfFirstPost = indexOfLastPost - userDataPerPage;

 
  const handleLock = (id) => {
    // Handle lock action
    console.log('계정 잠금 clicked for id:', id);
  };

  const handleUnlock = (id) => {
    // Handle unlock action
    console.log('잠금 해제 clicked for id:', id);
  };

  // Example data
  const [userData, setUserData] = useState([
    { id: 91, key: 106, username: 'kakaoUser5d735c32-1274-407d', nickname: '여나', status: 2, phone: '2464071732', role: 'ROLE_USER', kakaoId: '2464071732' },
    { id: 92, key: 107, username: 'kakaoUser38a6d336-c87a-4624', nickname: '권영', status: 2, phone: '2464166940', role: 'ROLE_USER', kakaoId: '2464166940' },
    { id: 93, key: 108, username: 'rlatnakd', nickname: '김수망', status: 1, phone: '***', role: 'ROLE_USER', kakaoId: '***' },
    { id: 94, key: 109, username: 'kakaoUser8732c2aa-96b8-4c00', nickname: '정동훈', status: 2, phone: '2464276794', role: 'ROLE_USER', kakaoId: '2464276794' },
    { id: 95, key: 110, username: 'kakaoUser5d735c32-1274-407d', nickname: '여나', status: 2, phone: '2464071732', role: 'ROLE_USER', kakaoId: '2464071732' },
    { id: 96, key: 111, username: 'kakaoUser38a6d336-c87a-4624', nickname: '권영', status: 2, phone: '2464166940', role: 'ROLE_USER', kakaoId: '2464166940' },
    { id: 97, key: 112, username: 'rlatnakd', nickname: '김수망', status: 1, phone: '***', role: 'ROLE_USER', kakaoId: '***' },
    { id: 98, key: 113, username: 'kakaoUser8732c2aa-96b8-4c00', nickname: '정동훈', status: 2, phone: '2464276794', role: 'ROLE_USER', kakaoId: '2464276794' },
    { id: 99, key: 114, username: 'kakaoUser5d735c32-1274-407d', nickname: '여나', status: 2, phone: '2464071732', role: 'ROLE_USER', kakaoId: '2464071732' },
    { id: 100, key: 115, username: 'kakaoUser38a6d336-c87a-4624', nickname: '권영', status: 2, phone: '2464166940', role: 'ROLE_USER', kakaoId: '2464166940' },
    { id: 101, key: 116, username: 'rlatnakd', nickname: '김수망', status: 1, phone: '***', role: 'ROLE_USER', kakaoId: '***' },
    { id: 102, key: 117, username: 'kakaoUser8732c2aa-96b8-4c00', nickname: '정동훈', status: 2, phone: '2464276794', role: 'ROLE_USER', kakaoId: '2464276794' },
    
  ]);


  //정렬용
  const handleSort = (sortedData) => {
    setUserData(sortedData)
  

  };
  
  //검색용
  const filteredUserData = userData.filter(user => 
    user.id.toString().includes(searchTerm) || 
    user.key.toString().includes(searchTerm) ||
    user.kakaoId.toString().includes(searchTerm) ||
    user.phone.toString().includes(searchTerm) ||
    user.status.toString().includes(searchTerm) ||
    user.username.includes(searchTerm) ||
    user.nickname.includes(searchTerm) ||
    user.role.includes(searchTerm) 
  );
const currentUserData = filteredUserData.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className={styles.App}>
      <h4>유저 정보</h4>
      <div className={styles.search_bar} >
        <input type="text" value={searchTerm} onChange={handleSearchChange} 
            placeholder="검색어를 입력하세요" 
            className="search-input"/>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>순번<SortButton data={userData} onSort={handleSort} /></th>
              <th>Id key<SortButton data={userData} onSort={handleSort} /></th>
              <th>아이디<SortButton data={userData} onSort={handleSort} /></th>
              <th>닉네임<SortButton data={userData} onSort={handleSort} /></th>
              <th>상태<SortButton data={userData} onSort={handleSort} /></th>
              <th>휴대폰번호<SortButton data={userData} onSort={handleSort} /></th>
              <th>권한<SortButton data={userData} onSort={handleSort} /></th>
              <th>카카오ID<SortButton data={userData} onSort={handleSort} /></th>
              <th>계정 잠금</th>
              <th>잠금 해제</th>
            </tr>
          </thead>
          <tbody>
            {currentUserData.length > 0 ? (
            currentUserData.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.key}</td>
                <td>{user.username}</td>
                <td>{user.nickname}</td>
                <td>{user.status}</td>
                <td>{user.phone}</td>
                <td>{user.role}</td>
                <td>{user.kakaoId}</td>
                <td>
                  <button
                    className={styles.button}
                    onClick={() => handleLock(user.id)}
                  >
                    계정 잠금
                  </button>
                </td>
                <td>
                  <button
                    className={styles.button}
                    onClick={() => handleUnlock(user.id)}
                  >
                    잠금 해제
                  </button>
                </td>
              </tr>
            ))
            ) : (
            <tr>
              <td colSpan="5">등록된 회원이 없습니다</td>
            </tr>
            )
            }
          </tbody>
        </table>
      </div>
    </div>
    
  );
}
