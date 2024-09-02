import React, { useEffect, useState } from 'react';
import styles from '../../../styles/admin/question/questionManagement.module.css';
import axios from 'axios';
import useRequest from '../../../hooks/useRequest.js';
import UserTable from './userTable.js';


const MemberManagement = () => {
  const { get } = useRequest();
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);

  // const fetchQuestions = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:8080/api/ask/all');
  //     //console.log(response.data);
  //     setQuestion(response.data);
  //   } catch (error) {
  //     console.error('문의사항을 불러오는 중 오류가 발생했습니다.', error);
  //   }
  // };


  useEffect(() => {
    // fetchQuestions();
  }, []);

  const handleMemberClick = (member) => {
    setSelectedMember(member);
  };

  return <>
    <div className={styles.container}>
      {/* {selectedQuestion ? (
        <QuestionView members={selectedMember} setIsEditing={setSelectedMember} />
      ) : (  
          <>       */}
          <UserTable props={'회원정보 관리'} members={members} onMemberClick={handleMemberClick}/>
          {/* </>
      )}   */}
    </div>
    </>;
};

export default MemberManagement;