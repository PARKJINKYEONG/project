import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/common.module.css';
import ChatBot from '../ChatBot/ChatBot';
import ProductValues from './ProductValues';

export default function Home() {
  const [activeTab, setActiveTab] = useState('전체 검색');
  const [placeholderText, setPlaceholderText] = useState('전체 검색');
  const [modalContent, setModalContent] = useState(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    switch (tab) {
      case '호텔':
        setPlaceholderText('호텔 검색');
        break;
      case '식당':
        setPlaceholderText('식당 검색');
        break;
      case '관광지':
        setPlaceholderText('관광지 검색');
        break;
      case '행사':
        setPlaceholderText('행사 검색');
        break;
      default:
        setPlaceholderText('전체 검색');
    }
    const navSection = document.querySelector(`.${styles.searchNavSection}`);
    if (navSection) {
      window.scrollTo({
        top: navSection.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  const openModal = (content) => {
    setModalContent(content);
  };

  const closeModal = (event) => {
    if (event.target.className === styles.modal) {
      setModalContent(null);
    }
  };

  return (
    <>
      <main className={styles.mainContent}>
        
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroImageContainer}>
            <img src="/images/home/paradise.jpg" alt="Desert Landscape" className={styles.heroImage} />
            <div className={styles.heroText}>
              <h2><p>여행을 준비하는 당신을 위한</p> <p>맞춤 AI 여행 플래너</p></h2>
              <Link to="/createPlan">
                <button className={styles.planButton}>
                  <div className={styles.planButtonText}>
                    계획 떠나기
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Navigation and Search Section Combined */}
        <section className={styles.searchNavSection}>
          <nav className={styles.navMenu}>
            {['전체 검색', '호텔', '식당', '관광지', '행사'].map((item) => (
              <button
                key={item}
                className={`${styles.navItem} ${activeTab === item ? styles.active : ''}`}
                onClick={() => handleTabChange(item)}
              >
                {item}
              </button>
            ))}
          </nav>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder={placeholderText}
              className={styles.searchInput}
            />
            <button className={styles.voiceButton}>
              <img src="/images/home/voice.png" alt="Voice Search" />
            </button>
            <button className={styles.searchButton}>
              <img src="/images/home/search.png" alt="Search" />
            </button>
          </div>
        </section>

        <ProductValues /> 

        {/* News Section */}
        <section className={styles.newsSection}>
          <h3>여행지 추천 뉴스 및 행사 정보</h3>
          <div className={styles.newsContainer}>
            <div className={styles.newsItem}>뉴스 1: 새로운 여행지 추천</div>
            <div className={styles.newsItem}>뉴스 2: 다가오는 여행 행사</div>
            <div className={styles.newsItem}>뉴스 3: 특가 여행 상품 안내</div>
          </div>
        </section>
      </main>
      <ChatBot/>
    </>
  );
}
