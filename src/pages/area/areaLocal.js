import React from 'react';
import './AreaLocal.module.css';

const AreaLocal = () => {
    const results = [
        { title: "서울 암사동 유적", location: "서울 강동구", description: "우리나라 선사시대를 대표하는 최대의 집단 취락지", tags: "#가족여행 #관광지 #교과서속여행 #당일치기여행 #서울근교여행", img: "image-url-1" },
        { title: "탄천민물고기습지생태원", location: "경기 성남시", description: "생태환경을 지켜주는 습지공원", tags: "#관광지 #민물생태습지 #탄천민물고기습지생태원", img: "image-url-2" },
        { title: "고양대덕생태공원", location: "경기 고양시", description: "행운 민속 선생 관련 생태공원", tags: "#공원 #관광지 #산책하기좋은곳 #고양관광지 #힐링&휴양여행", img: "image-url-3" },
        { title: "조엄기념관", location: "강원 원주시", description: "우리나라 고구마를 들여온 조엄 선생의 삶과 유익한 자료를 한눈에", tags: "#문화시설", img: "image-url-4" },
        { title: "모던화랑", location: "서울 종로구", description: "원로 중진 작가 전문 갤러리", tags: "#문화시설", img: "image-url-5" }
    ];

    const hashtags = [
        "#전체", "#서울", "#부산", "#대구", "#인천", "#광주", "#대전", "#울산",
        "#세종", "#경기", "#강원", "#충북", "#충남", "#경북", "#경남", "#전북",
        "#전남", "#제주", "#자연", "#관광지", "#문화시설", "#레포츠", "#역사",
        "#체험", "#숙박", "#실내여행지", "#음식", "#드라이브코스", "#트레킹",
        "#이색체험", "#쇼핑", "#봄꽃여행", "#봄나들이", "#전통시장", "#한국관광품질인증",
        "#한국관광의별", "#한국관광100선", "#열린관광 모두의 여행", "#관광두레", "#산업관광", "#생태녹색관광"
    ];

    return (
        <div className="results-page">
            <div className="results-list">
                <h1>#전체</h1>
                <p>총 39,178건</p>
                <div className="filters">
                    <button>최신순</button>
                    <button>거리순</button>
                    <button>인기순</button>
                </div>
                <div className="result-items">
                    {results.map((result, index) => (
                        <div className="result-item" key={index}>
                            <img src={result.img} alt={result.title} />
                            <div className="result-details">
                                <h3>{result.title}</h3>
                                <p>{result.location}</p>
                                <p>{result.description}</p>
                                <p className="tags">{result.tags}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="hashtags">
                <div className="hashtag-list">
                    {hashtags.map((tag, index) => (
                        <span key={index} className="hashtag">{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}


export default AreaLocal;
