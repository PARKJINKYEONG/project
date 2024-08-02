
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../css/bookmarkHome.module.css';

const BookmarkHome = () => {
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
    }
  ]);

  const [newItem, setNewItem] = useState({
    title: '',
    date: '',
    images: '',
  });

  const navigate = useNavigate();

  const handleAddItem = () => {
    const imagesArray = newItem.images.split(',').map(img => img.trim());
    setItems([...items, { ...newItem, id:Date.now().toString(), images: imagesArray }]);
    setNewItem({
      title: '',
      date: '',
      images: '',
    });
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

  return (
    <div className={styles.container}>
      <div className="row mb-4">
        <div className="col-md-4">
          <input
            type="text"
            name="title"
            value={newItem.title}
            onChange={handleInputChange}
            placeholder="제목"
            className="form-control mb-2"
          />
          <input
            type="text"
            name="date"
            value={newItem.date}
            onChange={handleInputChange}
            placeholder="날짜"
            className="form-control mb-2"
          />
          <input
            type="text"
            name="images"
            value={newItem.images}
            onChange={handleInputChange}
            placeholder="이미지 URL (쉼표로 구분)"
            className="form-control mb-2"
          />
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
                  {item.images.map((image, idx) => (
                    <img key={idx} src={image} alt="bookmark" className="img-thumbnail" />
                  ))}
                </div>
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

