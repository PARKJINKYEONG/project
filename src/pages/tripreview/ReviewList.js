import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import '../../styles/TripReview.css';
import ScrollToTopButton from '../../components/scrollToTopButton';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';


const exampleReviews = [
  {
    id: 1,
    title: "[치앙마이/골프텔] #아티타야 C.C #무제한 골프 5일",
    author: "신**",
    date: "2024-08-02",
    package: "APG0760",
    itinerary: "동남아",
    content: `부부 골프 3박 5일 즐기기 골프장 상태 써비스 음식 모두 좋았습니다`,
    imageUrl: [
      'https://thai.monkeytravel.com/attach/product/MONKEY/202306/o_1h27nbv6i1kv716qi1nsjuv6tvjq.jpg?w=500&h=0',
      'https://cdn.imweb.me/thumbnail/20220510/fd58b78185ad9.png',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/0d/d9/dc/caption.jpg?w=800&h=-1&s=1'
    ]
  },
  {
    id: 2,
    title: "<8년만에 유럽 여행!! 박승호 인솔자님과 함께>",
    author: "고**",
    date: "2024-08-02",
    package: "https://via.placeholder.com/150", 
    itinerary: "유럽", 
    content: `이번에 8년만에 이모와 함께 유럽을 가게 되었습니다. 저는 대학교 2학년 학생입니다. 해외여행하면 유럽에 대한 로망이 있었기 때문에 가기 전부터 기대를 많이 했었어요!! 12일이라는 일정 동안 유럽의 도시와 멋진 자연까지 모두 보는 알찬 투어하고 왔습니다 ㅎㅎ 버스 이동시간이 길었는데 특히 대장 박승호 인솔자님께서 버스에서도 재밌게 잘 이끌어주시고 편하게 여행을 즐길 수 있도록 많이 도움을 주셔서 감사했습니다!! 가장 좋았던 순간을 하나만 정하기가 어려울 정도로 기억에 남는 순간이 많아요 맨 앞줄에서 봤고 그만큼 너무 벅찼던 비엔나 음악회, 천문 시계와 성당의 아름다움에 놀라웠던 프라하, 웅장한 국회의사당과 강이 함께 보이는 부다페스트의 야경, 언덕 위에서 내려다 보는 푸른 아드리안해와 두브로브니크의 아름다운 전망,,, 전부 잊지 못할 기억입니다 언제 다시 올지 모르는 먼 곳인데 참좋은 여행사를 통해서 그 국가의 특색있고 꼭 가봐야하는 많는 관광지들을 방문할 수 있어서 가장 좋았습니다 그리고 짐이 무거운데 관광 버스가 있어서 이동하기가 너무 편하고 수월했어요. 아울러 우리의 친구 폴란드 그레고리 기사님에도 감사를 드립니다. 12일 동안 다양한 곳들을 방문할 수 있어서 더욱 의미 깊은 시간이었습니다!! 일거수일투족 세심하게 살펴주셨던 박승호 인솔자님 그리고 함께 여행을 했던 22명의 패키지 여행객 분들 덕분에 더욱 완벽했던 여행이었음을 감사드립니다~!!`,
    imageUrl: [
      'https://www.agoda.com/wp-content/uploads/2020/01/Things-to-do-in-Dubrovnik-Picturesque-view-of-Dubrovnik.jpg',
      'https://thumb.tidesquare.com/tour/public/product/PRV3000304477/PRD3000739142/origin/6f4a4515-7870-47de-bdfb-75bda9db4515?type=wide',
      'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/24c98195-2ba2-4bb2-b7dc-44f48c34c914.jpeg',
      'https://pix10.agoda.net/hotelImages/118/118502/118502_15090914550035812514.jpg?ca=5&ce=1&s=414x232&ar=16x9',
      'https://thai.monkeytravel.com/attach/product/MONKEY/202306/o_1h27nbv6i1kv716qi1nsjuv6tvjq.jpg?w=500&h=0',
      'https://cdn.imweb.me/thumbnail/20220510/fd58b78185ad9.png',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/0d/d9/dc/caption.jpg?w=800&h=-1&s=1'
    ]
  },
  {
    id: 3,
    title: "과거로 다녀온 타임머신 여행",
    author: "정**",
    date: "2024-08-02",
    package: "EPP3737",
    itinerary: "유럽",
    content: `작년에 산티아고 패키지 여행을 통해 참좋은여행사에 대해 처음 알았고, 경험을 하였습니다. 그때 경험이 괜찮다고 느껴, 올해 여행도 참좋은 여행사로 진행하려 했었고,
결정적으로는 이탈리아 여행을 찾고 있었는데 돌로미티가 포함된 상품이 있어서 였습니다. 베니스 In Out 아시아나 비행기를 이용한 비행편은 아주 좋았어요.
첫번째 여행지 베르나 부터 마지막 베니스까지 알찬 여행이었다고 생각됩니다. 이번 여행은 바다, 산, 예전 고대의 건물들 모두를 볼 수 있었는데,
바다는 소렌토의 절벽이 있는 바다, 카프리 섬의 청록색 바다가 인상깊었습니다. 산으로는 돌로미티였는데, 쉽게 볼 수 없는 광경이었습니다.
위를 보면 바위산이 보이고, 발아래는 넓은 풀 밭이 펼쳐져있습니다. 로마의 바티칸시국과 콜로세움, 발도르차의 사이플러스 나무가 생각나는데,
여행 복귀후에 글래디에이터를 다시 봤는데, 그 현장에 내가 있는 것 같은 생각이 들었고, 과거로 타임머신을 타고 막 다녀왔다는
느낌이 들었습니다. 이번 여행에 수고해 주신 가이드님 및 여행팀분들, 감사합니다^^`,
    imageUrl: ['https://media.istockphoto.com/id/637816996/photo/stunning-spring-landscape-with-santa-maddalena-village-dolomites-italy-europe.jpg?s=612x612&w=0&k=20&c=otjIkFbRPpR2UDXlwTP-c1IVk4RPRGkuPkZOzKzUJVM=' 
    ]
  },
  {
    id: 4,
    title: "행복했던 스위스",
    author: "남**",
    date: "2024-08-02",
    package: "EPP3602",
    itinerary: "유럽",
    content: `김기남 인솔자님과 함께 스위스 패키지를 떠나게 되었습니다!
스위스는 하나하나가 그림이였고 힘든 일정도 아니였고 여유롭게 정말 즐겁게 여행했습니다! 인솔자님도 츤데레처럼 잘챙겨주시고 우리 가족 모두 너무 즐겁고 행복했습니다~ 호텔 컨디션과 음식 퀄리트에 신경을 많이 써주신것이 느껴질정도로 맛있도 편안한 잠자리를 보냈습니다!! 기회가 된다면 다시한번 또 가고싶습니다! 인솔자님 감사했습니다~
정말 너무너무 즐거웠습니다. 완전 추천입니다👍👍👍👍👍👍👍`,
    imageUrl: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-qhoQFFX4kcdUZa58ImoxLoAoP92aOXP2-g&s' 
    ]
  },
  {
    id: 5,
    title: "장가계는 김철 가이드님으로",
    author: "유**",
    date: "2024-08-02",
    package: "CPP163",
    itinerary: "중국",
    content: `김철 가이드님의 덕분에 더운 날인데도 불구하고 멋지고 편한 여행이었습니다 여행원들을 배려하여 적절하게 스케쥴 조절을 잘 해주셨을뿐만아니라 맛난 음식, 편한숙소로 5박6일동안 행복한 여행이었습니다.김철 가이드님 감사합니다`,
    imageUrl: ['https://lh5.googleusercontent.com/p/AF1QipPPG3KpDG47IisASL6sMpFeMUixHzpn42fO8V1M=w540-h312-n-k-no' 
    ]
  },
  {
    id: 6,
    title: "좋은 분들과 '같이' 했기에 더욱 '가치' 있었던 <스위스 여행>(주덕근 가이사님 감사합니다!)",
    author: "박**",
    date: "2024-08-02",
    package: "EPP3600",
    itinerary: "유럽",
    content: `첫 유럽 여행지로 선택한 스위스!

설렘과 기대감으로 시작한 여행은 아름다움과 경이로움의 연속이었습니다. 아직도 스위스의 정경이 눈에 아른거립니다. 아주 오랜만의 패키지 여행이라 걱정도 있었지만, 따뜻한 리더십을 가진 '주덕근' 가이드님의 배려 속에서 좋은 분들과 함께 추억을 쌓을 수 있어 자유여행과 다른 특별한 경험을 할 수 있었습니다(함께 하신 분들 벌써 보고 싶네요).

체르마트(마테호른), 융프라우 요흐의 웅장함에 압도되었고 안개 낀 리기산마저도 인상깊었으며, 방문했던 도시들도 각자의 풍경들이 참 인상적이었습니다(취리히의 린덴호프, 베른의 시계탑 거리, 몽트뢰의 시옹성, 인터라켄, 루체른의 카펠교, 마이언 펠트의 하이디 마을과 아펜첼 등).

저는 특히 로이커바트에서의 온천 체험과 유럽풍 숙소 그리고, 장크트갈렌의 대성당과 물터가세, 그리고 유럽에서 가장 아름답다는 도서관은 개인적으로 참 좋았습니다.

스위스는 차량으로 이동할 때 창밖의 풍경마저도 너무 아름다워 잠깐이라도 눈을 붙일 수가 없었습니다!  더불어 이 여행을 더욱 빛내 주신 주덕근 가이드님께 다시 한 번 감사의 말씀을 드리고 싶습니다. 

여행 전부터 준비사항에 대해 친절하게 안내해 주시고, 직접 전화까지 해주셔서 여행을 준비하는데 큰 도움이 되었습니다. 또한  여행 내내 차분한 목소리로 일정과 시간, 식사와 숙소에 대해 안내해 주시고, 각 방마다 오셔서 불편한 점 체크해 주셔서 감사했습니다.

또한 아름다운 풍경과 융프라우만 생각하고 왔던 저에게 스위스의 역사와 지형적 특징, 각 도시의 변천사 등을 세심하게 설명해 주셔서 더 많은 것을 느끼게 되는 여행이었습니다(아는 만큼 더 보이는 여행이었다고 할까요?^^) 

그리고 이동할 때마다 '엘비스 주'가 되어 샹송, 팝, 칸초네, 재즈 등 다양한 장르의 음악을 엄선해서 들려주셔서 참 행복했습니다. 음악 덕분인지 스위스의 풍경이 매일 다르게, 더욱 의미있게 다가오더군요!

곡을 설명해 주시는 '엘비스 주'의 목소리마저도 아름다워서 음악처럼 느껴졌습니다. 언젠가... 다음 여행지에서도 함께 하는 행운이 오길 바랍니다.

취리히 성모교회 앞 광장에서 마셨던 카푸치노, 로이커바트 쿱에서 사서 먹었던 납작 복숭아, 아펜첼에서 마셨던 흑맥주...... 이 아름다운 추억을 되새기며 일상에서의 삶도 행복하게 꾸려가고자 합니다.

주덕근 가이드님과 함께 여행했던 모든 분들! 감사드리며, 늘 건강하시길 바랍니다^^`,
    imageUrl: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFRAMKbRvS31uX2MkgwS_gK7o6RdhyvYVNbQ&s'
    ]
  }
];

