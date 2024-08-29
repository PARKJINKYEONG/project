import { useContext, useEffect, useState } from 'react';
import style from "../../styles/profilePage.module.css";
import MuiModal from '../../components/muiModal';
import { UserContext } from '../../contexts/userContext';
import useRequest from '../../hooks/useRequest';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getYear, getMonth } from 'date-fns';

export default function ProfilePage() {
  const { email } = useContext(UserContext);
  const [name, setName] = useState('');
  const [introduce, setIntroduce] = useState('');
  const [gender, setGender] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [birthDate, setBirthDate] = useState(new Date());
  const { get, put } = useRequest();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await get('/getprofile');
        setName(data.data.name || '');
        setIntroduce(data.data.introduce || '');
        setGender(data.data.gender);
        setBirthDate(data.data.birthDate ? new Date(data.data.birthDate) : new Date());
        if (data.data.profileImageUrl) {
          setProfileImage(data.data.profileImageUrl);
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

  const handleGenderChange = (e) => {
    const value = e.target.value;
    setGender(value === '남자' ? true : value === '여자' ? false : null);
  };

  const handleBirthDateChange = (date) => {
    setBirthDate(date);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      try {
        const profileData = {
          name,
          introduce,
          gender,
          birthDate: birthDate ? birthDate.toISOString().split('T')[0] : null,
          profileImage,
        };
        await put('/updateprofile', profileData);
        alert('프로필이 수정되었습니다!');
        setIsEditing(false);
      } catch (error) {
        console.error('프로필 업데이트 중 오류가 발생했습니다.', error);
        alert('프로필 업데이트에 실패했습니다.');
      }
    } else {
      setIsEditing(true);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const years = Array.from({ length: getYear(new Date()) - 1990 + 1 }, (_, i) => 1990 + i);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className={style.profilePage}>
      <h1>프로필 페이지</h1>
      <form onSubmit={handleSubmit}>
        <div className={style.formGroup}>
          <label htmlFor="profileImage">프로필 사진:</label>
          <div className={style.fileInputWrapper}>
            <input type="file" id="profileImage" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} disabled={!isEditing} />
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
          <input type="text" id="name" value={name} onChange={handleNameChange} readOnly={!isEditing} />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="email">이메일:</label>
          <input type="email" id="email" value={email} readOnly />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="gender">성별:</label>
          {isEditing ? (
            <div>
              <label>
                <input type="radio" value="남자" checked={gender === true} onChange={handleGenderChange} /> 남자
              </label>
              <label>
                <input type="radio" value="여자" checked={gender === false} onChange={handleGenderChange} /> 여자
              </label>
              <label>
                <input type="radio" value="비공개" checked={gender === null} onChange={handleGenderChange} /> 비공개
              </label>
            </div>
          ) : (
            <input type="text" id="gender" value={gender === true ? '남자' : gender === false ? '여자' : '비공개'} readOnly />
          )}
        </div>
        <div className={style.formGroup}>
          <label htmlFor="birthDate">생일:</label>
          {isEditing ? (
            <DatePicker
              selected={birthDate}
              onChange={handleBirthDateChange}
              renderCustomHeader={({
                date,
                changeYear,
                changeMonth,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <div
                  style={{
                    margin: 10,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                    {"<"}
                  </button>
                  <select
                    value={getYear(date)}
                    onChange={({ target: { value } }) => changeYear(value)}
                  >
                    {years.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <select
                    value={months[getMonth(date)]}
                    onChange={({ target: { value } }) =>
                      changeMonth(months.indexOf(value))
                    }
                  >
                    {months.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                    {">"}
                  </button>
                </div>
              )}
              inline
              dateFormat="yyyy-MM-dd"
              calendarClassName="scrollable-datepicker"
            />
          ) : (
            <input
              type="text"
              id="birthDate"
              value={birthDate ? birthDate.toISOString().split('T')[0] : ''}
              readOnly
            />
          )}
        </div>
        <div className={style.formGroup}>
          <label htmlFor="introduce">자기소개:</label>
          <textarea id="introduce" value={introduce} onChange={handleIntroduceChange} readOnly={!isEditing} />
        </div>
        <button type="submit" className={style.updateButton}>
          {isEditing ? '프로필 업데이트' : '프로필 수정'}
        </button>
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
