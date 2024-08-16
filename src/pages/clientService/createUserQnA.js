import { PhotoCamera } from "@mui/icons-material";
import { Box, Button, Typography, TextField } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const CreateUserQnA = () => {
    const [reviewText, setReviewText] = useState('');
    const handleReviewTextChange = (event) => {
        setReviewText(event.target.value);
    };
    const handleSubmitReview = () => {
        // 여기에서 작성한 리뷰 텍스트와 첨부 파일을 DB로 보내는 로직을 추가합니다.
        console.log('리뷰 텍스트:', reviewText);
    };

    return (
        <>
            <Box 
                sx={{ 
                    textAlign: 'center', 
                    mb: 4, 
                    p: 2, 
                    backgroundImage: 'url(/images/Mask_group.png)', 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center', 
                    height: 200 
                }}
            >
                <Typography variant="h4" sx={{ color: '#fff', pt: 5 }}>
                    문의글 작성하기
                </Typography>
            </Box>

            <Box sx={{ mb: 2, textAlign: 'center' }}>
                <Typography variant="body1">
                    궁금한 사항이나 도움이 필요하시면 언제든지 문의글을 작성해 주세요. 저희 팀이 최대한 빠르게 답변드리겠습니다.
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TextField
                    fullWidth
                    multiline
                    minRows={4}
                    variant="outlined"
                    placeholder="문의글을 작성해 주세요"
                    value={reviewText}
                    onChange={handleReviewTextChange}
                    sx={{ flex: 1, mr: 2 }}
                />
            </Box>

            <NavLink to="/userQna">
                <button style={{ width: '150px', height:'40px', fontSize: '20px' }}>작성완료</button>
            </NavLink>
        </>
    );
};

export default CreateUserQnA;
