import React from 'react';

const containerStyle = {
  marginTop: '40px',
  marginBottom: '64px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
};

const gridContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  gap: '20px',
  width: '100%',
};

const cardStyle = {
  flex: '1 1 calc(25% - 16px)',
  maxWidth: 'calc(25% - 16px)',
  padding: '24px',
  textAlign: 'center',
  border: '1px solid #e0e0e0',
  boxSizing: 'border-box',
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

function ProductValues() {
  return (
    <section style={{ display: 'flex', overflow: 'hidden', backgroundColor: 'white' }}>
      <div style={containerStyle}>
        <h2 style={{ marginBottom: '40px', textAlign: 'left', width: '100%' }}>인기여행지</h2>

        <div style={gridContainerStyle}>
          {/* 첫 번째 줄의 카드 4개 */}
          <div style={cardStyle}>
            <h5 style={{ marginBottom: '20px' }}>세계여행</h5>
            <div style={itemStyle}>
              <h5 style={{ marginBottom: '24px' }}>Paris, France</h5>
              <img src="/images/parieiffel.jpg" alt="world" style={imageStyle} />
            </div>
          </div>

          <div style={cardStyle}>
            <h5 style={{ marginBottom: '20px' }}>국내여행</h5>
            <div style={itemStyle}>
              <h5 style={{ marginBottom: '24px' }}>Jejudo, Korea</h5>
              <img src="/images/local.jpg" alt="local" style={imageStyle} />
            </div>
          </div>

          <div style={cardStyle}>
            <h5 style={{ marginBottom: '20px' }}>문화관광부 추천</h5>
            <div style={itemStyle}>
              <h5 style={{ marginBottom: '24px' }}>Seoul, Korea</h5>
              <img src="/images/localseoul.jpg" alt="world" style={imageStyle} />
            </div>
          </div>

          <div style={cardStyle}>
            <h5 style={{ marginBottom: '20px' }}>추천여행지</h5>
            <div style={itemStyle}>
              <h5 style={{ marginBottom: '24px' }}>London, British</h5>
              <img src="/images/worldlodon01.jpg" alt="world" style={imageStyle} />
            </div>
          </div>

          {/* 두 번째 줄의 카드 4개 */}
          <div style={cardStyle}>
            <h5 style={{ marginBottom: '20px' }}>미국여행</h5>
            <div style={itemStyle}>
              <h5 style={{ marginBottom: '24px' }}>New York, USA</h5>
              <img src="/images/worldusa01.jpg" alt="nyc" style={imageStyle} />
            </div>
          </div>

          <div style={cardStyle}>
            <h5 style={{ marginBottom: '20px' }}>동남아여행</h5>
            <div style={itemStyle}>
              <h5 style={{ marginBottom: '24px' }}>Bangkok, Thailand</h5>
              <img src="/images/worldthailand.jpg" alt="bangkok" style={imageStyle} />
            </div>
          </div>

          <div style={cardStyle}>
            <h5 style={{ marginBottom: '20px' }}>유럽여행</h5>
            <div style={itemStyle}>
              <h5 style={{ marginBottom: '24px' }}>Rome, Italy</h5>
              <img src="/images/worlditaly.jpg" alt="rome" style={imageStyle} />
            </div>
          </div>

          <div style={cardStyle}>
            <h5 style={{ marginBottom: '20px' }}>오세아니아여행</h5>
            <div style={itemStyle}>
              <h5 style={{ marginBottom: '24px' }}>Sydney, Australia</h5>
              <img src="/images/worldAustralia.jpg" alt="sydney" style={imageStyle} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductValues;
