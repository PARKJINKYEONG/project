import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import QnAstyle from '../../styles/userQna.module.css';
import { useNavigate } from 'react-router-dom';

const Ecrm = () => {
    const [open, setOpen] = useState(true); // 페이지 로드 시 모달이 열리도록 설정
    const [resultMessage, setResultMessage] = useState(''); // 결과 메시지 상태 관리
    const [reportType, setReportType] = useState(''); // 드롭다운에서 선택된 신고 유형

    const handleClose = () => {
        setOpen(false); // 모달 창 닫기
    };

    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleQNAClick = () => {
        navigate('/userQna'); // QNA 페이지로 이동
    };
    
    const handleFAQClick = () => {
        navigate('/userFaq'); // FAQ 페이지로 이동
    };

    const handleSubmit = () => {
        if (!reportType) {
            alert('신고 유형을 선택해 주세요.');
            return;
        }
        setResultMessage(`신고가 접수되었습니다. 신고 유형: ${reportType}`);
        setOpen(false);
    };

    const handleCancel = () => {
        setResultMessage('신고 접수가 취소되었습니다.');
        setOpen(false);
    };

    return (
        <>
            <div className="ecrm-container">
                <div className={`text-center ${QnAstyle.headerImage}`}>
                    <img src="/images/Mask_group.png" alt="Header" className="header-image" />
                </div>
                <div className="menu" style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ flex: 1 }}>
                        <button onClick={handleQNAClick}>Q&A</button>
                        <button onClick={handleFAQClick}>FAQ</button>
                        <button onClick={() => setOpen(true)}>신고접수</button>
                    </div>
                    <div>
                        <input 
                            type="text" 
                            placeholder="검색" 
                            style={{ width: '800px', height: '45px' }} 
                        />
                        <button>검색</button>
                    </div>
                </div>
                <div className="qna-section">
                    <h2>신고접수</h2>
                    {resultMessage && (
                        <Typography variant="h6" color="primary" gutterBottom>
                            {resultMessage}
                        </Typography>
                    )}
                </div>
            </div>

            {/* 신고 접수 모달 창 */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>신고 접수</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        아래에 신고할 내용을 입력해 주세요. 최대한 신속하게 처리하겠습니다.
                    </DialogContentText>
                    
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="report-type-label">신고 유형</InputLabel>
                        <Select
                            labelId="report-type-label"
                            id="report-type"
                            value={reportType}
                            onChange={(e) => setReportType(e.target.value)}
                            label="신고 유형"
                        >
                            <MenuItem value="댓글 신고">댓글 신고</MenuItem>
                            <MenuItem value="게시글 신고">게시글 신고</MenuItem>
                            <MenuItem value="불편 사항">불편 사항</MenuItem>
                            <MenuItem value="기타 신고">기타 신고</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="report"
                        label="신고 내용"
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="secondary">
                        취소
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        제출
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Ecrm;
