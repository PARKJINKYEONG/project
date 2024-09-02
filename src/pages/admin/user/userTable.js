import React from 'react';
import styles from '../../../styles/admin/user/userTable.module.css';

const UserTable = ({ props, members, onMemberClick }) => {
    return (
        <div className={styles.inquiryContainer}>
            <h2 className={styles.title}>{props}</h2>
            <div className={styles.searchContainer}>
            <div className={styles.searchInputContainer}>
                <div className={styles.searchInputWrapper}>
                    <input
                        type="text"
                        placeholder="검색어를 입력하세요"
                        className={styles.searchInput}
                    />
                    <button className={styles.searchButton}>
                        <img src="/images/icons/search.svg" alt="검색" />
                    </button>
                </div>
            </div>
            <div className={styles.filterContainer}>
                
            </div>
            </div>

            <table className={styles.inquiryTable}>
                <thead>
                    <tr>
                        <th className='col-1'><input type='checkbox' /></th>
                        <th className='col-1'>No.</th>
                        <th className='col-2 text-start'>이메일</th>
                        <th className='col-1'>이름</th>
                        <th className='col-1'>닉네임</th>
                        <th className='col-2'>생년월일</th>
                        <th className='col-1'>권한</th>
                        <th className='col-2'>마지막 접속일</th>
                        <th className='col-1'>정지</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {members.length > 0 ? (
            members.map((member, index) => (
              <tr key={index} onClick={() => onMemberClick(member)} className={styles.clickableCell}>
                <td className='col-1'><input type='checkbox' /></th>
                <td className="col-1 text-center">{index + 1}</td>
                <td className="col-2 text-center">{member.email}</td>
                <td className="col-1 text-center">{member.name}</td>
                <td className="col-1 text-center">{member.nickname}</td>
                <td className="col-2 text-center">{member.birthDate}</td>
                <td className="col-1 text-center">{member.permission}</td>
                <td className="col-2 text-center">{member.lastLogin.slice(0,10)}</td>
                <td className="col-1 text-center">{member.isDeleteId ? 'Yes' : 'No'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className={`text-center ${styles.noData}`}>
                새로 등록된 문의 사항이 없습니다.
              </td>
            </tr>
          )} */}
                    <tr>
                        <td colSpan="10" className={`text-center ${styles.noData}`}>
                            회원목록
                        </td>
                    </tr>
                    <tr className={styles.clickableCell}>
                        <td className='col-1 text-center'><input type='checkbox' /></td>
                        <td className="col-1 text-center">1</td>
                        <td className="col-2 text-start">aaa@aaa.com</td>
                        <td className="col-1 text-center">이00</td>
                        <td className="col-1 text-center">땡땡이</td>
                        <td className="col-2 text-center">1945.08.15</td>
                        <td className="col-1 text-center">ADMIN</td>
                        <td className="col-2 text-center">2024.09.01</td>
                        <td className="col-1 text-center">X</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;