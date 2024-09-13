import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Box, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField, Typography } from '@mui/material';
import { useState, useCallback } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from 'react-day-picker';
import styles from '../../styles/commentsSection.module.css';
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';

const comments = [
  {
    id: 1,
    username: '뚝순이',
    content: '여행 어쩌고 좋다 어쩌고 저쩌고',
    date: '2024.1.3. 13:08',
    likes: 1,
    imageUrl: '/images/mypage.jpg',
    isReported: false,
    locations:{
      day1:[
        { lat: 37.5665, lng: 126.9780 }, // 서울시청
        { lat: 37.5512, lng: 126.9882 }, // 남산타워
        { lat: 37.5796, lng: 126.9770 }, // 경복궁
      ],
      day2: [
        { lat: 37.5143, lng: 126.9800 }, // 한강공원
        { lat: 37.5600, lng: 126.9940 }, // 명동
      ] 
    }   
  },
  {
    id: 2,
    username: '일일삼이',
    content: '여행 어쩌고 좋다 어쩌고 저쩌고',
    date: '2024.1.3. 16:18',
    likes: 1,
    imageUrl: '/images/notice.jpg',
    isReported: false,
    locations:{
      day1:[
        { lat: 37.5665, lng: 126.9780 }, // 서울시청
        { lat: 37.5512, lng: 126.9882 }, // 남산타워
      ],
      day2:[
        { lat: 37.5796, lng: 126.9770 }, // 경복궁
        { lat: 37.5600, lng: 126.9940 }, // 명동
      ]
    }
  },
  {
    id: 3,
    username: '대명 설비',
    content: '여행 어쩌고 좋다 어쩌고 저쩌고',
    date: '2024.1.3. 16:53',
    likes: 1,
    imageUrl: '/images/notice.jpg',
    isReported: false,
    locations:{
      day1:[
        { lat: 37.5585, lng: 126.9719, label: '출발' }, // 서울역
        { lat: 37.5665, lng: 126.9780, label: '경유' }, // 서울시청
        { lat: 37.5512, lng: 126.9882, label: '도착' } // 남산타워
      ],
      day2: [
        { lat: 37.5110, lng: 127.0980, label: '출발' }, // 코엑스
        { lat: 37.5600, lng: 126.9940, label: '경유' }, // 명동
        { lat: 37.5143, lng: 126.9800, label: '도착' } // 한강공원
        
        
      ]
    }   
  },
  {
    id: 4,
    username: '해바라기',
    content: '여행 어쩌고 좋다 어쩌고 저쩌고',
    date: '2024.1.3. 16:53',
    likes: 0,
    imageUrl: '/images/review.jpg',
    isReported: false,
    locations:{
      day1:[
        { lat: 37.5585, lng: 126.9719, label: '출발' }, // 서울역
        { lat: 37.5600, lng: 126.9940, label: '경유' }, // 명동
        { lat: 37.5143, lng: 126.9800, label: '도착' } // 한강공원
      ],
      day2: [
        { lat: 37.5110, lng: 127.0980, label: '출발' }, // 코엑스
        { lat: 37.5796, lng: 126.9770, label: '경유' }, // 경복궁
        { lat: 37.5349, lng: 127.0012, label: '도착' }, // 이태원
        
        
      ]
    }   
  },
];

const locations = {
  day1: [
    { lat: 37.5665, lng: 126.9780, label: '출발' }, // 서울시청
    { lat: 37.5512, lng: 126.9882, label: '경유' }, // 남산타워
    { lat: 37.5796, lng: 126.9770, label: '도착' }, // 경복궁
  ],
  day2: [
    { lat: 37.5143, lng: 126.9800, label: '출발' }, // 한강공원
    { lat: 37.5600, lng: 126.9940, label: '경유' }, // 명동
    { lat: 37.5110, lng: 127.0980, label: '도착' }, // 코엑스
  ],
  day3: [
    { lat: 37.5585, lng: 126.9719, label: '출발' }, // 서울역
    { lat: 37.5700, lng: 126.9824, label: '경유' }, // 명동성당
    { lat: 37.5349, lng: 127.0012, label: '도착' }, // 이태원
  ]
};

