import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import styles from '../../styles/admin/reportManagement.module.css';
import { useState } from 'react';
import { Button, Modal } from '@mui/material';
// import '../../styles/reportManagement.js';

function createData(name, name1, value2, value3, value4, value5) {
  return {
    name, name1, value2, value3, value4, value5,
    history: [
      {
        접수일자: '24-08-05',
        신고내용: '신고자에게 욕설하였음',
        신고ID전화: '555-9999',
        처리유형: '긴급'
      },
      {
        접수일자: '24-08-08',
        신고내용: '신고자에게 혐오 발언 및 선정적 발언',
        신고ID전화: '555-9999',
        처리유형: '보통'
      },
    ]
  };
}

function Row(props) {
  const { row, onDelete } = props;
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState("대기");

  const handleStatusChange = event => {
    setStatus(event.target.value);
  };

  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [buttonStates, setButtonStates] = useState({});

   // 모달을 닫는 핸들러
   const handleButtonClick = () => {
    // 모달에 "완료되었습니다" 메시지를 설정하고 표시
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  //행 삭제
  const handleDelete = () => {
    if (onDelete) {
      onDelete(row.name); // onDelete를 호출하여 행 삭제
    }
  };
  


  const StyledSelect = styled(Select)(({ theme }) => ({
    minWidth: 50,
    backgroundColor: theme.palette.background.paper,
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.primary.main,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.primary.dark,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.light,
      },
    },
  }));

  const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    '&.Mui-selected': {
      backgroundColor: theme.palette.action.selected,
    },
    '&.Mui-selected:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  }));

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>
          <StyledSelect
            value={status}
            onChange={handleStatusChange}
          >
            <StyledMenuItem value="대기">대기</StyledMenuItem>
            <StyledMenuItem value="접수">접수</StyledMenuItem>
            <StyledMenuItem value="진행중">진행</StyledMenuItem>
          </StyledSelect>
        </TableCell>
        <TableCell align="left" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>{row.name1}</TableCell>
        <TableCell align="left" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>{row.value2}</TableCell>
        <TableCell align="left" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>{row.value3}</TableCell>
        <TableCell align="left" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>{row.value4}</TableCell>
        <TableCell align="center" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>
          <button style={{ marginLeft: "15px" }} onClick={handleButtonClick}>완료</button>
          <button style={{ marginLeft: "15px" }} onClick={handleDelete}>🗑️</button>
        </TableCell>
        <Modal open={showModal} onClose={handleClose}>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
            <h3>신고 처리가 완료되었습니다</h3>
            <Button align="center" onClick={handleClose}>닫기</Button>
          </Box>
        </Modal>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7} sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>접수일자</TableCell>
                    <TableCell align="left" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>신고내용</TableCell>
                    <TableCell align="left" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>신고ID전화</TableCell>
                    <TableCell align="left" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>처리유형</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.접수일자 + historyRow.신고ID전화}>
                      <TableCell component="th" scope="row" align="left" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>
                        {historyRow.접수일자}
                      </TableCell>
                      <TableCell align="left" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>{historyRow.신고내용}</TableCell>
                      <TableCell align="left" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>{historyRow.신고ID전화}</TableCell>
                      <TableCell align="left" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>{historyRow.처리유형}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Main Component
export default function CollapsibleTable() {
  const [rows, setRows] = useState([
    createData('1', 'okkim99', 'lee22', '2024-04-05', '게시판'),
    createData('2', 'yjs6940', 'kim89', '2024-08-06', '댓글'),
    createData('3', 'kimmerry10', 'wonderful', '2024-08-06', '댓글'),
    createData('4', 'lee8585', 'noly55', '2024-08-07', '댓글'),
    createData('5', 'kkk55', 'kim89', '2024-08-11', '댓글'),
    createData('6', 'okkim99', 'lee22', '2024-04-05', '게시판'),
    createData('7', 'ddotoo', 'kim89', '2024-11-06', '댓글'),
    createData('8', 'sipgool', 'wonderful', '2024-08-06', '댓글'),
    createData('9', 'Nangman', 'noly55', '2024-08-09', '댓글'),
    createData('10', 'kkk55', 'kim89', '2024-05-06', '댓글'),
    createData('11', 'Joekiller', 'lee22', '2024-04-05', '게시판'),
    createData('12', 'Yoontaek', 'kim89', '2024-08-06', '댓글'),
    createData('13', 'kimmerry10', 'wonderful', '2024-08-06', '댓글'),
    createData('14', 'REDGUY', 'noly55', '2024-08-07', '댓글'),
    createData('15', 'kkk55', 'kim89', '2024-08-06', '댓글'),
  ]);

  // 행 삭제 핸들러
  const handleDeleteRow = (rowName) => {
    setRows((prevRows) => prevRows.filter((row) => row.name !== rowName));
  };

  return (
    <div style={{ margin: "50px" }}>
      <h3>신고 목록</h3>
      <Box sx={{ mt: 5 }}>
        <TableContainer className={styles.tableContainer} component={Paper} sx={{ width: "100%", border: '1px solid rgba(224, 224, 224, 1)' }}>
          <Table aria-label="collapsible table" sx={{ borderCollapse: 'collapse', width: '100%' }}>
            <TableHead className={styles.headers}>
              <TableRow>
                <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }} />
                <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }} align="center">상태</TableCell>
                <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }} align="center">신고ID</TableCell>
                <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }} align="center">신고자ID</TableCell>
                <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }} align="center">신고일시</TableCell>
                <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }} align="center">신고유형</TableCell>
                <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }} align="center">비고</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row key={row.name} row={row} onDelete={handleDeleteRow} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}