package com.ict.traveljoy.repository.tripReview;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TripReviewPhotoRepository extends JpaRepository<TripReviewPhoto, Long> {

    // TripReviewId로 TripReviewPhoto 목록 조회
    List<TripReviewPhoto> findByTripReviewId(Long tripReviewId);

    // ImageId로 TripReviewPhoto 목록 조회
    List<TripReviewPhoto> findByImageId(Long imageId);

    // TripReviewId와 ImageId로 TripReviewPhoto 조회
    TripReviewPhoto findByTripReviewIdAndImageId(Long tripReviewId, Long imageId);

    // 특정 TripReviewPhoto 삭제 (TripReviewId와 ImageId로 조회)
    void deleteByTripReviewIdAndImageId(Long tripReviewId, Long imageId);

    // 특정 TripReviewId에 해당하는 TripReviewPhoto 모두 삭제
    void deleteByTripReviewId(Long tripReviewId);
}