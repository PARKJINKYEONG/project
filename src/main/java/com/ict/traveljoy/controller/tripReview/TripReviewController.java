package com.ict.traveljoy.controller.tripReview;

import com.ict.traveljoy.service.tripReview.TripReviewDto;
import com.ict.traveljoy.service.tripReview.TripReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trip-reviews")
public class TripReviewController {

    private final TripReviewService tripReviewService;

    @Autowired
    public TripReviewController(TripReviewService tripReviewService) {
        this.tripReviewService = tripReviewService;
    }

    // 작성자로 TripReview 조회
    @GetMapping("/writer/{writer}")
    public ResponseEntity<List<TripReviewDto>> getTripReviewsByWriter(@PathVariable String writer) {
        List<TripReviewDto> tripReviews = tripReviewService.getTripReviewsByWriter(writer);
        return new ResponseEntity<>(tripReviews, HttpStatus.OK);
    }

    // isActive 여부로 TripReview 조회
    @GetMapping("/isActive/{isActive}")
    public ResponseEntity<List<TripReviewDto>> getTripReviewsByIsActive(@PathVariable String isActive) {
        List<TripReviewDto> tripReviews = tripReviewService.getTripReviewsByIsActive(isActive);
        return new ResponseEntity<>(tripReviews, HttpStatus.OK);
    }

    // planId로 TripReview 조회
    @GetMapping("/planId/{planId}")
    public ResponseEntity<List<TripReviewDto>> getTripReviewsByPlanId(@PathVariable Long planId) {
        List<TripReviewDto> tripReviews = tripReviewService.getTripReviewsByPlanId(planId);
        return new ResponseEntity<>(tripReviews, HttpStatus.OK);
    }

    // 제목에 특정 단어가 포함된 TripReview 조회
    @GetMapping("/title/{title}")
    public ResponseEntity<List<TripReviewDto>> getTripReviewsByTitleContaining(@PathVariable String title) {
        List<TripReviewDto> tripReviews = tripReviewService.getTripReviewsByTitleContaining(title);
        return new ResponseEntity<>(tripReviews, HttpStatus.OK);
    }

    // TripReview 저장
    @PostMapping
    public ResponseEntity<TripReviewDto> saveTripReview(@RequestBody TripReviewDto tripReviewDto) {
        TripReviewDto savedTripReview = tripReviewService.saveTripReview(tripReviewDto);
        return new ResponseEntity<>(savedTripReview, HttpStatus.CREATED);
    }

    // TripReview 수정
    @PutMapping("/{tripReviewId}")
    public ResponseEntity<TripReviewDto> updateTripReview(@PathVariable Long tripReviewId, @RequestBody TripReviewDto tripReviewDto) {
        tripReviewDto.setTripReviewId(tripReviewId);
        TripReviewDto updatedTripReview = tripReviewService.updateTripReview(tripReviewDto);
        return updatedTripReview != null ? new ResponseEntity<>(updatedTripReview, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // TripReview 삭제
    @DeleteMapping("/{tripReviewId}")
    public ResponseEntity<Void> deleteTripReview(@PathVariable Long tripReviewId) {
        tripReviewService.deleteTripReview(tripReviewId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}