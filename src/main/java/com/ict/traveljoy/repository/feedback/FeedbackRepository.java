package com.ict.traveljoy.repository.feedback;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

    List<Feedback> findByPlanId(Long planId);

    List<Feedback> findByOwner(String owner);

    List<Feedback> findByRate(Integer rate);
}