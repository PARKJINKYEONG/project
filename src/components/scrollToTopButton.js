import React, { useState, useEffect } from 'react';
import '../styles/scrollToTopButton.css';

const ScrollToTopButton = () => {
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTopButton(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    showScrollTopButton && (
      <button className="scroll-to-top" onClick={(e) => {
        e.preventDefault();
        scrollToTop();
      }}>
      ▲
      </button>
    )
  );
};

export default ScrollToTopButton;
