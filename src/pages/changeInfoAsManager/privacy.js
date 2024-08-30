import React, { useMemo, useState } from 'react';
import styles from '../../styles/admin/changeInfo.module.css';
import SortButton from '../../components/sort_Table';



export default function Privacy() {

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [buttonStates, setButtonStates] = useState({});
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const userDataPerPage = 20;
  const indexOfLastPost = currentPage * userDataPerPage;
  const indexOfFirstPost = indexOfLastPost - userDataPerPage;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };


 // 모달을 닫는 핸들러
 const handleCloseModal = () => {
   setShowModal(false);
 };

 // 버튼 클릭 핸들러
 const handleButtonClick = (id, action) => {
   setButtonStates(prevStates => {
     const currentState = prevStates[id] || { lock: 'green', unlock: 'green', lockText: '잠금', unlockText: '잠금 해제' };

     // 상태를 토글
     const newLockState = currentState.lock === 'green' ? 'red' : 'green';
     const newUnlockState = currentState.unlock === 'green' ? 'red' : 'green';
     const newLockText = currentState.lock === 'green' ? '잠금 해제' : '계정 잠금';
     const newUnlockText = currentState.unlock === 'green' ? '계정 잠금' : '잠금 해제';

     let message = '';
     if (action === 'lock') {
       message = newLockState === 'red' ? '계정이 잠겼습니다' : '계정이 해제되었습니다';
     } else if (action === 'unlock') {
       message = newUnlockState === 'red' ? '계정이 해제되었습니다' : '계정이 잠겼습니다';
     }

     // 모달에 메시지를 설정하고 표시
     setModalMessage(message);
     setShowModal(true);

     return {
       ...prevStates,
       [id]: {
         lock: action === 'lock' ? newLockState : currentState.lock,
         unlock: action === 'unlock' ? newUnlockState : currentState.unlock,
         lockText: action === 'lock' ? newLockText : currentState.lockText,
         unlockText: action === 'unlock' ? newUnlockText : currentState.unlockText,
       },
     };
   });
 };

 // 버튼 스타일 결정 함수
 const getButtonStyle = (id, type) => {
   const state = (buttonStates[id] || {})[type] || 'green';
   return state === 'red' ? styles.redButton : styles.greenButton;
 };

  // Example data
  const [userData, setUserData] = useState([
    { id: 91, key: 106, username: 'kakaoUser5d735c32-1274-407d', nickname: '여나', status: 2, phone: '2464071732', role: 'ROLE_USER', kakaoId: '2464077822' },
    { id: 92, key: 107, username: 'kakaoUser38a6d336-c87a-4624', nickname: '오문희', status: 1, phone: '2464166940', role: 'ROLE_USER', kakaoId: '2464163269' },
    { id: 93, key: 108, username: 'rlarlfehd', nickname: '김길동', status: 1, phone: '***', role: 'ROLE_USER', kakaoId: '***' },
    { id: 94, key: 109, username: 'kakaoUser8732c2aa-96b8-4c00', nickname: '김기준', status: 2, phone: '2464276794', role: 'ROLE_USER', kakaoId: '2464276794' },
    { id: 95, key: 110, username: 'kakaoUser8732c2aa-407d-407d', nickname: '박상준', status: 1, phone: '2464071732', role: 'ROLE_USER', kakaoId: '2464042457' },
    { id: 96, key: 111, username: 'kakaoUser38a6d336-c87a-4624', nickname: '최영재', status: 2, phone: '2464166940', role: 'ROLE_USER', kakaoId: '2464166940' },
    { id: 97, key: 112, username: 'ghdrlfehd', nickname: '홍길동', status: 1, phone: '***', role: 'ROLE_USER', kakaoId: '***' },
    { id: 98, key: 113, username: 'kakaoUser8732c2aa-96b8-4c00', nickname: '여진수', status: 1, phone: '2464276794', role: 'ROLE_USER', kakaoId: '2464277588' },
    { id: 99, key: 114, username: 'kakaoUser5d735c32-96b8-407d', nickname: '권민우', status: 2, phone: '2464071732', role: 'ROLE_USER', kakaoId: '2464074455' },
    { id: 100, key: 115, username: 'kakaoUser8732c2aa-c87a-4624', nickname: '권영', status: 1, phone: '2464166940', role: 'ROLE_USER', kakaoId: '2464166200' },
    { id: 101, key: 116, username: 'kkk', nickname: '암살자', status: 1, phone: '***', role: 'ROLE_USER', kakaoId: '***' },
    { id: 102, key: 117, username: 'kakaoUser8732c2aa-96b8-4c00', nickname: '정동훈', status: 2, phone: '2464276794', role: 'ROLE_USER', kakaoId: '2464276944' },
    { id: 103, key: 118, username: 'kakaoUser38a6d336-c87a-96b8', nickname: '손병창', status: 2, phone: '2464166940', role: 'ROLE_USER', kakaoId: '2464166940' },
    { id: 104, key: 119, username: 'ghdrlfehd', nickname: '최영준', status: 1, phone: '***', role: 'ROLE_USER', kakaoId: '***' },
    { id: 105, key: 120, username: 'kakaoUser8732c2aa-407d-4c00', nickname: '권주부', status: 1, phone: '2464276794', role: 'ROLE_USER', kakaoId: '2464277588' },
    { id: 106, key: 121, username: 'kakaoUser5d735c32-1274-407d', nickname: '서재영', status: 3, phone: '2464071732', role: 'ROLE_admin', kakaoId: '2464074455' },
    { id: 107, key: 122, username: 'kakaoUser38a6d336-96b8-4624', nickname: '박준호', status: 1, phone: '2464166940', role: 'ROLE_USER', kakaoId: '2464166200' },
    { id: 108, key: 123, username: 'qkrrlfehd', nickname: '박길동', status: 1, phone: '***', role: 'ROLE_USER', kakaoId: '***' },
    { id: 109, key: 124, username: 'kakaoUser8732c2aa-96b8-407d', nickname: '육주혜', status: 3, phone: '2464276794', role: 'ROLE_admin', kakaoId: '2464276944' }
  ]);

  // 정렬용
  const handleSort = (sortConfig) => {
    setSortConfig(sortConfig);
  };

  // 정렬된 데이터
  const sortedUserData = useMemo(() => {
    if (sortConfig.key) {
      return [...userData].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return userData;
  }, [userData, sortConfig]);

  // 검색용
  const filteredUserData = sortedUserData.filter(user =>
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

  const columns = [
    { label: '순번', key: 'id' },
    { label: 'Id key', key: 'key' },
    { label: '아이디', key: 'username' },
    { label: '닉네임', key: 'nickname' },
    { label: '상태', key: 'status' },
    { label: '휴대폰번호', key: 'phone' },
    { label: '권한', key: 'role' },
    { label: '카카오ID', key: 'kakaoId' }
  ];
  return (
    <div className={styles.App}>
      <h4>유저 정보</h4>
      <div className={styles.search_bar}>
        <input type="text" value={searchTerm} onChange={handleSearchChange}
          placeholder="검색어를 입력하세요"
          className="search-input" />
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
          <tr>
              {columns.map((column) => (
                <th key={column.key}>
                  {column.label}
                  <SortButton
                    column={column.key}
                    sortConfig={sortConfig}
                    onSort={handleSort}
                  />
                </th>
                
              ))}
                <th>Lock</th>

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
                  <td className={styles.lastblock}>
                    <button
                      className={getButtonStyle(user.id, 'lock')}
                      onClick={() => handleButtonClick(user.id, 'lock')}
                    >
                      {buttonStates[user.id]?.lockText || '계정 잠금'}
                    </button>
                    </td>       
                </tr>
              ))



              ) : (
                <div className={styles.noMember}>
                  등록된 회원이 없습니다
                </div>
              )}
                            {showModal && (
                <div className={styles.modalOverlay} onClick={handleCloseModal}>
                  <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                    <p>{modalMessage}</p>
                    <button onClick={handleCloseModal}>닫기</button>
                  </div>
                </div>
              )}
            </tbody>
        </table>
      </div>
    </div>
    
  );
}
