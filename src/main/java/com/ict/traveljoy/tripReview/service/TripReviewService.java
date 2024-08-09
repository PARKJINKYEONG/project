package com.ict.traveljoy.tripReview.service;

import com.ict.traveljoy.image.repository.Image;
import com.ict.traveljoy.plan.repository.Plan;
import com.ict.traveljoy.plan.repository.PlanRepository;
import com.ict.traveljoy.tripReview.repository.TripReview;
import com.ict.traveljoy.tripReview.repository.TripReviewPhoto;
import com.ict.traveljoy.tripReview.repository.TripReviewPhotoRepository;
import com.ict.traveljoy.tripReview.repository.TripReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Service
public class TripReviewService {

    private final TripReviewRepository tripReviewRepository;
    private final TripReviewPhotoRepository tripReviewPhotoRepository;
    private final PlanRepository planRepository;

    @Autowired
    public TripReviewService(TripReviewRepository tripReviewRepository, TripReviewPhotoRepository tripReviewPhotoRepository, PlanRepository planRepository) {
        this.tripReviewRepository = tripReviewRepository;
        this.tripReviewPhotoRepository = tripReviewPhotoRepository;
        this.planRepository = planRepository;
    }

    // TripReview 저장
    @Transactional
    public TripReviewDto saveTripReview(TripReviewDto tripReviewDto) {
        TripReview tripReview = tripReviewDto.toEntity();
        if (tripReview.getPlanId() != null) {
            Optional<Plan> planOptional = planRepository.findById(tripReview.getPlanId().getPlanId());
            if (planOptional.isEmpty()) {
                throw new IllegalArgumentException("Plan with ID " + tripReview.getPlanId().getPlanId() + " does not exist.");
            }
            tripReview.setPlanId(null);
        }
        TripReview savedTripReview = tripReviewRepository.save(tripReview);
        return TripReviewDto.fromEntity(savedTripReview);
    }

    // TripReview 업데이트
    @Transactional
    public TripReviewDto updateTripReview(Long tripReviewId, TripReviewDto tripReviewDto) {
        Optional<TripReview> tripReviewOptional = tripReviewRepository.findById(tripReviewId);
        if (tripReviewOptional.isEmpty()) {
            throw new IllegalArgumentException("TripReview with ID " + tripReviewId + " does not exist.");
        }

        TripReview tripReview = tripReviewOptional.get();
        tripReview.setWriter(tripReviewDto.getWriter());
        tripReview.setTitle(tripReviewDto.getTitle());
        tripReview.setReviewContent(tripReviewDto.getReviewContent());
        tripReview.setUrl(tripReviewDto.getUrl());
        tripReview.setPostDate(tripReviewDto.getPostDate());
        tripReview.setIsActive(tripReviewDto.getIsActive());
        tripReview.setIsDelete(tripReviewDto.getIsDelete());
        tripReview.setDeleteDate(tripReviewDto.getDeleteDate());

        if (tripReviewDto.getPlanId() != null) {
            Optional<Plan> planOptional = planRepository.findById(tripReviewDto.getPlanId());
            if (planOptional.isEmpty()) {
                throw new IllegalArgumentException("Plan with ID " + tripReviewDto.getPlanId() + " does not exist.");
            }
            tripReview.setPlanId(null);
        }

        TripReview updatedTripReview = tripReviewRepository.save(tripReview);
        return TripReviewDto.fromEntity(updatedTripReview);
    }

    // TripReview 삭제
    @Transactional
    public void deleteTripReview(Long tripReviewId) {
        Optional<TripReview> tripReviewOptional = tripReviewRepository.findById(tripReviewId);
        if (tripReviewOptional.isEmpty()) {
            throw new IllegalArgumentException("TripReview with ID " + tripReviewId + " does not exist.");
        }
        TripReview tripReview = tripReviewOptional.get();
        tripReview.setIsDelete("true");
        tripReview.setDeleteDate(new Timestamp(System.currentTimeMillis()));
        tripReviewRepository.save(tripReview);
    }

