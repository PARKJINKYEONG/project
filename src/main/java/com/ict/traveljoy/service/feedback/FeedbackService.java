package com.ict.traveljoy.service.feedback;

import com.ict.traveljoy.repository.feedback.Feedback;
import com.ict.traveljoy.repository.feedback.FeedbackRepository;
import com.ict.traveljoy.repository.plan.Plan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;

    @Autowired
    public FeedbackService(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    // planId로 Feedback 조회
    public List<FeedbackDto> getFeedbacksByPlanId(Long planId) {
        List<Feedback> feedbacks = feedbackRepository.findByPlan_PlanId(planId);
        return feedbacks.stream()
                .map(FeedbackDto::toDto)
                .collect(Collectors.toList());
    }

    // 소유자(owner)로 Feedback 조회
    public List<FeedbackDto> getFeedbacksByOwner(String owner) {
        List<Feedback> feedbacks = feedbackRepository.findByOwner(owner);
        return feedbacks.stream()
                .map(FeedbackDto::toDto)
                .collect(Collectors.toList());
    }

    // 평점(rate)으로 Feedback 조회
    public List<FeedbackDto> getFeedbacksByRate(Integer rate) {
        List<Feedback> feedbacks = feedbackRepository.findByRate(rate);
        return feedbacks.stream()
                .map(FeedbackDto::toDto)
                .collect(Collectors.toList());
    }

    // Feedback 저장
    public FeedbackDto saveFeedback(FeedbackDto feedbackDto) {
        Feedback feedback = feedbackDto.toEntity();
        if (feedbackDto.getPlanId() != null) {
            Plan plan = new Plan();
            plan.setPlanId(feedbackDto.getPlanId());
            feedback.setPlan(plan);
        }
        Feedback savedFeedback = feedbackRepository.save(feedback);
        return FeedbackDto.toDto(savedFeedback);
    }

    // Feedback 수정
    public FeedbackDto updateFeedback(FeedbackDto feedbackDto) {
        Feedback existingFeedback = feedbackRepository.findById(feedbackDto.getFeedbackId()).orElse(null);
        if (existingFeedback != null) {
            Plan plan = new Plan();
            plan.setPlanId(feedbackDto.getPlanId());
            existingFeedback.setPlan(plan);
            existingFeedback.setOwner(feedbackDto.getOwner());
            existingFeedback.setRate(feedbackDto.getRate());

            Feedback updatedFeedback = feedbackRepository.save(existingFeedback);
            return FeedbackDto.toDto(updatedFeedback);
        }
        return null; // 수정할 Feedback이 없는 경우
    }

    // Feedback 삭제
    public void deleteFeedback(Long feedbackId) {
        feedbackRepository.deleteById(feedbackId);
    }
}