const markerSrc = [
  "/images/map/marker_red.png", //red: E9382D
  "/images/map/marker_yellow.png", //yellow: FFC700
  "/images/map/marker_green.png", //green: 3EED00
  "/images/map/marker_skyblue.png", //skyblue: 29CCFF
  "/images/map/marker_blue.png", //blue: 0057FF
  "/images/map/marker_violet.png", //violet: A93AFF
  "/images/map/marker_pink.png", //pink: FF00C7
];

const ReviewListView = () => {
  const [open, setOpen] = useState(false);
  const [openRoute, setOpenRoute] = useState(null);
  const [mapKey, setMapKey] = useState(0);
  const [mapCenter, setMapCenter] = useState({ lat: 37.5665, lng: 126.9780 });
  const [newComment, setNewComment] = useState('');
  const [commentList, setCommentList] = useState(comments);

  const calculateCenter = (locations) => {
    if (locations.length === 0) return { lat: 37.5665, lng: 126.9780 };

    const latitudes = locations.map(location => location.lat);
    const longitudes = locations.map(location => location.lng);

    const centerLat = (Math.max(...latitudes) + Math.min(...latitudes)) / 2;
    const centerLng = (Math.max(...longitudes) + Math.min(...longitudes)) / 2;

    return { lat: centerLat, lng: centerLng };
  };

  const handleClickOpen = useCallback((commentId, locations) => {
    if (openRoute !== commentId) {
      setMapCenter(calculateCenter(locations));
      setMapKey(prevKey => prevKey + 1);  // Trigger map re-render
    }
    setOpenRoute(openRoute === commentId ? null : commentId);
  }, [openRoute]);

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    console.log('신고가 접수되었습니다.');
    setOpen(false);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      setCommentList([
        ...commentList,
        {
          id: commentList.length + 1,
          username: 'New User',
          content: newComment,
          date: new Date().toISOString().slice(0, 19).replace('T', ' '),
          likes: 0,
          imageUrl: '/images/default-profile.jpg',
          isReported: false,
        }
      ]);
      setNewComment('');
    }
  };

  const mapOptions = {
    zoom: 12,
    center: mapCenter,
  };

  const renderMarkersAndPolyline = (locations, color) => {
    return (
      <>
        {locations.map((location, index) => (
          <Marker
            key={index}
            position={location}
            icon={color}
            label={location.label}
          />
        ))}
        <Polyline
          path={locations}
          options={{
            strokeColor: '#FF9431',
            strokeOpacity: 0.7,
            strokeWeight: 5,
          }}
        />
      </>
    );
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <Box className={styles.reviewBox}>
        <Box sx={{ padding: 2, position: 'relative' }}>
          <Typography variant="h2" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            추억이 가득한 서울 여행
            <IconButton>
              <DeleteOutlineIcon />
            </IconButton>
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fimage.freepik.com%2Ffree-icon%2Fuser-male-shape-in-a-circle--ios-7-interface-symbol_318-39025.jpg&type=sc960_832"
              alt="Profile"
              style={{ height: '50px', borderRadius: '50%', marginRight: '10px', marginLeft: '10px' }}
            />
            <Box sx={{ display: 'flex' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '2px', marginLeft: '20px', fontSize: '30px' }}>트레블조이</Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginLeft: '50px', fontSize: '30px' }}>2024.1.3</Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <CardMedia
            component="img"
            sx={{ width: 400, height: 400, marginRight: 3, marginLeft: 3 }}
            image="https://50plus.or.kr/upload/im/2020/07/b8a92503-f34a-4aff-99dd-546fa06c47cc.jpg"
            alt="여행 사진"
          />
          <Box sx={{ flex: 1, height: 400, display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: 5 }}>
            <LoadScript googleMapsApiKey="AIzaSyB-COY1Ryjaa2wILZqfl5UoS2WltfYD3Hc" key={mapKey}>
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                options={{ ...mapOptions, center: calculateCenter(Object.values(locations).flat()) }}
              >
                {Object.keys(locations).map((dayKey) => renderMarkersAndPolyline(locations[dayKey], markerSrc[Object.keys(locations).indexOf(dayKey) % markerSrc.length]))}
              </GoogleMap>
            </LoadScript>
          </Box>
        </Box>

        <CardContent sx={{ paddingTop: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', marginLeft: 3, marginTop: 3, marginBottom: 2 }}>여행 후기</Typography>
          <Typography variant="h6" color="text.secondary" sx={{ marginLeft: 3, marginRight: 3 }}>
          서울 여행은 정말 잊을 수 없는 경험이었어요. 첫 번째로 방문한 서울시청은 서울의 중심부에 위치해, 도시의 활기와 역사적 배경이 잘 어우러진 곳이었어요. 주변에 위치한 광장에서 시민들이 여유롭게 시간을 보내는 모습을 보며 도심 속 평화를 느낄 수 있었습니다. 다음으로 간 남산타워에서는 서울 전경이 한눈에 내려다보였는데, 특히 밤에 보는 야경이 정말 아름다웠습니다. 도시의 불빛들이 한강을 따라 반짝이는 모습이 인상 깊었어요. 이어서 방문한 경복궁은 조선 시대의 웅장함을 느낄 수 있는 곳이었고, 궁궐을 걸으며 한국의 전통을 느끼기에 충분했어요. 고요하고 장엄한 궁궐의 분위기 속에서 과거와 현재가 공존하는 느낌이 들었습니다. 한강공원에서는 강변을 따라 산책하며 서울의 자연을 즐길 수 있었고, 바쁜 도시 생활 속에서도 이렇게 여유를 찾을 수 있다는 점이 좋았어요. 마지막으로 방문한 명동에서는 다양한 맛집과 쇼핑 명소를 둘러보며 여행의 마지막을 즐겼습니다. 이번 서울 여행은 도심 속에서 문화, 자연, 그리고 현대적인 풍경을 모두 경험할 수 있었던 멋진 시간이었습니다.
          </Typography>
        </CardContent>
      </Box>

      <hr className={styles.divider} />
      <div className={styles.commentsSection}>
        {commentList.map((comment) => (
          <div className={styles.comment} key={comment.id} style={{ position: 'relative' }}>
            <div className={styles.commentContent}>
              <div className={styles.profileAndUsername}>
                <div className={styles.profile}>
                  <img src={comment.imageUrl} alt="profile" />
                </div>
                <div className={styles.username}>{comment.username}</div>
              </div>
              <div className={styles.text}>{comment.content}</div>
              <div className={styles.date}>{comment.date}</div>

              <div className={styles.toggleButtonContainer}>
                <IconButton
                  onClick={() => handleClickOpen(comment.id, Object.values(comment.locations || {}).flat())}
                  sx={{
                    transform: openRoute === comment.id ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s',
                  }}
                >
                  <ExpandMoreIcon />
                </IconButton>
              </div>

              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>신고 확인</DialogTitle>
                <DialogContent>
                  <DialogContentText>정말로 신고하시겠습니까?</DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>아니오</Button>
                  <Button onClick={handleConfirm}>예</Button>
                </DialogActions>
              </Dialog>

              {openRoute === comment.id && comment.locations && (
                <Box className={styles.mapContainer}>
                  <LoadScript googleMapsApiKey="AIzaSyB-COY1Ryjaa2wILZqfl5UoS2WltfYD3Hc" key={mapKey}>
                    <GoogleMap
                      mapContainerStyle={{ width: '60%', height: '400px' }}
                      options={{ ...mapOptions, center: calculateCenter(Object.values(comment.locations).flat()) }}
                    >
                      {Object.keys(comment.locations).map((dayKey) => renderMarkersAndPolyline(comment.locations[dayKey], markerSrc[Object.keys(locations).indexOf(dayKey) % markerSrc.length]))}
                    </GoogleMap>
                  </LoadScript>
                </Box>
              )}
            </div>

            <div className={styles.likeSection}>
              <IconButton className={styles.likeButton}>♡</IconButton>
              <span className={styles.likes}>{comment.likes}</span>
              <IconButton onClick={handleDialogOpen} className={styles.reportButton}>
                <ReportProblemOutlinedIcon />
              </IconButton>
            </div>
          </div>
        ))}
      </div>

      <Box className={styles.comment}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>댓글 작성하기</Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          placeholder="댓글을 작성하세요..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddComment}
        >
          댓글 추가
        </Button>
      </Box>
    </Box>
  );
};

export default ReviewListView;