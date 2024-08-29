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
  flex: '0 0 25%', // 한 화면에 4개의 항목이 보이도록 설정
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

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  width: '500px',
  maxWidth: '80%',
  maxHeight: '80%',
  overflowY: 'auto',
  zIndex: 1001,
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
  // 카테고리별 슬라이드 인덱스를 객체로 관리
  const [slideIndices, setSlideIndices] = useState({
    '인기 여행지': 0,
    '많이가는 관광지': 0,
    '인기많은 식당': 0,
    '별점높은 숙소': 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent('');
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

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

  const descriptions = {
    '인기 여행지': [
      '파리는 예술과 문화의 중심지로, 에펠탑과 루브르 박물관 등 세계적인 명소가 가득합니다.',
      '런던은 역사와 현대가 공존하는 도시로, 빅벤과 버킹엄 궁전이 유명합니다.',
      '로마는 고대 로마의 유적이 살아 숨 쉬는 도시로, 콜로세움과 바티칸이 있습니다.',
      '뉴욕은 미국의 경제와 문화의 중심지로, 자유의 여신상과 센트럴 파크가 유명합니다.',
      '바르셀로나는 가우디의 작품과 함께 아름다운 해변을 자랑하는 스페인의 도시입니다.',
      '도쿄는 전통과 현대가 어우러진 도시로, 신주쿠와 아사쿠사가 유명합니다.',
      '시드니는 오페라 하우스와 하버 브릿지로 유명한 호주의 대표적인 도시입니다.',
      '베를린은 역사적인 기념물들과 현대적인 문화가 공존하는 독일의 수도입니다.'
    ],
    '많이가는 관광지': [
      '제주도는 아름다운 자연경관과 함께 다양한 레저 활동을 즐길 수 있는 관광지입니다.',
      '경주는 신라의 천년 역사를 간직한 도시로, 불국사와 석굴암이 유명합니다.',
      '부산은 해운대 해수욕장과 광안대교로 유명한 해양 관광 도시입니다.',
      '서울은 대한민국의 수도로, 경복궁과 남산타워 등 다양한 관광지가 있습니다.',
      '강릉은 아름다운 해변과 커피거리로 유명한 도시입니다.',
      '전주는 한옥마을과 비빔밥으로 유명한 전통의 도시입니다.',
      '인천은 월미도와 송도 국제 도시로 대표되는 대한민국의 관문입니다.',
      '대구는 팔공산과 서문시장으로 유명한 도시입니다.'
    ],
    '인기많은 식당': [
      '서울의 맛집 골목은 한식과 퓨전 음식이 어우러진 다양한 음식점들로 가득합니다.',
      '부산의 해산물 맛집에서는 신선한 회와 해산물 요리를 맛볼 수 있습니다.',
      '전주의 한옥마을에서는 전통 한식을 맛볼 수 있는 유명한 식당들이 많습니다.',
      '강릉의 커피거리에서는 향긋한 커피와 함께 해안가의 아름다운 풍경을 즐길 수 있습니다.',
      '대구의 찜갈비 골목은 매콤한 갈비찜으로 유명합니다.',
      '광주의 무등산 보리밥 거리는 건강한 한식을 맛볼 수 있습니다.',
      '대전의 성심당은 맛있는 빵집으로 전국적으로 유명합니다.',
      '부산의 밀면 거리는 저렴하고 맛있는 밀면을 즐길 수 있는 곳입니다.'
    ],
    '별점높은 숙소': [
      '제주도의 리조트들은 푸른 바다를 배경으로 한 편안한 휴식을 제공합니다.',
      '서울의 호텔들은 도시의 중심에 위치하여 관광과 비즈니스 모두에 편리합니다.',
      '강원도의 펜션은 아름다운 자연 속에서 조용한 휴식을 취할 수 있는 곳입니다.',
      '부산의 해변가 호텔들은 아름다운 바다 전망을 자랑합니다.',
      '전주의 한옥 스테이에서는 전통 한옥에서의 특별한 경험을 할 수 있습니다.',
      '경주의 리조트들은 역사와 전통이 어우러진 독특한 숙박 경험을 제공합니다.',
      '남해의 펜션들은 아름다운 해안선을 따라 위치하여 휴식과 힐링을 제공합니다.',
      '서울 강남의 고급 호텔들은 쇼핑과 엔터테인먼트를 즐기기에 최적의 위치에 있습니다.'
    ]
  };

  return (
    <div>
      {['인기 여행지', '많이가는 관광지', '인기많은 식당', '별점높은 숙소'].map((category, index) => (
        <section key={index} style={containerStyle}>
          <h3>{category}</h3>
          <div style={{ ...sliderContainerStyle, transform: `translateX(-${slideIndices[category] * 100}%)` }}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} style={cardStyle} onClick={() => openModal(descriptions[category][i - 1])}>
                <div style={itemStyle}>
                  <img src={`/images/home/${category}${i}.jpg`} alt={`${category} ${i}`} style={imageStyle} />
                  <h5>{`${category} ${i}`}</h5>
                </div>
              </div>
            ))}
          </div>
          <button style={leftButtonStyle} onClick={() => prevSlide(category)}>&#8249;</button>
          <button style={rightButtonStyle} onClick={() => nextSlide(category)}>&#8250;</button>
        </section>
      ))}

      {isModalOpen && (
        <div style={modalOverlayStyle} onClick={handleOverlayClick}>
          <div style={modalStyle}>
            <h3>설명</h3>
            <p>{modalContent}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default TravelSections;
