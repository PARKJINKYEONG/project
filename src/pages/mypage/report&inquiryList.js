import React, { useState } from 'react';
import { Paper, Button, Typography } from '@mui/material';
import TableSection from '../../components/tableSection';
import TextField_ from '../../components/textField';
import { useNavigate } from 'react-router-dom';
import MuiModal from '../../components/muiModal';
import ScrollToTopButton from '../../components/scrollToTopButton';  // ScrollToTopButton 컴포넌트 추가

const initialReports = [
  { id: 1, reportedUser: 'jay5693', reason: '욕설', date: '2024-08-01', handleReport: 'O', handleReportdate: '2024-08-03', judgement: '1주정지' },
  { id: 2, reportedUser: 'yjs', reason: '스팸광고', date: '2024-08-02', handleReport: 'X' },
  { id: 3, reportedUser: 'sjd', reason: '계정도용', date: '2024-08-03', handleReport: 'O', handleReportdate: '2024-08-05', judgement: '영구정지' },
];

const initialInquiries = [
  { id: 1, inquiry: '로그인 문제', inquiryContent: '로그인할 수 없습니다.', answer: '비밀번호를 재설정해 보세요.', date: '2024-08-01', handleInquiry: 'O', handleInquiryDate: '2024-08-02' },
  { id: 2, inquiry: '비밀번호 재설정', inquiryContent: '비밀번호를 잊어버렸습니다.', answer: '비밀번호 재설정 링크를 보내드렸습니다.', date: '2024-08-02', handleInquiry: 'X' },
  { id: 3, inquiry: '계정 삭제 요청', inquiryContent: '계정을 삭제하고 싶습니다.', answer: '계정 삭제 요청이 처리되었습니다.', date: '2024-08-03', handleInquiry: 'O', handleInquiryDate: '2024-08-05' },
];

export default function ReportAndInquiryList() {
  const [reports, setReports] = useState(initialReports);
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [open, setOpen] = useState(false);
  const [currentDeleteId, setCurrentDeleteId] = useState(null);
  const [isReport, setIsReport] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const navigate = useNavigate();

  const handleOpenModal = (id, isReport) => {
    setCurrentDeleteId(id);
    setIsReport(isReport);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedInquiry(null); // 모달 닫을 때 선택된 문의 초기화
  };

  const handleConfirmDelete = () => {
    if (isReport) {
      setReports(reports.filter(report => report.id !== currentDeleteId));
    } else {
      setInquiries(inquiries.filter(inquiry => inquiry.id !== currentDeleteId));
    }
    handleCloseModal();
  };

  const handleOpenInquiryDetails = (inquiry) => {
    setSelectedInquiry(inquiry);
    setOpen(true);
  };

  const handleReinquiry = () => {
    navigate('/changeInfo/inquiery', {
      state: {
        initialTitle: selectedInquiry.inquiry,
        initialContent: selectedInquiry.inquiryContent,
      },
    });
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '50px 20px 20px 20px' }}>
      <TableSection
        title="신고 목록"
        columns={[
          { label: 'ID', field: 'id' },
          { label: '신고된 사용자', field: 'reportedUser', align: 'center' },
          { label: '신고 이유', field: 'reason', align: 'center' },
          { label: '신고 날짜', field: 'date', align: 'center' },
          { label: '신고 처리 여부', field: 'handleReport', align: 'center' },
          { label: '신고 처리 날짜', field: 'handleReportdate', align: 'center' },
          { label: '신고 처분', field: 'judgement', align: 'center' },
        ]}
        rows={reports}
        handleDelete={(id) => handleOpenModal(id, true)}
        dataFormatter={(row, field) => {
          if (field === 'handleReportdate' || field === 'judgement') {
            return row.handleReport === 'X' ? '-' : row[field];
          }
          return row[field];
        }}
      />

      <div style={{ marginTop: '40px' }}></div>

      <TableSection
        title="문의 목록"
        columns={[
          { label: 'ID', field: 'id' },
          {
            label: '문의 제목',
            field: 'inquiry',
            align: 'center',
            onClick: (row) => handleOpenInquiryDetails(row),
          },
          { label: '문의 날짜', field: 'date', align: 'center' },
          { label: '답변 여부', field: 'handleInquiry', align: 'center' },
          { label: '답변 날짜', field: 'handleInquiryDate', align: 'center' },
        ]}
        rows={inquiries}
        handleDelete={(id) => handleOpenModal(id, false)}
        dataFormatter={(row, field) => {
          if (field === 'handleInquiryDate') {
            return row.handleInquiry === 'X' ? '-' : row[field];
          }
          return row[field];
        }}
      />

      <MuiModal
        open={open}
        onClose={handleCloseModal}
        title={selectedInquiry ? '문의 상세 정보' : '삭제 확인'}
        content={
          selectedInquiry ? (
            <>
              <TextField_ label="제목" value={selectedInquiry.inquiry} readOnly />
              <TextField_ label="내용" value={selectedInquiry.inquiryContent} multiline={true} readOnly />
              <TextField_ label="답변" value={selectedInquiry.answer} multiline={true} readOnly />
            </>
          ) : (
            <Typography gutterBottom>정말로 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</Typography>
          )
        }
        actions={
          selectedInquiry ? (
            <>
              <Button onClick={handleReinquiry} variant="contained" color="primary" sx={{ marginRight: 1 }}>
                재문의
              </Button>
              <Button onClick={handleCloseModal} variant="contained" color="error" sx={{ marginLeft: 2 }}>
                닫기
              </Button>
            </>
          ) : (
            <>
              <Button onClick={handleConfirmDelete} variant="contained" color="error" sx={{ marginRight: 1 }}>
                예
              </Button>
              <Button onClick={handleCloseModal} variant="contained" color="primary" sx={{ marginLeft: 2 }}>
                아니오
              </Button>
            </>
          )
        }
      />
    </Paper>
  );
}
