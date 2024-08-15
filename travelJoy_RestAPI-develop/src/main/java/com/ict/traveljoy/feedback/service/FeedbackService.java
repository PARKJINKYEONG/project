package com.ict.traveljoy.feedback.service;

import com.ict.traveljoy.feedback.repository.Feedback;
import com.ict.traveljoy.feedback.repository.FeedbackRepository;
import com.ict.traveljoy.plan.repository.Plan;
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
    public List<FeedbackDTO> getFeedbacksByPlanId(Long planId) {
        List<Feedback> feedbacks = feedbackRepository.findByPlanId(planId);
        return feedbacks.stream()
                .map(FeedbackDTO::toDto)
                .collect(Collectors.toList());
    }

    // 소유자(owner)로 Feedback 조회
    public List<FeedbackDTO> getFeedbacksByOwner(String owner) {
        List<Feedback> feedbacks = feedbackRepository.findByOwner(owner);
        return feedbacks.stream()
                .map(FeedbackDTO::toDto)
                .collect(Collectors.toList());
    }

    // 평점(rate)으로 Feedback 조회
    public List<FeedbackDTO> getFeedbacksByRate(Integer rate) {
        List<Feedback> feedbacks = feedbackRepository.findByRate(rate);
        return feedbacks.stream()
                .map(FeedbackDTO::toDto)
                .collect(Collectors.toList());
    }

    // Feedback 저장
    public FeedbackDTO saveFeedback(FeedbackDTO feedbackDto) {
        Feedback feedback = feedbackDto.toEntity();
//        if (feedbackDto.getPlanId() != null) {
//            Plan plan = new Plan();
//            plan.setId(feedbackDto.getPlanId());
//            feedback.setPlan(plan);
//        }
        Feedback savedFeedback = feedbackRepository.save(feedback);
        return FeedbackDTO.toDto(savedFeedback);
    }

    // Feedback 수정
    public FeedbackDTO updateFeedback(FeedbackDTO feedbackDto) {
        Feedback existingFeedback = feedbackRepository.findById(feedbackDto.getId()).orElse(null);
        if (existingFeedback != null) {
            Plan plan = new Plan();
            //plan.setId(feedbackDto.getPlanId());
            existingFeedback.setPlan(plan);
            existingFeedback.setOwner(feedbackDto.getOwner());
            existingFeedback.setRate(feedbackDto.getRate());

            Feedback updatedFeedback = feedbackRepository.save(existingFeedback);
            return FeedbackDTO.toDto(updatedFeedback);
        }
        return null; // 수정할 Feedback이 없는 경우
    }

    // Feedback 삭제
    public void deleteFeedback(Long feedbackId) {
        feedbackRepository.deleteById(feedbackId);
    }
}
