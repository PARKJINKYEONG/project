//피그마에 보면 있는 일정생성 앞부분에 단계별 설명넣을거
import React, { useState } from 'react';
import styles from '../../styles/descriptionPlan.module.css';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DateRangePicker, LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box, TextField } from '@mui/material';

export default function DescriptionPlan(){

  return<>
      <div className={styles.plan2}>
        <span>여행 일정</span>
        <div className={styles.when}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoItem component="DateRangePicker">
              <DateRangePicker />
            </DemoItem>
        </LocalizationProvider>
        </div>
        <div>
        <span>몇명이서 가실지 정하셨나요?</span>
          
        </div>

        <div className="plan2 spend"><span>사용 가능한 예산을 알려주세요</span>
        <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }} noValidate autoComplete="off">
        <TextField label="예산" id="outlined-size-small" size="small" type="number"/>
        </Box>
           
        </div>
      </div>
    </>
};

