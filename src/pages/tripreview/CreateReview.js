import React, { useState } from 'react';
import { TextField, Button, Typography, Grid, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Rating from '@mui/material/Rating';
import axios from 'axios';

const CreateTripReview = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    startDate: null,
    endDate: null,
    package: '',
    itinerary: '',
    content: '',
    images: [],
    rating: 0
  });

  const [errors, setErrors] = useState({
    title: false,
    author: false,
    startDate: false,
    endDate: false,
    package: false,
    itinerary: false,
    content: false,
    rating: false
  });

  const [errorMessage, setErrorMessage] = useState('');
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

  const handleRatingChange = (event, newValue) => {
    setFormData(prevData => ({
      ...prevData,
      rating: newValue
    }));
  };

  const validateForm = () => {
    const newErrors = {
      title: !formData.title,
      author: !formData.author,
      startDate: !formData.startDate,
      endDate: !formData.endDate,
      package: !formData.package,
      itinerary: !formData.itinerary,
      content: !formData.content,
      rating: formData.rating === 0
    };
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('author', formData.author);
      formDataToSend.append('startDate', formData.startDate.toISOString());
      formDataToSend.append('endDate', formData.endDate.toISOString());
      formDataToSend.append('package', formData.package);
      formDataToSend.append('itinerary', formData.itinerary);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('rating', formData.rating);

      Array.from(formData.images).forEach((file, index) => {
        formDataToSend.append('images', file);
      });

      try {
        await axios.post('http://localhost:8080/api/reviewList/createReview', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        navigate('/ReviewList');
      } catch (error) {
        setErrorMessage('리뷰 작성 중 오류가 발생했습니다.');
        console.error('Error submitting review:', error);
      }
    } else {
      console.log('Form validation failed');
    }
  };

  return (
    <>
      <div className="create-review-container" style={{ padding: '20px' }}>
        <div style={{ marginTop: '20px' }}>
          <Typography variant="h3" gutterBottom style={{ textAlign: 'left' }}>
            후기 작성하기
          </Typography>
        </div>
        {errorMessage && (
          <Alert severity="error" style={{ marginBottom: '20px' }}>
            {errorMessage}
          </Alert>
        )}
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
                error={errors.title}
                helperText={errors.title ? '제목을 입력해주세요.' : ''}
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
                error={errors.author}
                helperText={errors.author ? '작성자를 입력해주세요.' : ''}
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
                dateFormat="yyyy-MM-dd"
                calendarClassName="scrollable-datepicker"
              />
              {(errors.startDate || errors.endDate) && (
                <Typography color="error" variant="body2" style={{ marginTop: '10px' }}>
                  여행 기간을 선택해주세요.
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="패키지"
                name="package"
                value={formData.package}
                onChange={handleInputChange}
                fullWidth
                required
                error={errors.package}
                helperText={errors.package ? '패키지를 입력해주세요.' : ''}
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
                error={errors.itinerary}
                helperText={errors.itinerary ? '일정을 입력해주세요.' : ''}
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
                error={errors.content}
                helperText={errors.content ? '후기 내용을 입력해주세요.' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">별점</Typography>
              <Rating
                name="rating"
                value={formData.rating}
                onChange={handleRatingChange}
                precision={0.1}
              />
              {errors.rating && (
                <Typography color="error" variant="body2" style={{ marginTop: '10px' }}>
                  별점을 선택해주세요.
                </Typography>
              )}
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
