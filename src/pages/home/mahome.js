import React from 'react';
import styles from "../../styles/Home.module.css";
import earthImage from './earth.png';
import { Link } from '@mui/material';

function homeMain() {
  return <>
    <div className={styles.App}>
      <div className={styles.container}>
        <div className={styles.textBoxLeft}>사이트 소개글 입니다</div>
        <div className={styles.earth}>
          <img src={earthImage} alt="Earth" />
        </div>
        <div className={styles.textBoxRight}>이 사이트를 만들게된 이유로는..</div>
      </div>
      <div className={styles.textBoxBottom}></div>

      <div className={styles.createPlan}>
        <button className={styles.travelButton}>여행 떠나기</button>
      </div>

      <div className={styles.videoContainer}>
        <div className={styles.videoWrapper}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/watch?v=pL-xKuh80js"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  </>
}

export default homeMain;