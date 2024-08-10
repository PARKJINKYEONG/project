import React, { useState } from 'react';
import { TextField, Button, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CreateTripReview = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    startDate: null,
    endDate: null,
    package: '',
    itinerary: '',
    content: '',
    images: []
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prevData => ({ ...prevData, images: [...e.target.files] }));
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setFormData(prevData => ({
      ...prevData,
      startDate: start,
      endDate: end
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    navigate('/ReviewList');
  };

  return (
    <>
      <div className="create-review-container" style={{ padding: '20px' }}>
        <div style={{ marginTop: '20px' }}>
          <Typography variant="h3" gutterBottom style={{ textAlign: 'left' }}>
            후기 작성하기
          </Typography>
        </div>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="제목"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="작성자"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">여행 기간</Typography>
              <DatePicker
                selected={formData.startDate}
                onChange={handleDateChange}
                startDate={formData.startDate}
                endDate={formData.endDate}
                selectsRange
                inline
                minDate={new Date()}
                dateFormat="yyyy-MM-dd"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="패키지"
                name="package"
                value={formData.package}
                onChange={handleInputChange}
                fullWidth
               
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="일정"
                name="itinerary"
                value={formData.itinerary}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="후기 내용"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={4}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <input
                type="file"
                name="images"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                style={{ display: 'block' }}
              />
              <Typography variant="body2" color="textSecondary" style={{ marginTop: '10px' }}>
                여러 이미지를 선택할 수 있습니다.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                리뷰 남기기
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
};

export default CreateTripReview;
