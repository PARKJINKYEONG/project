import React from 'react';

function ProductSmokingHero() {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '13rem',
    marginBottom: '20rem',
  };

  const buttonStyle = {
    border: '4px solid currentColor',
    borderRadius: 0,
    padding: '1rem 2.5rem',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    fontSize: '1rem',
    color:'black',
  };

  const buttonTextStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
  };

  return (
    <section style={containerStyle}>
      <button style={buttonStyle}>
        <div style={buttonTextStyle}>
          Discover New Plan
        </div>
      </button>
    </section>
  );
}

export default ProductSmokingHero;
