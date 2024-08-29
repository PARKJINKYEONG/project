import { useEffect } from 'react';
import styles from '../../styles/mapComponent.module.css';

function MapComponent({ selectedPlace }) {
  

  useEffect(() => {
    // 카카오맵 스크립트 로드
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=636ca764b3276faecf09a4b2bead8471&autoload=false`;
    script.async = true;
    document.head.appendChild(script);  
    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map'); // 지도를 표시할 div
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 서울의 위도와 경도
          level: 3 // 지도의 확대 레벨
        };        
        // 지도 생성
        const map = new window.kakao.maps.Map(container, options);
      });
    };
    
  }, []);   
  
  return (
    <div id="map" className={styles.mapContainer}></div>
  );
}

export default MapComponent;
