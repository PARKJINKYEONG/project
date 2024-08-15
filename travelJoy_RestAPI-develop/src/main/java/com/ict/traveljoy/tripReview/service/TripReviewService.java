package com.ict.traveljoy.tripReview.service;

import com.ict.traveljoy.image.repository.Image;
import com.ict.traveljoy.image.repository.ImageRepository;
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

    @Transactional
    public TripReviewDto createReview(TripReviewDto tripReviewDto) {
        TripReview tripReview = tripReviewDto.toEntity();
        if (tripReview.getPlan() != null) {
            Optional<Plan> planOptional = planRepository.findById(tripReview.getPlan().getId());
            if (planOptional.isEmpty()) {
                throw new IllegalArgumentException("Plan with ID " + tripReview.getPlan().getId() + " does not exist.");
            }
            tripReview.setPlan(planOptional.get());
        }
        TripReview savedTripReview = tripReviewRepository.save(tripReview);
        return TripReviewDto.toDto(savedTripReview);
    }

    @Transactional
    public TripReviewDto updateReview(Long tripReviewId, TripReviewDto tripReviewDto) {
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
        tripReview.setIsActive(tripReviewDto.getIsActive() ? 1 : 0);
        tripReview.setIsDelete(tripReviewDto.getIsDelete() ? 1 : 0);
        tripReview.setDeleteDate(tripReviewDto.getDeleteDate());

        if (tripReviewDto.getPlan() != null) {
            Optional<Plan> planOptional = planRepository.findById(tripReviewDto.getPlan().getId());
            if (planOptional.isEmpty()) {
                throw new IllegalArgumentException("Plan with ID " + tripReviewDto.getPlan().getId() + " does not exist.");
            }
            tripReview.setPlan(planOptional.get());
        } else {
            tripReview.setPlan(null);
        }

        TripReview updatedTripReview = tripReviewRepository.save(tripReview);
        return TripReviewDto.toDto(updatedTripReview);
    }

    @Transactional
    public void deleteReview(Long tripReviewId) {
        Optional<TripReview> tripReviewOptional = tripReviewRepository.findById(tripReviewId);
        if (tripReviewOptional.isEmpty()) {
            throw new IllegalArgumentException("TripReview with ID " + tripReviewId + " does not exist.");
        }
        TripReview tripReview = tripReviewOptional.get();
        tripReview.setIsDelete(1);
        tripReview.setDeleteDate(new Timestamp(System.currentTimeMillis()));
        tripReviewRepository.save(tripReview);
        System.out.println("Deleted review with ID: " + tripReviewId);
        
    }
    
    public List<TripReviewDto> getAllReviews() {
        List<TripReview> tripReviews = tripReviewRepository.findAllActiveReviews();
        return tripReviews.stream().map(TripReviewDto::toDto).toList();
    }

    public TripReviewDto getReviewById(Long tripReviewId) {
        Optional<TripReview> tripReviewOptional = tripReviewRepository.findById(tripReviewId);
        if (tripReviewOptional.isEmpty()) {
            throw new IllegalArgumentException("TripReview with ID " + tripReviewId + " does not exist.");
        }
        return TripReviewDto.toDto(tripReviewOptional.get());
    }

    public List<TripReviewDto> getReviewsByWriter(String writer) {
        List<TripReview> tripReviews = tripReviewRepository.findByWriter(writer);
        return tripReviews.stream().map(TripReviewDto::toDto).toList();
    }

    public List<TripReviewDto> getReviewsByPlanId(Long planId) {
        Plan plan = new Plan();
        plan.setId(planId);
        List<TripReview> tripReviews = tripReviewRepository.findByPlan(plan);
        return tripReviews.stream().map(TripReviewDto::toDto).toList();
    }

    public List<TripReviewDto> getReviewsByTitleContaining(String title) {
        List<TripReview> tripReviews = tripReviewRepository.findByTitleContaining(title);
        return tripReviews.stream().map(TripReviewDto::toDto).toList();
    }
}
