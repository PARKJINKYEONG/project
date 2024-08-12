//사실1단계

import { Box, FormControl, InputLabel, MenuItem, Select, stepConnectorClasses, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import CalendarComponent from "../../components/calendar";
import { useState } from "react";



export default function ProgressPlan1(){
  const [companySize, setcompanySize] = useState('');
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setcompanySize(event.target.value);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };



  return<>
    <div>
      <div className="how">
        <h2>여행 계획을 위한 기본 사항을 알려주세요</h2>
        <h4>기본 여행 정보</h4>
        <div className="plan2 where"><span>어디로 가실지 정하셨나요?</span>
        <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }} noValidate autoComplete="off">
        <TextField label="여행지" id="outlined-size-small" size="small" />
        </Box>
          <hr></hr>
        </div>
        <div className="plan2 when"><span>언제 가실지 정하셨나요?</span>
        <div>
          <CalendarComponent content="출발 날짜" />
        </div>
        <div>
          <CalendarComponent content="도착 날짜" />
        </div>
          <hr></hr>
        </div>
        <div className="plan2 who"><span>몇명이서 가실지 정하셨나요?</span>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-controlled-open-select-label">인원수</InputLabel>
        <Select labelId="demo-controlled-open-select-label" id="demo-controlled-open-select" open={open}
          onClose={handleClose} onOpen={handleOpen} value={companySize} label="인원수" onChange={handleChange}>

          <MenuItem value="1">

            <em>1</em>
          </MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
        </Select>
        </FormControl>
          <hr></hr>
        </div>
        <div className="plan2 spend"><span>사용 가능한 예산을 알려주세요</span>
        <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }} noValidate autoComplete="off">
        <TextField label="예산" id="outlined-size-small" size="small" type="number"/>
        </Box>
          <hr></hr> 
        </div>
      </div>
      <div className="what">
        <h4>하고싶은 활동</h4>
      </div>

    </div>
  </>




};
