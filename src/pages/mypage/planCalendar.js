import React from "react";
import { Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Calendar from "../../components/calendar_box";

const PlanCalendar = () => {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}> 
      <Box>
        <Calendar 
        sx={{
          width: '100%',
          margin: '0 auto',
            '& .MuiCalendarPicker-root': {
              padding: '0 16px',
            },          
              '& .MuiPickersCalendarHeader-root': {
                marginBottom: '16px', // 달과 네비게이션 버튼 사이의 거리 조정
              },
              '& .MuiDayPicker-weekContainer': {
                display: 'flex',              
                marginBottom: '8px', // 요일과 날짜 사이 간격 조정
              },
              '& .MuiPickersDay-root': {
                width: '200px', // 날짜 셀의 너비 조정
                height: '70px', // 날짜 셀의 높이 조정
                fontSize: '1rem', // 날짜 텍스트 크기 조정
              },
              '& .MuiTypography-root': {
                fontSize: '1.2rem', // 요일 텍스트 크기 조정
                width: '170px', // 요일 텍스트의 너비를 날짜 셀과 일치시킴
                textAlign: 'center', // 요일 텍스트를 중앙 정렬
                lineHeight: '2rem', // 요일 텍스트의 줄 간격 조정 (위아래 간격 증가)
                paddingTop: '8px', // 요일 텍스트 위쪽 여백 추가
                paddingBottom: '8px', // 요일 텍스트 아래쪽 여백 추가
            },
          
        }}
      />
      </Box>
    </LocalizationProvider>  
  ); 
}

export default PlanCalendar;