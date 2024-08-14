import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useNavigate } from 'react-router-dom';

const MyReViewCreate = () => {
    const [value, setValue] = useState('1');
    const [reviewText, setReviewText] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleReviewTextChange = (event) => {
        setReviewText(event.target.value);
    };

    const handleSubmitReview = () => {
        // 여기에서 작성한 리뷰 텍스트와 첨부 파일을 DB로 보내는 로직을 추가합니다.
        console.log('리뷰 텍스트:', reviewText);
        console.log('첨부 파일:', selectedFile);
    };
    const handleEditReview = () => {
        navigate('/mypage/myreview',  { state: { tabValue: '2' } }); // '/create-review' 경로로 이동
    };
    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="작성 전 리뷰" value="1" />
                        <Tab label="내가 쓴 리뷰" value="2" onClick={handleEditReview}/>
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <Card sx={{ display: 'flex', marginBottom: 2 }}>
                        <CardMedia
                            component="img"
                            sx={{ width: 200 }}
                            image="https://via.placeholder.com/200" // 예시 이미지 URL
                            alt="Jeju Island"
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h5">
                                    제주도 여행
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    24.06.10 ~ 24.06.15
                                </Typography>
                            </CardContent>
                        </Box>
                    </Card>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <TextField
                            fullWidth
                            multiline
                            minRows={4}
                            variant="outlined"
                            placeholder="리뷰글을 작성해 주세요"
                            value={reviewText}
                            onChange={handleReviewTextChange}
                            sx={{ flex: 1, mr: 2 }}
                        />
                        <IconButton color="primary" component="label">
                            <input hidden accept="image/*" type="file" onChange={handleFileChange} />
                            <PhotoCamera />
                        </IconButton>
                    </Box>
                    <Button variant="contained" onClick={handleSubmitReview}>리뷰 쓰기</Button>
                </TabPanel>
                <TabPanel value="2">
                    {/* 여기에서 내가 쓴 리뷰 목록을 표시하는 로직을 추가합니다. */}
                    <Typography>내가 쓴 리뷰가 여기에 표시됩니다.</Typography>
                </TabPanel>
            </TabContext>
        </Box>
    );
}

export default MyReViewCreate;
