import { useContext, useEffect, useState } from 'react';
import style from "../../styles/profilePage.module.css";
import MuiModal from '../../components/muiModal';
import { UserContext } from '../../contexts/userContext';
import useRequest from '../../hooks/useRequest';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getYear, getMonth } from 'date-fns';
import { FormControlLabel, Radio, RadioGroup, Button} from '@mui/material';

export default function ProfilePage() {
  const { email } = useContext(UserContext);
  const [name, setName] = useState('');
  const [introduce, setIntroduce] = useState('');
  const [gender, setGender] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // 이미지 파일 선택을 위한 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [birthDate, setBirthDate] = useState(new Date());
  const { get, put } = useRequest();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await get('/getprofile');
        setName(response.data.name || '');
        setIntroduce(response.data.introduce || '');
        setGender(response.data.gender === true ? '남자' : response.data.gender === false ? '여자' : '비공개');
        setBirthDate(response.data.birthDate ? new Date(response.data.birthDate) : new Date());
        if (response.data.profileImageUrl) {
          setProfileImage(response.data.profileImageUrl);
        }
      } catch (error) {
        console.error('프로필 데이터를 가져오는 중 오류가 발생했습니다.', error);
      }
    };

    fetchProfileData();
  }, [email]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleIntroduceChange = (e) => {
    setIntroduce(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleBirthDateChange = (date) => {
    setBirthDate(date);
  };

  const handleImageChange = (e) => {
    e.preventDefault(); // 폼 제출 방지
    const file = e.target.files[0];
    setSelectedImage(file);  // 선택한 이미지를 상태로 저장
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = (e) => {
    e.preventDefault();  // 폼 제출 방지
    setIsEditing(true);  // "프로필 수정" 버튼 클릭 시 수정 모드로 변경
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('introduce', introduce);
    formData.append('gender', gender === '남자' ? true : gender === '여자' ? false : null);
    formData.append('birthDate', birthDate ? birthDate.toISOString().split('T')[0] : null);
    
    if (selectedImage) {
      formData.append('file', selectedImage); // 이미지를 FormData에 추가
    }

    try {
      await put('/updateprofile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('프로필이 수정되었습니다!');
      setIsEditing(false);  // 수정 완료 후 다시 보기 모드로 변경
    } catch (error) {
      console.error('프로필 업데이트 중 오류가 발생했습니다.', error);
      alert('프로필 업데이트에 실패했습니다.');
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const years = Array.from({ length: getYear(new Date()) - 1990 + 1 }, (_, i) => 1990 + i);
  const months = [
    "1월", "2월", "3월", "4월", "5월", "6월",
    "7월", "8월", "9월", "10월", "11월", "12월"
  ];

  return (
    <div className={style.profilePage}>
      <h1>프로필 페이지</h1>
      <form onSubmit={handleSubmit}>
        <div className={style.formGroup}>
          <label htmlFor="profileImage">프로필 사진:</label>
          <div className={style.fileInputWrapper}>
            {isEditing && (
              <>
                <input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
                <label className={style.customButton} htmlFor="profileImage">
                  파일 선택
                </label>
              </>
            )}
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
            <RadioGroup
              name="gender"
              row
              value={gender}
              onChange={handleGenderChange}
            >
              <FormControlLabel control={<Radio />} value="남자" label="남자" />
              <FormControlLabel control={<Radio />} value="여자" label="여자" />
              <FormControlLabel control={<Radio />} value="비공개" label="비공개" />
            </RadioGroup>
          ) : (
            <input type="text" id="gender" value={gender} readOnly />
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
        
        {isEditing ? (
          <Button type="submit" className={style.updateButton} variant="contained" color="primary">
            프로필 업데이트
          </Button>
        ) : (
          <Button type="button" className={style.updateButton} variant="contained" color="primary" onClick={handleEditClick}>
            프로필 수정
          </Button>
        )}
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
