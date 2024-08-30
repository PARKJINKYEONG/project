import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Card, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tab, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from 'react-day-picker';
import styles from '../../styles/commentsSection.module.css';

const comments = [
  {
    id: 1,
    username: '뚝순이',
    content: '여행 어쩌고 좋다 어쩌고 저쩌고',
    date: '2024.1.3. 13:08',
    likes: 1,
    imageUrl: '/images/mypage.jpg', // 고양이 이미지 URL
    isReported: false,
  },
  {
    id: 2,
    username: '일일삼이',
    content: '여행 어쩌고 좋다 어쩌고 저쩌고',
    date: '2024.1.3. 16:18',
    likes: 1,
    imageUrl: '/images/notice.jpg', // 강아지 이미지 URL
    isReported: false,
  },
  {
    id: 3,
    username: '대명 설비',
    content: '여행 어쩌고 좋다 어쩌고 저쩌고',
    date: '2024.1.3. 16:53',
    likes: 1,
    imageUrl: '/images/notice.jpg', // 토끼 이미지 URL
    isReported: false,
  },
  {
    id: 4,
    username: '해바라기',
    content: '여행 어쩌고 좋다 어쩌고 저쩌고',
    date: '2024.1.3. 16:53',
    likes: 0,
    imageUrl: '/images/review.jpg', // 앵무새 이미지 URL
    isReported: false,
  },
];
const ReviewListView = () => { 
  const [value, setValue] = useState('1');
    const [selectedFile, setSelectedFile] = useState(null);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        // 신고 처리 로직을 여기에 추가
        console.log('신고가 접수되었습니다.');
        setOpen(false);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>                    
                    <Tab label="OO님의 리뷰" />
                    <IconButton color="red" onClick={handleClickOpen} sx={{ 
                    left: 960, 
                }}>
                        <ReportProblemOutlinedIcon />
                    </IconButton>
                    <Dialog open={open} onClose={handleClose} >
                        <DialogTitle>신고 확인</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                정말로 신고하시겠습니까?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} >
                                아니오
                            </Button>
                            <Button onClick={handleConfirm}  >
                                예
                            </Button>
                        </DialogActions>
                    </Dialog>                    
                </Box>
                <TabPanel value="1">
                    <Card sx={{ display: 'flex', marginBottom: 2 }}>
                        <CardMedia
                            component="img"
                            sx={{ width: 400,height: 400 }}
                            image="https://media.istockphoto.com/id/637816996/photo/stunning-spring-landscape-with-santa-maddalena-village-dolomites-italy-europe.jpg?s=612x612&w=0&k=20&c=otjIkFbRPpR2UDXlwTP-c1IVk4RPRGkuPkZOzKzUJVM=" // 예시 이미지 URL
                            alt="Jeju Island"
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography variant="subtitle1" component="div">
                                    여행 일정
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    24.06.10 ~ 24.06.15
                                </Typography>
                                <hr />
                                <Typography variant="subtitle1"  component="div">
                                    여행 장소
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    OOO
                                </Typography>
                                <hr />
                                <Typography variant="subtitle1" component="div">
                                    여행 후기 
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                작년에 산티아고 패키지 여행을 통해 참좋은여행사에 대해 처음 알았고, 경험을 하였습니다. 그때 경험이 괜찮다고 느껴, 올해 여행도 참좋은 여행사로 진행하려 했었고, 결정적으로는 이탈리아 여행을 찾고 있었는데 돌로미티가 포함된 상품이 있어서 였습니다. 베니스 In Out 아시아나 비행기를 이용한 비행편은 아주 좋았어요. 첫번째 여행지 베르나 부터 마지막 베니스까지 알찬 여행이었다고 생각됩니다. 이번 여행은 바다, 산, 예전 고대의 건물들 모두를 볼 수 있었는데, 바다는 소렌토의 절벽이 있는 바다, 카프리 섬의 청록색 바다가 인상깊었습니다. 산으로는 돌로미티였는데, 쉽게 볼 수 없는 광경이었습니다. 위를 보면 바위산이 보이고, 발아래는 넓은 풀 밭이 펼쳐져있습니다. 로마의 바티칸시국과 콜로세움, 발도르차의 사이플러스 나무가 생각나는데, 여행 복귀후에 글래디에이터를 다시 봤는데, 그 현장에 내가 있는 것 같은 생각이 들었고, 과거로 타임머신을 타고 막 다녀왔다는 느낌이 들었습니다. 이번 여행에 수고해 주신 가이드님 및 여행팀분들, 감사합니다^^
                                </Typography>
                            </CardContent>
                        </Box>
                    </Card>
                </TabPanel>                
            </TabContext>
          <div className={styles.commentsSection}>
            {comments.map(comment => (
              <div className={styles.comment} key={comment.id}>
                <div className={styles.profile}>
                  <img src={comment.imageUrl} alt="profile" />
                </div>
                <div className={styles.commentContent}>
                  <div className={styles.username}>{comment.username}</div>
                  <div className={styles.text}>{comment.content}</div>
                  <div className={styles.footer}>
                    <span className={styles.date}>{comment.date}</span>
                    <span className={styles.report} onClick={handleClickOpen}>신고</span>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>신고 확인</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                정말로 신고하시겠습니까?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                아니오
                            </Button>
                            <Button onClick={handleConfirm} color="primary" autoFocus>
                                예
                            </Button>
                        </DialogActions>
                    </Dialog>
                  </div>
                </div>
                <div className={styles.likeSection}>
                  <button className={styles.likeButton}>♡</button>
                  <span className={styles.likes}>{comment.likes}</span>
                </div>
              </div>
            ))}
            
          </div>
          <div className={styles.commentSection}>
            <div className={styles.userInfo}>
              <img src="https://via.placeholder.com/40" alt="user-profile" className={styles.profileImage} />
              <span>wjsrnr2014</span>
            </div>
            <div className={styles.commentWrite}>
              <textarea placeholder="블로그가 더 훈훈해지는 댓글 부탁드립니다. @별명을 입력하면 서로 이웃이 소환됩니다." className={styles.textarea}/>
              <div className={styles.commentActions}>
                <span>0/3000</span>
                <button>등록</button>
              </div>
            </div>
            <div className={styles.commentOptions}>
              <button>😊 스티커</button>
              <button>📷 사진</button>
              <button>🔗 소환</button>
              <button>🔒 비밀댓글</button>
            </div>
          </div>
        </Box>
    );
};

export default ReviewListView;
