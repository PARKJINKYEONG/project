package com.ict.traveljoy.controller.feedback;

import com.ict.traveljoy.feedback.service.FeedbackDTO;
import com.ict.traveljoy.feedback.service.FeedbackService;

import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Tag(name="피드백 관리", description = "추천 AI에 대한 피드백 CRUD.")
@RequestMapping("/api/feedbacks")
public class FeedbackController {

    private final FeedbackService feedbackService;

    @Autowired
    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    // 모든 Feedback 조회
    @GetMapping("/all")
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
    public ResponseEntity<List<FeedbackDTO>> getFeedbacksByPlanId(@PathVariable("planId") Long planId) {
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
    public ResponseEntity<List<FeedbackDTO>> getFeedbacksByOwner(@PathVariable("owner") String owner) {
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
    public ResponseEntity<List<FeedbackDTO>> getFeedbacksByRate(@PathVariable("rate") Integer rate) {
       try {
            List<FeedbackDTO> feedbacks = feedbackService.getFeedbacksByRate(rate);
            return new ResponseEntity<>(feedbacks, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Feedback 저장
    @PostMapping("/create")
    public ResponseEntity<FeedbackDTO> createFeedback(@RequestBody FeedbackDTO feedbackDto) {
       try {
            FeedbackDTO savedFeedback = feedbackService.saveFeedback(feedbackDto);
            return new ResponseEntity<>(savedFeedback, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 피드백 수정
    @PutMapping("feedbackId")
    public ResponseEntity<FeedbackDTO> updateFeedback(@PathVariable("feedbackId") Long feedbackId, @RequestBody FeedbackDTO feedbackDto) {
       try {
            feedbackDto.setId(feedbackId);
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
    }

    // Feedback 삭제
    @DeleteMapping("/{feedbackId}")
    public ResponseEntity<Void> deleteFeedback(@PathVariable("feedbackId") Long feedbackId) {
       try {
            feedbackService.deleteFeedback(feedbackId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}