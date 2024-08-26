import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Grid } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Rating from '@mui/material/Rating';

const exampleReviews = [
  { id: 1, title: 'Example Review1', author: 'Author1', content: 'This is a review content1.', itinerary: 'Sample itinerary1', startDate: new Date(), endDate: new Date(), package: '', images: [], rating: 4 },
  { id: 2, title: 'Example Review2', author: 'Author2', content: 'This is a review content2.', itinerary: 'Sample itinerary2', startDate: new Date(), endDate: new Date(), package: '', images: [], rating: 5 },
  { id: 3, title: 'Example Review3', author: 'Author3', content: 'This is a review content3.', itinerary: 'Sample itinerary3', startDate: new Date(), endDate: new Date(), package: '', images: [], rating: 3 },
  { id: 4, title: 'Example Review4', author: 'Author4', content: 'This is a review content4.', itinerary: 'Sample itinerary4', startDate: new Date(), endDate: new Date(), package: '', images: [], rating: 2 },
  { id: 5, title: 'Example Review5', author: 'Author5', content: 'This is a review content5.', itinerary: 'Sample itinerary5', startDate: new Date(), endDate: new Date(), package: '', images: [], rating: 4 },
  { id: 6, title: 'Example Review6', author: 'Author6', content: 'This is a review content6.', itinerary: 'Sample itinerary6', startDate: new Date(), endDate: new Date(), package: '', images: [], rating: 5 }
];

const EditReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState(null);

  useEffect(() => {
    const foundReview = exampleReviews.find(r => r.id === parseInt(id, 10));
    setReview(foundReview);
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setReview(prevReview => ({
      ...prevReview,
      [name]: value
    }));
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setReview(prevReview => ({
      ...prevReview,
      startDate: start,
      endDate: end
    }));
  };

  const handleRatingChange = (event, newValue) => {
    setReview(prevReview => ({
      ...prevReview,
      rating: newValue
    }));
  };

  const handleFileChange = (e) => {
    setReview(prevReview => ({ ...prevReview, images: [...e.target.files] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Review updated:', review);
    navigate('/ReviewList');
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm('정말로 삭제하시겠습니까?');
    if (confirmDelete) {
      console.log('Review deleted:', review);
      navigate('/ReviewList');
    }
  };

  if (!review) return <p>Loading...</p>;

  return (
    <div className="container my-5" style={{ padding: '20px' }}>
      <Typography variant="h3" gutterBottom style={{ textAlign: 'left', marginTop: '20px' }}>
        리뷰 수정 및 삭제
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="제목"
              name="title"
              value={review.title}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="작성자"
              name="author"
              value={review.author}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">여행 기간</Typography>
            <DatePicker
              selected={review.startDate}
              onChange={handleDateChange}
              startDate={review.startDate}
              endDate={review.endDate}
              selectsRange
              inline
              dateFormat="yyyy-MM-dd"
              calendarClassName="scrollable-datepicker" 
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="패키지"
              name="package"
              value={review.package}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="일정"
              name="itinerary"
              value={review.itinerary}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="후기 내용"
              name="content"
              value={review.content}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">별점</Typography>
            <Rating
              name="rating"
              value={review.rating}
              onChange={handleRatingChange}
              precision={0.1}
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
            <Button type="submit" variant="contained" color="primary" style={{ marginRight: '10px' }}>
              저장
            </Button>
            <Button onClick={handleDelete} variant="contained" style={{ backgroundColor: 'red', color: 'white' }}>
              삭제
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default EditReview;
