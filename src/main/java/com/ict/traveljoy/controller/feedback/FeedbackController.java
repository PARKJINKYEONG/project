package com.ict.traveljoy.controller.feedback;

import com.ict.traveljoy.feedback.service.FeedbackDTO;
import com.ict.traveljoy.feedback.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/feedbacks")
public class FeedbackController {

    private final FeedbackService feedbackService;

    @Autowired
    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    // 모든 피드백 조회
    @GetMapping
    public ResponseEntity<List<FeedbackDTO>> getAllFeedbacks() {
        List<FeedbackDTO> feedbacks = feedbackService.getAllFeedbacks();
        return ResponseEntity.ok(feedbacks);
    }

    // 특정 planId로 피드백 조회
    @GetMapping("/plan/{planId}")
    public ResponseEntity<List<FeedbackDTO>> getFeedbacksByPlanId(@PathVariable Long planId) {
        List<FeedbackDTO> feedbacks = feedbackService.getFeedbacksByPlanId(planId);
        return ResponseEntity.ok(feedbacks);
    }

    // 특정 owner로 피드백 조회
    @GetMapping("/owner/{owner}")
    public ResponseEntity<List<FeedbackDTO>> getFeedbacksByOwner(@PathVariable String owner) {
        List<FeedbackDTO> feedbacks = feedbackService.getFeedbacksByOwner(owner);
        return ResponseEntity.ok(feedbacks);
    }

    // 특정 rate로 피드백 조회
    @GetMapping("/rate/{rate}")
    public ResponseEntity<List<FeedbackDTO>> getFeedbacksByRate(@PathVariable Integer rate) {
        List<FeedbackDTO> feedbacks = feedbackService.getFeedbacksByRate(rate);
        return ResponseEntity.ok(feedbacks);
    }

    // 피드백 생성
    @PostMapping
    public ResponseEntity<FeedbackDTO> createFeedback(@RequestBody FeedbackDTO feedbackDto) {
        FeedbackDTO createdFeedback = feedbackService.saveFeedback(feedbackDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdFeedback);
    }

    // 피드백 수정
    @PutMapping
    public ResponseEntity<FeedbackDTO> updateFeedback(@RequestBody FeedbackDTO feedbackDto) {
        FeedbackDTO updatedFeedback = feedbackService.updateFeedback(feedbackDto);
        if (updatedFeedback != null) {
            return ResponseEntity.ok(updatedFeedback);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // 피드백 삭제
    @DeleteMapping("/{feedbackId}")
    public ResponseEntity<Void> deleteFeedback(@PathVariable Long feedbackId) {
        feedbackService.deleteFeedback(feedbackId);
        return ResponseEntity.noContent().build();
    }
}
