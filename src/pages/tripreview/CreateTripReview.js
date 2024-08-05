import React, { useState } from 'react';
import { TextField, Button, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../header';
import BigTitleHeader from '../bigTitleHeader';

const CreateTripReview = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    date: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, we'll log the form data
    console.log('Form Data Submitted:', formData);
    // Redirect to Review List page after submission
    navigate('/ReviewList');
  };

  return (
    <>
      <Header />
      <BigTitleHeader />
      <div className="create-review-container" style={{ padding: '20px' }}>
        <div style={{ marginTop: '100px' }}>
          <Typography variant="h2" gutterBottom style={{ textAlign: 'left' }}>
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
              <TextField
                label="날짜"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
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
                제출하기
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
};

export default CreateTripReview;
