import React, { useState } from 'react';
import styles from '../../styles/descriptionPlan.module.css';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

const destinations = [
  {
    id: 1,
    name: 'OSAKA',
    country: '일본 오사카',
    imageUrl: 'https://thumb.tidesquare.com/tour/public/product/PRV3000304477/PRD3000739142/origin/6f4a4515-7870-47de-bdfb-75bda9db4515?type=wide',
    isNew: true,
    description: '오사카는 일본의 주요 도시 중 하나로, 다양한 관광 명소와 맛집이 가득합니다.',
  },
  {
    id: 2,
    name: 'TOKYO',
    country: '일본 도쿄',
    imageUrl: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/24c98195-2ba2-4bb2-b7dc-44f48c34c914.jpeg',
    isNew: true,
    description: '도쿄는 일본의 수도로, 현대와 전통이 조화를 이루는 매력적인 도시입니다.',
  },
  {
    id: 3,
    name: 'FUKUOKA',
    country: '일본 후쿠오카',
    imageUrl: 'https://cdn.imweb.me/thumbnail/20220510/fd58b78185ad9.png',
    isNew: true,
    description: '후쿠오카는 일본의 남부에 위치한 도시로, 아름다운 자연과 활기찬 도심을 자랑합니다.',
  },
  {
    id: 4,
    name: 'JEJU',
    country: '대한민국 제주',
    imageUrl: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/0d/d9/dc/caption.jpg?w=800&h=-1&s=1',
    isNew: true,
    description: '제주는 대한민국의 대표적인 섬으로, 천혜의 자연경관을 자랑하는 여행지입니다.',
  },
  {
    id: 5,
    name: 'JEJU',
    country: '대한민국 제주',
    imageUrl: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/0d/d9/dc/caption.jpg?w=800&h=-1&s=1',
    isNew: true,
    description: '제주는 대한민국의 대표적인 섬으로, 천혜의 자연경관을 자랑하는 여행지입니다.',
  },
  {
    id: 6,
    name: 'FUKUOKA',
    country: '일본 후쿠오카',
    imageUrl: 'https://cdn.imweb.me/thumbnail/20220510/fd58b78185ad9.png',
    isNew: true,
    description: '후쿠오카는 일본의 남부에 위치한 도시로, 아름다운 자연과 활기찬 도심을 자랑합니다.',
  }
];

export default function DescriptionPlan() {
  const [open, setOpen] = useState(false);
  const [selectedDest, setSelectedDest] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);

  const handleClickOpen = (dest) => {
    setSelectedDest(dest);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [counts, setCounts] = useState({
    adult: 0,
    senior: 0,
    teen: 0,
    child: 0,
  });

  const handleChange = (type, value) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [type]: Math.max(0, prevCounts[type] + value), // 음수로 내려가지 않도록 설정
    }));
  };

  const total = counts.adult + counts.senior + counts.teen + counts.child;

  return (
    <div className={styles.container}>
      <h2>가고싶은 곳이 있으신가요?</h2>
      <input type="text" placeholder="국가명이나 도시명으로 검색해보세요." className={styles.searchInput} />
      <div className={styles.tabs}>
        <button className={styles.tab}>전체</button>
        <button className={styles.tab}>국내</button>
        <button className={styles.tab}>해외</button>
      </div>

      <div className={styles.cardContainer}>
        {destinations.map(dest => (
          <div key={dest.id} className={styles.card} onClick={() => handleClickOpen(dest)}>
            <img src={dest.imageUrl} alt={dest.name} className={styles.cardImage} />
            {dest.isNew && <span className={styles.newLabel}>NEW</span>}
            <div className={styles.cardContent}>
              <h3>{dest.name}</h3>
              <p>{dest.country}</p>
            </div>
          </div>
        ))}
      </div>

      <hr/>
      <br/>
      <h2>언제 가실 예정이세요?</h2>
      <div className={styles.datePickerContainer}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateRangePicker
            calendars={2}
            value={dateRange}
            onChange={(newValue) => setDateRange(newValue)}
            renderInput={(startProps, endProps) => (
              <React.Fragment>
                <TextField {...startProps} />
                <Box sx={{ mx: 2 }}> to </Box>
                <TextField {...endProps} />
              </React.Fragment>
            )}
          />
        </LocalizationProvider>
      </div>
      <br/>
      <hr/>
      <h2>몇명이서 갈 예정이세요?</h2>  
      <br/>
      <div className={styles.App}>
      <h1>인원수 선택</h1>
      <div className={styles.counter_container}>
        <div className={styles.counter}>
          <label>성인:</label>
          <input
            type="number"
            value={counts.adult}
            readOnly
          />
          <button onClick={() => handleChange('adult', 1)}>▲</button>
          <button onClick={() => handleChange('adult', -1)}>▼</button>
        </div>
        
        <div className="counter">
          <label>노인:</label>
          <input
            type="number"
            value={counts.senior}
            readOnly
          />
          <button onClick={() => handleChange('senior', 1)}>▲</button>
          <button onClick={() => handleChange('senior', -1)}>▼</button>
        </div>

        <div className="counter">
          <label>청소년:</label>
          <input
            type="number"
            value={counts.teen}
            readOnly
          />
          <button onClick={() => handleChange('teen', 1)}>▲</button>
          <button onClick={() => handleChange('teen', -1)}>▼</button>
        </div>

        <div className="counter">
          <label>유아:</label>
          <input
            type="number"
            value={counts.child}
            readOnly
          />
          <button onClick={() => handleChange('child', 1)}>▲</button>
          <button onClick={() => handleChange('child', -1)}>▼</button>
        </div>
      </div>

      <h2>총 인원수: {total}</h2>
    </div>




      <hr/>
      <h2>몇명이서 갈 예정이세요?</h2> 
      

      {selectedDest && (
        <Dialog open={open} onClose={handleClose} sx={{ '& .MuiDialog-paper': { width: '80%', maxWidth: '800px' } }}>
          <DialogTitle>{selectedDest.name}</DialogTitle>
          <DialogContent>
            <img src={selectedDest.imageUrl} alt={selectedDest.name} className={styles.modalImage} style={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'cover' }}/>
            <hr/>
            <DialogContentText>
              {selectedDest.description}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              장소 선택
            </Button>
          </DialogActions>
        </Dialog>
      )}
      
    </div>
  );
}