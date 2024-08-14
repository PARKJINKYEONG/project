import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from "react";
import MyReViewEdit from './myReViewEdit';
import MyReViewCreate from './myReViewCreate';
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const MyReview = ()=>{
    const location = useLocation();
    const [value, setValue] = useState(
        location.state?.tabValue === '1' || location.state?.tabValue === '2'
            ? location.state.tabValue
            : '1' // 기본값은 '1'
    );
    

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    
    // 예시 여행 데이터
    const trips = [
        {
            title: '제주도 여행',
            date: '24.06.10 ~ 24.06.15',
            imageUrl: 'jeju-image-url', // 실제 이미지 URL로 대체하세요
        },
        {
            title: '부산 여행',
            date: '24.08.24 ~ 24.08.31',
            imageUrl: 'busan-image-url',
        },
        {
            title: '삿포로 여행',
            date: '24.11.11 ~ 24.11.21',
            imageUrl: 'sapporo-image-url',
        }
    ];

    const navigate = useNavigate();

    const handleCreateReview = () => {
        navigate('/mypage/create-review'); // '/create-review' 경로로 이동
    };

    const handleEditReview = () => {
        navigate('/mypage/edit-review'); // '/create-review' 경로로 이동
    };
    return <>
    <div>
        <div>
        <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="작성 전 리뷰" value="1" />
                <Tab label="내가 쓴 리뷰" value="2" />
            </TabList>
            </Box>
            <TabPanel value="1">
                        {/* 여행 목록을 표시하는 부분 */}
                        {trips.map((trip, index) => (
                            <Card key={index} sx={{ display: 'flex', marginBottom: 2 }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 151 }}
                                    image={trip.imageUrl}
                                    alt={`${trip.title} 이미지`}
                                />
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Typography component="div" variant="h5">
                                            {trip.title}
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary" component="div">
                                            {trip.date}
                                        </Typography>
                                    </CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                        <Button variant="outlined" onClick={handleCreateReview}>리뷰 쓰기</Button>
                                    </Box>
                                </Box>
                            </Card>
                        ))}
                    </TabPanel>
                    <TabPanel value="2">
                         {/* 여행 목록을 표시하는 부분 */}
                         {trips.map((trip, index) => (
                            <Card key={index} sx={{ display: 'flex', marginBottom: 2 }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 151 }}
                                    image={trip.imageUrl}
                                    alt={`${trip.title} 이미지`}
                                />
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Typography component="div" variant="h5">
                                            {trip.title}
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary" component="div">
                                            {trip.date}
                                        </Typography>
                                    </CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                        <Button variant="outlined" sx={{ mr: 1 }} onClick={handleEditReview}>수정</Button>
                                        <Button variant="outlined">삭제</Button>
                                    </Box>
                                </Box>
                            </Card>
                        ))}
                    </TabPanel>
        </TabContext>
        </Box>
        </div>

    </div>
    </>
}
export default MyReview;