package com.ict.traveljoy.controller.tripreview;

import com.ict.traveljoy.tripReview.service.TripReviewService;

import io.swagger.v3.oas.annotations.tags.Tag;

import com.ict.traveljoy.tripReview.service.TripReviewDto;
import com.ict.traveljoy.tripReview.service.TripReviewPhotoDto;
import com.ict.traveljoy.tripReview.service.TripReviewPhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name="TripReviewPage", description = "여행 리뷰 페이지")
@RestController
@RequestMapping("/reviewList")
public class TripReviewController {

    @Autowired
    private TripReviewService tripReviewService;

    @Autowired
    private TripReviewPhotoService tripReviewPhotoService;

    // 리뷰 생성
    @PostMapping("/createReview")
    public ResponseEntity<TripReviewDto> createReview(@RequestBody TripReviewDto tripReviewDTO) {
        System.out.println("Creating review: " + tripReviewDTO);
        try {
            TripReviewDto createdReview = tripReviewService.createReview(tripReviewDTO);
            if(createdReview == null) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>(createdReview, HttpStatus.CREATED);
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 모든 리뷰 조회
    @GetMapping
    public ResponseEntity<List<TripReviewDto>> getAllReviews() {
        try {
            List<TripReviewDto> reviews = tripReviewService.getAllReviews();
            return new ResponseEntity<>(reviews, HttpStatus.OK);
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    // 특정 ID로 리뷰 조회
    @GetMapping("/{id}")
    public ResponseEntity<TripReviewDto> getReviewById(@PathVariable("id") Long id) {
        try {
            TripReviewDto review = tripReviewService.getReviewById(id);
            if (review == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(review, HttpStatus.OK);
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 리뷰 수정
    @PutMapping("/editReview/{id}")
    public ResponseEntity<TripReviewDto> updateReview(@PathVariable("id") Long id, @RequestBody TripReviewDto tripReviewDTO) {
        try {
            TripReviewDto updatedReview = tripReviewService.updateReview(id, tripReviewDTO);
            if (updatedReview == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(updatedReview, HttpStatus.OK);
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 리뷰 삭제
    @DeleteMapping("/editReview/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable("id") Long id) {
        try {
            tripReviewService.deleteReview(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (IllegalArgumentException e) {
            System.out.println("Error deleting review: " + e.getMessage()); // 로그 추가
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    /*
    // 특정 리뷰의 모든 사진 조회
    @GetMapping("/{id}/photos")
    public ResponseEntity<List<TripReviewPhotoDto>> getPhotosByReviewId(@PathVariable("id") Long reviewId) {
        try {
            List<TripReviewPhotoDto> photos = tripReviewPhotoService.getPhotosByReviewId(reviewId);
            return new ResponseEntity<>(photos, HttpStatus.OK);
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }*/
}
