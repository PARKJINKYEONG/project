package com.ict.traveljoy.controller.feedback;

import com.ict.traveljoy.feedback.service.FeedbackDTO;
import com.ict.traveljoy.feedback.service.FeedbackService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name="피드백 관리", description = "추천 AI에 대한 피드백 CRUD.")
@RestController
@RequestMapping("/feedbacks")
public class FeedbackController {

    private final FeedbackService feedbackService;

    @Autowired
    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    // 모든 Feedback 조회
    @GetMapping
    public ResponseEntity<List<FeedbackDTO>> getAllFeedbacks() {
        try {
            List<FeedbackDTO> feedbacks = feedbackService.getAllFeedbacks(); // 이 메소드가 FeedbackService에 있어야 합니다.
            return new ResponseEntity<>(feedbacks, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // planId로 Feedback 조회
    @GetMapping("/plan/{planId}")
    public ResponseEntity<List<FeedbackDTO>> getFeedbacksByPlanId(@PathVariable Long planId) {
        try {
            List<FeedbackDTO> feedbacks = feedbackService.getFeedbacksByPlanId(planId);
            return new ResponseEntity<>(feedbacks, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 소유자(owner)로 Feedback 조회
    @GetMapping("/owner/{owner}")
    public ResponseEntity<List<FeedbackDTO>> getFeedbacksByOwner(@PathVariable String owner) {
        try {
            List<FeedbackDTO> feedbacks = feedbackService.getFeedbacksByOwner(owner);
            return new ResponseEntity<>(feedbacks, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 평점(rate)으로 Feedback 조회
    @GetMapping("/rate/{rate}")
    public ResponseEntity<List<FeedbackDTO>> getFeedbacksByRate(@PathVariable Integer rate) {
        try {
            List<FeedbackDTO> feedbacks = feedbackService.getFeedbacksByRate(rate);
            return new ResponseEntity<>(feedbacks, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Feedback 저장
    @PostMapping
    public ResponseEntity<FeedbackDTO> createFeedback(@RequestBody FeedbackDTO feedbackDto) {
        try {
            FeedbackDTO savedFeedback = feedbackService.saveFeedback(feedbackDto);
            return new ResponseEntity<>(savedFeedback, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    /*
    // Feedback 수정
    @PutMapping("/{id}")
    public ResponseEntity<FeedbackDTO> updateFeedback(@PathVariable Long id, @RequestBody FeedbackDTO feedbackDto) {
        try {
            feedbackDto.setId(id); // 수정할 Feedback의 ID 설정
            FeedbackDTO updatedFeedback = feedbackService.updateFeedback(feedbackDto);
            if (updatedFeedback != null) {
                return new ResponseEntity<>(updatedFeedback, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }*/

    // Feedback 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFeedback(@PathVariable Long id) {
        try {
            feedbackService.deleteFeedback(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
