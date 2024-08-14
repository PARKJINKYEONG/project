
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/bookmarkHome.module.css';
import ClearIcon from '@mui/icons-material/Clear';

const BookmarkHome = ({ bookmarks }) => {

  // 최근 조회의 상태 

  const [items, setItems] = useState([
    { 
      id: Date.now().toString(),
      title: '최근 조회',
      date: '어제',
      images: [
        'path/to/image1.jpg',
        'path/to/image2.jpg',
        'path/to/image3.jpg',
        'path/to/image4.jpg',
      ],
    },
  ]);


  // bookmarks가 변경될 때마다 items 상태를 업데이트
  useEffect(() => {
    setItems((prevItems) => [
      ...prevItems,
      ...bookmarks,
    ]);
  }, [bookmarks]);

  // 새로 추가된 즐겨찾기의 상태 

  const [newItem, setNewItem] = useState({
    title: '',
  });

  const navigate = useNavigate();

  const handleAddItem = () => {

    if (newItem.title === '') {
      alert('즐겨찾기의 제목을 입력하세요.');
      return;
    }


    const defaultImages = ['path/to/default_image1.jpg'];


    const getCurrentDate = () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}.${month}.${day}`;
    };

    setItems([...items, { ...newItem, id: Date.now().toString(), images: defaultImages, date: getCurrentDate() }]);

    setNewItem({ title: '' });

  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prevItem) => ({
      ...prevItem,
      [name]: value, 
    }));
  };

  const handleCardClick = (title, id) => {
    if (title === '최근 조회') {
      navigate('/bookmark/recently-viewed');  
    } else {
      navigate(`/bookmark/details/${id}`, { state: { title } });
    }
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className="row mb-4">
        <div className="col-md-4">

          <input type="text" name="title" value={newItem.title} onChange={handleInputChange} 

          placeholder="제목" className="form-control mb-2"/>
          
          <button onClick={handleAddItem} className="btn btn-primary">
            즐겨찾기 추가
          </button>
        </div>
      </div>
      <div className="row">
        {items.map((item, index) => (
          <div key={index} className="col-md-4 mb-4" onClick={() => handleCardClick(item.title, item.id)}>
            <div className={`card h-100 ${styles.card}`}>
              <div className={`card-body ${styles.cardBody}`}>
                <div className={`mb-2 ${styles.images}`}>
                  {item.images && item.images.map((image, idx) => (
                    <img key={idx} src={image}  className="img-thumbnail" />
                  ))}
                </div>
                {item.title !== '최근 조회' && (
                  <button onClick={(e) => {

                      e.stopPropagation(); 

                      handleDeleteItem(item.id);}} className={styles.deleteButton}> 
                    <ClearIcon style={{fontSize: 20}}/> 
                  </button>
                )}
              </div>
              <div className={`card-footer ${styles.cardFooter}`}>
                <h5 className={`card-title ${styles.cardTitle}`}>{item.title}</h5>
                <p className={`card-text ${styles.cardText}`}>{item.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookmarkHome;