const ReviewList = () => {
  const [tripReviews, setTripReviews] = useState(exampleReviews);
  const [searchFilters, setSearchFilters] = useState({
    title: '',
    author: '',
    content: '',
    itinerary: ''
  });
  const [selectedFilter, setSelectedFilter] = useState('title');
  const [expandedReviewIds, setExpandedReviewIds] = useState(new Set());
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentDisplayedImageIndexes, setCurrentDisplayedImageIndexes] = useState({});
  const [currentThumbnailPageIndexes, setCurrentThumbnailPageIndexes] = useState({});
  const [totalPages, setTotalPages] = useState(0);

  const THUMBNAILS_PER_PAGE = 3;
  const MAX_LENGTH = 100;

  useEffect(() => {
    filterReviews();
  }, [searchFilters]);


  useEffect(() => {
    const totalImages = tripReviews.flatMap(review => review.imageUrl).length;
    setTotalPages(Math.ceil(totalImages / THUMBNAILS_PER_PAGE));
  }, [tripReviews]);

  useEffect(() => {
    setCurrentDisplayedImageIndexes(prev => {
      const newIndexes = {};
      tripReviews.forEach(review => {
        if (review.imageUrl.length > 0) {
          newIndexes[review.id] = 0;
        }
      });
      return { ...prev, ...newIndexes };
    });
    setCurrentThumbnailPageIndexes(prev => {
      const newPages = {};
      tripReviews.forEach(review => {
        if (review.imageUrl.length > 0) {
          newPages[review.id] = 0;
        }
      });
      return { ...prev, ...newPages };
    });
  }, [tripReviews]);

  const handleFilterChange = (event) => {
    setSearchFilters({
      ...searchFilters,
      [selectedFilter]: event.target.value
    });
  };

  const filterReviews = () => {
    const filteredReviews = exampleReviews.filter(review =>
      (searchFilters.title === '' || review.title.includes(searchFilters.title)) &&
      (searchFilters.author === '' || review.author.includes(searchFilters.author)) &&
      (searchFilters.content === '' || review.content.includes(searchFilters.content)) &&
      (searchFilters.itinerary === '' || review.itinerary.includes(searchFilters.itinerary))
    );
    setTripReviews(filteredReviews);
  };

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    setSearchFilters({
      title: '',
      author: '',
      content: '',
      itinerary: ''
    });
    setDropdownOpen(false);
  };


  const handleNextImage = (id) => {
    setCurrentDisplayedImageIndexes(prev => {
      const images = tripReviews.find(review => review.id === id)?.imageUrl || [];
      const newIndex = (prev[id] ?? 0) + 1 < images.length ? (prev[id] ?? 0) + 1 : 0;
      const currentPage = Math.floor(newIndex / THUMBNAILS_PER_PAGE);
      setCurrentThumbnailPageIndexes(prev => ({
        ...prev,
        [id]: currentPage,
      }));
      return {
        ...prev,
        [id]: newIndex,
      };
    });
  };

  const handlePrevImage = (id) => {
    setCurrentDisplayedImageIndexes(prev => {
      const images = tripReviews.find(review => review.id === id)?.imageUrl || [];
      const newIndex = (prev[id] ?? 0) - 1 < 0 ? images.length - 1 : (prev[id] ?? 0) - 1;
      const currentPage = Math.floor(newIndex / THUMBNAILS_PER_PAGE);
      setCurrentThumbnailPageIndexes(prev => ({
        ...prev,
        [id]: currentPage,
      }));
      return {
        ...prev,
        [id]: newIndex,
      };
    });
  };

  const handleThumbnailClick = (id, index) => {
    setCurrentDisplayedImageIndexes(prev => ({
      ...prev,
      [id]: index,
    }));
  };

  const handleExpandToggle = (id) => {
    setExpandedReviewIds(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(id)) {
        newExpanded.delete(id);
      } else {
        newExpanded.add(id);
      }
      return newExpanded;
    });
  };

  const getCurrentPageImages = (id) => {
    const images = tripReviews.find(review => review.id === id)?.imageUrl || [];
    const startIndex = currentThumbnailPageIndexes[id] * THUMBNAILS_PER_PAGE;
    const endIndex = startIndex + THUMBNAILS_PER_PAGE;
    return images.slice(startIndex, endIndex);
  };

  return (
    <>
      <div className="container my-5" style={{ paddingTop: '10px', paddingBottom: '10px' }}>
        <div className="table-header my-4">
          <h1>여행 후기 목록</h1>
          <div className="search-container">
            <div className="filter-container">
              <button className="filter-button my-4" onClick={toggleDropdown}>
                {selectedFilter === 'title' ? '제목' : selectedFilter === 'author' ? '작성자' : selectedFilter === 'content' ? '후기' : '일정'}
              </button>
              <div className={`filter-dropdown ${dropdownOpen ? 'show' : ''}`}>
                <label>
                  <input
                    type="radio"
                    name="filter"
                    value="title"
                    checked={selectedFilter === 'title'}
                    onChange={() => handleFilterSelect('title')}
                  />
                  제목
                </label>
                <label>
                  <input
                    type="radio"
                    name="filter"
                    value="author"
                    checked={selectedFilter === 'author'}
                    onChange={() => handleFilterSelect('author')}
                  />
                  작성자
                </label>
                <label>
                  <input
                    type="radio"
                    name="filter"
                    value="content"
                    checked={selectedFilter === 'content'}
                    onChange={() => handleFilterSelect('content')}
                  />
                  후기
                </label>
                <label>
                  <input
                    type="radio"
                    name="filter"
                    value="itinerary"
                    checked={selectedFilter === 'itinerary'}
                    onChange={() => handleFilterSelect('itinerary')}
                  />
                  일정
                </label>
              </div>
            </div>
            <input
              type="text"
              value={searchFilters[selectedFilter]}
              onChange={handleFilterChange}
              placeholder="검색어를 입력하세요"
            />
            <button type="button" onClick={filterReviews}>검색</button>
          </div>
          <Typography variant="subtitle1" align="right" color="black">
            후기: 총 {tripReviews.length}건
          </Typography>
        </div>

        <List sx={{ width: '100%' }}>
          {tripReviews.length > 0 ? (
            tripReviews.map(review => {
              const images = review.imageUrl || [];
              const currentImageIndex = currentDisplayedImageIndexes[review.id] ?? 0;
              const currentThumbnails = getCurrentPageImages(review.id);

              return (
                <div className={`review-item ${expandedReviewIds.has(review.id) ? 'expanded' : ''}`} key={review.id}>
                  <div className="image-container">
                    {images.length > 0 ? (
                      <>
                        <img src={images[currentImageIndex]} alt={review.title} className="review-image" />
                        <div className="image-navigation">
                          <button onClick={() => handlePrevImage(review.id)} disabled={images.length <= 1}>◀</button>
                          <div className="thumbnails">
                            {currentThumbnails.map((image, index) => (
                              <img
                                key={index}
                                src={image}
                                alt={`Thumbnail ${index + 1}`}
                                className={`thumbnail-image ${currentImageIndex === (currentThumbnailPageIndexes[review.id] ?? 0) * THUMBNAILS_PER_PAGE + index ? 'active' : ''}`}
                                onClick={() => handleThumbnailClick(review.id, (currentThumbnailPageIndexes[review.id] ?? 0) * THUMBNAILS_PER_PAGE + index)}
                              />
                            ))}
                          </div>
                          <button onClick={() => handleNextImage(review.id)} disabled={images.length <= 1}>▶</button>
                        </div>
                        
                      </>
                    ) : (
                      <div className="no-image">이미지가 없습니다.</div>
                    )}
                  </div>
                  <div className={`review-content ${expandedReviewIds.has(review.id) ? 'expanded' : ''}`}>
                    <div className="review-header">
                      <div className="review-title">{review.title}</div>
                      <div className="review-author">{review.author}</div>
                    </div>
                    <div className="review-body">
                      {expandedReviewIds.has(review.id) ? (
                        <>
                          <div className="review-itinerary">
                            <strong>일정:</strong> {review.itinerary}
                          </div>
                          {review.content}
                        </>
                      ) : (
                        <>
                        <Stack spacing={1}>
                          <Rating name="half-rating" defaultValue={4.4} precision={0.1} readOnly/>
                        </Stack>
                          <div className="review-itinerary">
                            <strong>일정:</strong> {review.itinerary.length > MAX_LENGTH ? `${review.itinerary.substring(0, MAX_LENGTH)}...` : review.itinerary}
                          </div>
                          {review.content.length > MAX_LENGTH ? `${review.content.substring(0, MAX_LENGTH)}...` : review.content}
                        </>
                      )}
                    </div>
                    <div className="review-actions">
                      <Button onClick={() => handleExpandToggle(review.id)}>
                        {expandedReviewIds.has(review.id) ? '접기' : '더 보기'}
                      </Button>
                      <Link to={`/EditReview/${review.id}`}>
                        <Button>편집</Button>
                      </Link>
                    </div>
                    <div className="review-date">{review.date}</div>
                  </div>
                </div>
              );
            })
          ) : (
            <Typography variant="body1" color="black">
              리뷰가 없습니다.
            </Typography>
          )}
        </List>

        <div className="fixed-button">
          <Link to="/CreateReview">후기 작성하기</Link>
        </div>
        <ScrollToTopButton />
      </div>
    </>
  );
};

export default ReviewList;