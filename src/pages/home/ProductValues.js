import React, { useState } from 'react';

const containerStyle = {
  marginTop: '40px',
  marginBottom: '64px',
  position: 'relative',
  width: '100%',
  overflow: 'hidden',
};

const sliderContainerStyle = {
  display: 'flex',
  transition: 'transform 0.5s ease-in-out',
};

const cardStyle = {
  flex: '0 0 25%',
  maxWidth: '25%',
  padding: '24px',
  textAlign: 'center',
  border: '1px solid #e0e0e0',
  boxSizing: 'border-box',
  cursor: 'pointer',
};

const itemStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '16px',
};

const imageStyle = {
  height: '200px',
  width: '200px',
  objectFit: 'cover',
  transition: 'transform 0.3s ease-in-out',
};

const buttonStyle = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  border: 'none',
  cursor: 'pointer',
  padding: '10px',
};

const leftButtonStyle = {
  ...buttonStyle,
  left: '10px',
};

const rightButtonStyle = {
  ...buttonStyle,
  right: '10px',
};

function TravelSections() {
  const [slideIndices, setSlideIndices] = useState({
    '인기 여행지': 0,
    '많이가는 관광지': 0,
    '인기많은 식당': 0,
    '별점 높은 숙소': 0,
  });

  const nextSlide = (category) => {
    setSlideIndices((prevIndices) => ({
      ...prevIndices,
      [category]: (prevIndices[category] + 1) % 2, // 0과 1 사이에서 순환
    }));
  };

  const prevSlide = (category) => {
    setSlideIndices((prevIndices) => ({
      ...prevIndices,
      [category]: (prevIndices[category] - 1 + 2) % 2, // 0과 1 사이에서 순환
    }));
  };

  const urls = {
    '인기 여행지': [
      'https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=a0cbd123-4822-4e43-b8ef-e13bba8ff0f7&big_category=A04&mid_category=A0401&big_area=6',
      'https://www.tripadvisor.co.kr/Attraction_Review-g60763-d104365-Reviews-Empire_State_Building-New_York_City_New_York.html',
      'https://example.com/rome',
      'https://example.com/newyork',
      'https://example.com/barcelona',
      'https://example.com/tokyo',
      'https://example.com/sydney',
      'https://example.com/berlin',
    ],
    '많이가는 관광지': [
      'https://www.tripadvisor.co.kr/Attraction_Review-g187147-d188151-Reviews-Eiffel_Tower-Paris_Ile_de_France.html',
      'https://www.tripadvisor.co.kr/Attraction_Review-g187497-d190166-Reviews-Basilica_de_la_Sagrada_Familia-Barcelona_Catalonia.html',
      'https://example.com/busan',
      'https://example.com/seoul',
      'https://example.com/gangneung',
      'https://example.com/jeonju',
      'https://example.com/incheon',
      'https://example.com/daegu',
    ],
    '인기많은 식당': [
      'https://www.tripadvisor.co.kr/Restaurant_Review-g298484-d2342979-Reviews-Bardak-Moscow_Central_Russia.html',
      'https://www.tripadvisor.co.kr/Restaurants-g187497-Barcelona_Catalonia.html',
      'https://example.com/jeonju-hanok',
      'https://example.com/gangneung-coffee',
      'https://example.com/daegu-chimcalbi',
      'https://example.com/gwangju-boribap',
      'https://example.com/daejeon-bread',
      'https://example.com/busan-milmyeon',
    ],
    '별점높은 숙소': [
      'https://www.tripadvisor.co.kr/Hotel_Review-g187514-d10190864-Reviews-Gran_Hotel_Ingles-Madrid.html',
      'https://www.tripadvisor.co.kr/Hotel_Review-g187514-d15235805-Reviews-Hotel_Riu_Plaza_Espana-Madrid.html',
      'https://example.com/gangwon-pension',
      'https://example.com/busan-hotel',
      'https://example.com/jeonju-hanokstay',
      'https://example.com/gyeongju-resort',
      'https://example.com/namhae-pension',
      'https://example.com/gangnam-hotel',
    ],
  };

  const cardNames = {
    '인기 여행지': ['부산', '뉴욕', '로마', '런던', '바르셀로나', '도쿄', '시드니', '베를린'],
    '많이가는 관광지': ['에펠탑', '파밀리아 성당', '루브르 박물관', '오르세 미술관', '강릉', '전주', '인천', '대구'],
    '인기많은 식당': ['바르다크', '로스몬테스', '전주 한옥', '강릉 커피거리', '대구 찜갈비', '광주 보리밥', '대전 빵집', '부산 밀면'],
    '별점높은 숙소': ['그란 호텔', '플라자 호텔', '강원 펜션', '부산 호텔', '전주 한옥스테이', '경주 리조트', '남해 펜션', '강남 호텔'],
  };

  const handleCardClick = (category, index) => {
    window.open(urls[category][index], '_blank');
  };

  return (
    <div>
      {['인기 여행지', '많이가는 관광지', '인기많은 식당', '별점높은 숙소'].map((category, index) => (
        <section key={index} style={containerStyle}>
          <h3>{category}</h3>
          <div style={{ ...sliderContainerStyle, transform: `translateX(-${slideIndices[category] * 100}%)` }}>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} style={cardStyle} onClick={() => handleCardClick(category, i)}>
                <div style={itemStyle}>
                  <img src={`/images/home/${category}${i + 1}.jpg`} alt={cardNames[category][i]} style={imageStyle} />
                  <h5>{cardNames[category][i]}</h5>
                </div>
              </div>
            ))}
          </div>
          <button style={leftButtonStyle} onClick={() => prevSlide(category)}>&#8249;</button>
          <button style={rightButtonStyle} onClick={() => nextSlide(category)}>&#8250;</button>
        </section>
      ))}
    </div>
  );
}

export default TravelSections;
