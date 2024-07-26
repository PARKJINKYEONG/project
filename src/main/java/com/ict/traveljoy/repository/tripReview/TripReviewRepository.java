package com.ict.traveljoy.repository.tripReview;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TripReviewRepository extends JpaRepository<TripReview, Long> {

    List<TripReview> findByWriter(String writer);

    List<TripReview> findByIsActive(String isActive);

    List<TripReview> findByPlanId(Long planId);

    List<TripReview> findByTitleContaining(String title);
}
