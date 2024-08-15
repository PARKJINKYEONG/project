package com.ict.traveljoy.feedback.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

    List<Feedback> findByPlanId(Long planId);

    List<Feedback> findByOwner(String owner);

    List<Feedback> findByRate(Integer rate);
}
