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

  const { row, onDelete, index } = props;
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState("완료");


  const [showDeleteModal, setShowDeleteModal] = useState(false); // 삭제 모달 상태
  const [showCompleteModal, setShowCompleteModal] = useState(false); // 완료 모달 상태

  const handleStatusChange = event => {
    setStatus(event.target.value);
  };

  // 취소 버튼 클릭 시 모달 표시
  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  // 모달 닫기 핸들러
  const handleClose = () => {
    setShowDeleteModal(false);
    setShowCompleteModal(false);
  };

  // 취소 확인 핸들러
  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
    if (onDelete) {
      onDelete(row.name); // 행 삭제
    }
  };
  
    // "비고" 칸을 활성화 상태로 유지하는 스타일
    const activeCellStyle = {
      opacity: 1,
      pointerEvents: 'auto',
      cursor: 'pointer',
    };
  
    // 나머지 비활성화된 칸 스타일
    const disabledCellStyle = {
      opacity: 0.5,
      pointerEvents: 'none',
      cursor: 'not-allowed',
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
        <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', ...(index === 0 ? activeCellStyle : disabledCellStyle) }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            style={index === 0 ? activeCellStyle : disabledCellStyle}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', ...(index === 0 ? activeCellStyle : disabledCellStyle) }}>
          <StyledSelect
            value={status}
            onChange={handleStatusChange}
            style={index === 0 ? activeCellStyle : disabledCellStyle}
          >
            <StyledMenuItem value="완료">완료</StyledMenuItem>
          </StyledSelect>
        </TableCell>
        <TableCell align="left" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', ...(index === 0 ? activeCellStyle : disabledCellStyle) }}>{row.name1}</TableCell>
        <TableCell align="left" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', ...(index === 0 ? activeCellStyle : disabledCellStyle) }}>{row.value2}</TableCell>
        <TableCell align="left" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', ...(index === 0 ? activeCellStyle : disabledCellStyle) }}>{row.value3}</TableCell>
        <TableCell align="left" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)', ...(index === 0 ? activeCellStyle : disabledCellStyle) }}>{row.value4}</TableCell>
        <TableCell align="center" sx={activeCellStyle}>
          <button style={{ marginLeft: "15px" }} onClick={handleDeleteClick}>취소</button>
        </TableCell>
      </TableRow>

      {/* 삭제 확인 모달 */}
      <Modal open={showDeleteModal} onClose={handleClose}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <h3>취소하시겠습니까?</h3>
          <Button onClick={handleConfirmDelete}>확인</Button>
          <Button onClick={handleClose}>취소</Button>
        </Box>
      </Modal>
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
      <h3>완료 목록</h3>
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