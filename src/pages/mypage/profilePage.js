import { useContext, useEffect, useState } from 'react';
import style from "../../styles/profilePage.module.css";
import MuiModal from '../../components/muiModal';
import { UserContext } from '../../contexts/userContext';
import useRequest from '../../hooks/useRequest';

export default function ProfilePage() {
  const { email } = useContext(UserContext);
  const [name, setName] = useState('');
  const [introduce, setIntroduce] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { get } = useRequest();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await get('/getprofile');
        setName(data.name || '');
        setIntroduce(data.introduce || '');
        if (data.profileImageUrl) {
          setProfileImage(data.profileImageUrl);
        }
        console.log(data);
      } catch (error) {
        console.error('프로필 데이터를 가져오는 중 오류가 발생했습니다.', error);
      }
    };


    fetchProfileData();
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleIntroduceChange = (e) => {
    setIntroduce(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('프로필이 업데이트되었습니다!');
    // 서버에 프로필 업데이트 요청을 보낼 로직을 추가할 수 있습니다.
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className={style.profilePage}>
      <h1>프로필 페이지</h1>
      <form onSubmit={handleSubmit}>
        <div className={style.formGroup}>
          <label htmlFor="profileImage">프로필 사진:</label>
          <div className={style.fileInputWrapper}>
            <input type="file" id="profileImage" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
            <label className={style.customButton} htmlFor="profileImage">
              파일 선택
            </label>
          </div>
          {profileImage && (
            <div className={style.imagePreview}>
              <img src={profileImage} alt="Profile Preview" className={style.previewImage} onClick={toggleModal} />
            </div>
          )}
        </div>
        <div className={style.formGroup}>
          <label htmlFor="name">이름:</label>
          <input type="text" id="name" value={name} onChange={handleNameChange} />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="email">이메일:</label>
          <input type="email" id="email" value={email} readOnly />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="introduce">자기소개:</label>
          <textarea id="introduce" value={introduce} onChange={handleIntroduceChange} />
        </div>
        {/* 클래스명을 추가하여 버튼 스타일을 적용 */}
        <button type="submit" className={style.updateButton}>프로필 업데이트</button>
      </form>

      <MuiModal
        open={isModalOpen}
        onClose={toggleModal}
        content={<img className={style.modalContent} src={profileImage} alt="Profile Image" />}
        hideActions={true}
      />
    </div>
  );
}
