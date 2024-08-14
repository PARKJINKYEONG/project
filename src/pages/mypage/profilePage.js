import React, { useState } from 'react';
import style from "../../styles/profilePage.module.css";
import MuiModal from '../../components/muiModal';


export default function ProfilePage() {
  const [name, setName] = useState('크아악');
  const [email, setEmail] = useState('jay5693@naver.com');
  const [introduce, setIntroduce] = useState('집에 가고 싶다');
  const [profileImage, setProfileImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <button type="submit">프로필 업데이트</button>
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
