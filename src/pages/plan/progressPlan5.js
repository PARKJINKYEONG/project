import { useEffect } from "react";
import styles from '../../styles/plan/createPlan/progressPlan5.module.css';

const marker_src = [
  "/images/map/marker_red.png", //red: E9382D
  "/images/map/marker_yellow.png", //yellow: FFC700
  "/images/map/marker_green.png", //green: 3EED00
  "/images/map/marker_skyblue.png", //skyblue: 29CCFF
  "/images/map/marker_blue.png", //blue: 0057FF
  "/images/map/marker_violet.png", //violet: A93AFF
  "/images/map/marker_pink.png", //pink: FF00C7
];

export default function ProgressPlan5() {

  const planItems = [
    {
      day: 1,
      contents: [
        {
          index: 1,
          title: "경주역",
          time: "2024-09-11 08:11",
          lat: 35.798365,
          lng: 129.138955,
          activity: '도착',
        },
        {
          index: 2,
          title: "동궁과월지",
          time: "2024-09-11 08:11",
          lat: 35.83486297292989,
          lng: 129.22651290893555,
          activity: '환승',
        },
      ]
    },
    {
      day: 2,
      contents: [
        {
          index: 1,
          title: "경주교촌마을",
          time: "2024-09-11 08:11",
          lat: 35.829574442841206,
          lng: 129.21475410461426,
          activity: '아침',
        },
        {
          index: 2,
          title: "선덕여왕릉",
          time: "2024-09-11 08:11",
          lat: 35.82358962844781,
          lng: 129.24230575561523,
          activity: '관광',
        },
      ]
    },
    {
      day: 3,
      contents: [
        {
          index: 1,
          title: "경주월드",
          time: "2024-09-11 08:11",
          lat: 35.836324215142085,
          lng: 129.28298950195312,
          activity: '관광',
        },
      ]
    }
  ];

  useEffect(() => {
    // Kakao 지도 API 스크립트가 로드되었는지 확인
    const kakaoMapScript = document.createElement("script");
    kakaoMapScript.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=3c3044cd0747629b379f98dbed8cd69c&autoload=false";
    document.head.appendChild(kakaoMapScript);

    kakaoMapScript.onload = () => {

      //맵 로드
      window.kakao.maps.load(() => {
        var mapContainer = document.getElementById("map"); // 지도를 표시할 div

        // 마커를 표시할 위치와 title 객체 배열 : planItems, props로 받아오기
        let maxLat=-90, minLat=90, maxLng=-180, minLng=180;

        for (let i = 0; i < planItems.length; i++) {
          const contents = planItems[i].contents;
        
          // 각 day의 contents 배열을 순회
          for (let j = 0; j < contents.length; j++) {
            const item = contents[j];
        
            // lat의 최대, 최소값 찾기
            if (item.lat > maxLat) maxLat = item.lat;
            if (item.lat < minLat) minLat = item.lat;
        
            // lng의 최대, 최소값 찾기
            if (item.lng > maxLng) maxLng = item.lng;
            if (item.lng < minLng) minLng = item.lng;
          }
        }


        var mapOption = {
          center: new window.kakao.maps.LatLng((maxLat+minLat)/2,(maxLng+minLng)/2 ),
          // 지도의 중심좌표
          level: 7, // 지도의 확대 레벨
        };

        // 지도를 생성합니다
        var map = new window.kakao.maps.Map(mapContainer, mapOption);


        // 마커 이미지의 이미지 주소
        var markerSrc = marker_src;

        // 마커를 지도에 표시
        for (var i = 0; i < planItems.length; i++) { //요일별로 색깔다르게
          // 마커 이미지의 크기 설정
          var imageSize = new window.kakao.maps.Size(24, 35);

          // 마커 이미지를 생성합니다 //요일별로 색깔다르게
          var markerImage = new window.kakao.maps.MarkerImage(markerSrc[i], imageSize);

          for (var j = 0; j < planItems[i].contents.length; j++) {
            // 마커를 생성합니다, content별로
            var marker = new window.kakao.maps.Marker({
              map: map, // 마커를 표시할 지도
              position: new window.kakao.maps.LatLng(planItems[i].contents[j].lat,planItems[i].contents[j].lng), // 마커의 위치
              title: planItems[i].contents[j].title, // 마커의 타이틀
              image: markerImage, // 마커 이미지
            });
          }

        }

        // 선을 구성하는 좌표 배열입니다. 이 좌표들을 이어서 선을 표시합니다
        let linePath = [
          new window.kakao.maps.LatLng(35.798365, 129.138955),
          new window.kakao.maps.LatLng(35.83486297292989, 129.22651290893555),
          new window.kakao.maps.LatLng(35.829574442841206, 129.21475410461426),
          new window.kakao.maps.LatLng(35.82358962844781, 129.24230575561523),
          new window.kakao.maps.LatLng(35.836324215142085, 129.28298950195312),
        ];

        // 지도에 표시할 선을 생성합니다
        let polyline = new window.kakao.maps.Polyline({
          path: linePath, // 선을 구성하는 좌표배열 입니다
          strokeWeight: 5, // 선의 두께 입니다
          strokeColor: '#FF9431', // 선의 색깔입니다
          strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
          strokeStyle: 'solid' // 선의 스타일입니다
        });

        // 지도에 선을 표시합니다 
        polyline.setMap(map);

      });
    };

    // cleanup function to remove script if component unmounts
    return () => {
      document.head.removeChild(kakaoMapScript);
    };
  }, []);

  return (
    <>
      <div className={styles.progress5Container}>
        <div className={styles.resultTitle}>
          <h3>00님의 여행 일정</h3>
        </div>
        <div className={styles.resultContainer}>
          <div className={styles.mapContainer}>
            <div id="map" className={styles.map}></div>
          </div>
          <div className={styles.planitemContainer}>
            {planItems.length > 0 ? (
              planItems.map((planitem, index) => (
                <div className={styles.planitem} key={index}>
                  <div># {planitem.day}일차</div>
                  {planitem.contents.map((content, cindex) => (
                    <div className="planitemContents">
                      <div>{content.index}번째 : <strong>{content.title}</strong></div>
                      <div>{content.time}</div>
                      <div>{content.lat},{content.lng}</div>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <div className={styles.planitem}></div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}