    // TripReview 조회
    public TripReviewDto getTripReview(Long tripReviewId) {
        Optional<TripReview> tripReviewOptional = tripReviewRepository.findById(tripReviewId);
        if (tripReviewOptional.isEmpty()) {
            throw new IllegalArgumentException("TripReview with ID " + tripReviewId + " does not exist.");
        }
        return TripReviewDto.fromEntity(tripReviewOptional.get());
    }

    // 모든 TripReview 조회
    public List<TripReviewDto> getAllTripReviews() {
        List<TripReview> tripReviews = tripReviewRepository.findAll();
        return tripReviews.stream().map(TripReviewDto::fromEntity).toList();
    }

    // 특정 Writer의 TripReview 조회
    public List<TripReviewDto> getTripReviewsByWriter(String writer) {
        List<TripReview> tripReviews = tripReviewRepository.findByWriter(writer);
        return tripReviews.stream().map(TripReviewDto::fromEntity).toList();
    }

    // 특정 Plan ID로 TripReview 조회
    public List<TripReviewDto> getTripReviewsByPlanId(Long planId) {
        List<TripReview> tripReviews = tripReviewRepository.findByPlanId(null);
        return tripReviews.stream().map(TripReviewDto::fromEntity).toList();
    }

    // 제목에 특정 문자열이 포함된 TripReview 조회
    public List<TripReviewDto> getTripReviewsByTitleContaining(String title) {
        List<TripReview> tripReviews = tripReviewRepository.findByTitleContaining(title);
        return tripReviews.stream().map(TripReviewDto::fromEntity).toList();
    }

    // TripReviewPhoto 저장
    @Transactional
    public TripReviewPhotoDto saveTripReviewPhoto(TripReviewPhotoDto tripReviewPhotoDto) {
        TripReviewPhoto tripReviewPhoto = tripReviewPhotoDto.toEntity();
        TripReview tripReview = tripReviewRepository.findById(tripReviewPhoto.getTripReview().getTripReviewId())
                .orElseThrow(() -> new IllegalArgumentException("TripReview with ID " + tripReviewPhoto.getTripReview().getTripReviewId() + " does not exist."));
        tripReviewPhoto.setTripReview(tripReview);

        Image image = tripReviewPhoto.getImage();
        if (image != null) {
            image = new Image(); 
            image.setId(tripReviewPhoto.getImage().getId());
            tripReviewPhoto.setImage(image);
        }

        TripReviewPhoto savedTripReviewPhoto = tripReviewPhotoRepository.save(tripReviewPhoto);
        return TripReviewPhotoDto.toDto(savedTripReviewPhoto);
    }

    // TripReviewPhoto 조회
    public TripReviewPhotoDto getTripReviewPhoto(Long tripReviewPhotoId) {
        Optional<TripReviewPhoto> tripReviewPhotoOptional = tripReviewPhotoRepository.findById(tripReviewPhotoId);
        if (tripReviewPhotoOptional.isEmpty()) {
            throw new IllegalArgumentException("TripReviewPhoto with ID " + tripReviewPhotoId + " does not exist.");
        }
        return TripReviewPhotoDto.toDto(tripReviewPhotoOptional.get());
    }

    // TripReviewPhoto 삭제
    @Transactional
    public void deleteTripReviewPhoto(Long tripReviewPhotoId) {
        Optional<TripReviewPhoto> tripReviewPhotoOptional = tripReviewPhotoRepository.findById(tripReviewPhotoId);
        if (tripReviewPhotoOptional.isEmpty()) {
            throw new IllegalArgumentException("TripReviewPhoto with ID " + tripReviewPhotoId + " does not exist.");
        }
        tripReviewPhotoRepository.deleteById(tripReviewPhotoId);
    }
}
