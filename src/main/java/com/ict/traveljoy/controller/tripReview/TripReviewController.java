package com.ict.traveljoy.controller.tripReview;

import com.ict.traveljoy.tripReview.service.TripReviewDto;
import com.ict.traveljoy.tripReview.service.TripReviewPhotoDto;
import com.ict.traveljoy.tripReview.service.TripReviewService;
import com.ict.traveljoy.tripReview.service.TripReviewPhotoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@Tag(name = "여행 리뷰 관리", description = "여행 리뷰 및 리뷰 사진을 관리")
@RestController
@RequiredArgsConstructor
@RequestMapping("/trip-reviews")
public class TripReviewController {

    private final TripReviewService tripReviewService;
    private final TripReviewPhotoService tripReviewPhotoService;

    @CrossOrigin
    @PostMapping("/create")
    @Operation(summary = "여행 리뷰 생성하기", description = "여행 리뷰를 생성하는 컨트롤러")
    public ResponseEntity<TripReviewDto> createTripReview(@RequestBody TripReviewDto tripReviewDto) {
        try {
            TripReviewDto createdTripReview = tripReviewService.saveTripReview(tripReviewDto);
            return new ResponseEntity<>(createdTripReview, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @CrossOrigin
    @PutMapping("/update/{id}")
    @Operation(summary = "여행 리뷰 수정하기", description = "여행 리뷰를 수정하는 컨트롤러")
    public ResponseEntity<TripReviewDto> updateTripReview(@PathVariable("id") Long tripReviewId, @RequestBody TripReviewDto tripReviewDto) {
        try {
            TripReviewDto updatedTripReview = tripReviewService.updateTripReview(tripReviewId, tripReviewDto);
            return new ResponseEntity<>(updatedTripReview, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @CrossOrigin
    @DeleteMapping("/delete/{id}")
    @Operation(summary = "여행 리뷰 삭제하기", description = "여행 리뷰를 삭제하는 컨트롤러")
    public ResponseEntity<Void> deleteTripReview(@PathVariable("id") Long tripReviewId) {
        try {
            tripReviewService.deleteTripReview(tripReviewId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @CrossOrigin
    @GetMapping("/view/{id}")
    @Operation(summary = "여행 리뷰 조회하기", description = "특정 ID로 여행 리뷰를 조회하는 컨트롤러")
    public ResponseEntity<TripReviewDto> getTripReview(@PathVariable("id") Long tripReviewId) {
        try {
            TripReviewDto tripReviewDto = tripReviewService.getTripReview(tripReviewId);
            return new ResponseEntity<>(tripReviewDto, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @CrossOrigin
    @PostMapping("/photo-create/photos")
    @Operation(summary = "여행 리뷰 사진 저장하기", description = "여행 리뷰에 대한 사진을 저장하는 컨트롤러")
    public ResponseEntity<TripReviewPhotoDto> createTripReviewPhoto(@RequestBody TripReviewPhotoDto tripReviewPhotoDto) {
        try {
            TripReviewPhotoDto createdTripReviewPhoto = tripReviewPhotoService.savePhoto(tripReviewPhotoDto);
            return new ResponseEntity<>(createdTripReviewPhoto, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @CrossOrigin
    @PutMapping("/photo-update/photos/{id}")
    @Operation(summary = "여행 리뷰 사진 수정하기", description = "여행 리뷰 사진을 수정하는 컨트롤러")
    public ResponseEntity<TripReviewPhotoDto> updateTripReviewPhoto(@PathVariable("id") Long tripReviewPhotoId, @RequestBody TripReviewPhotoDto tripReviewPhotoDto) {
        try {
            TripReviewPhotoDto updatedTripReviewPhoto = tripReviewPhotoService.updatePhoto(tripReviewPhotoId, tripReviewPhotoDto);
            return new ResponseEntity<>(updatedTripReviewPhoto, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @CrossOrigin
    @DeleteMapping("/photo-delete/photos/{id}")
    @Operation(summary = "여행 리뷰 사진 삭제하기", description = "여행 리뷰 사진을 삭제하는 컨트롤러")
    public ResponseEntity<Void> deleteTripReviewPhoto(@PathVariable("id") Long tripReviewPhotoId) {
        try {
            tripReviewPhotoService.deletePhoto(tripReviewPhotoId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @CrossOrigin
    @GetMapping("/photo-view/photos/{id}")
    @Operation(summary = "여행 리뷰 사진 조회하기", description = "특정 ID로 여행 리뷰 사진을 조회하는 컨트롤러")
    public ResponseEntity<TripReviewPhotoDto> getTripReviewPhoto(@PathVariable("id") Long tripReviewPhotoId) {
        try {
            TripReviewPhotoDto tripReviewPhotoDto = tripReviewPhotoService.getPhotoById(tripReviewPhotoId);
            return new ResponseEntity<>(tripReviewPhotoDto, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
