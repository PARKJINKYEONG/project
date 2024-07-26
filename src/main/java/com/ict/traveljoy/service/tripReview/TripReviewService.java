package com.ict.traveljoy.service.tripReview;

import com.ict.traveljoy.repository.tripReview.TripReview;
import com.ict.traveljoy.repository.tripReview.TripReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class TripReviewService {

    private final TripReviewRepository tripReviewRepository;

    @Autowired
    public TripReviewService(TripReviewRepository tripReviewRepository) {
        this.tripReviewRepository = tripReviewRepository;
    }

    // 작성자로 TripReview 조회
    public List<TripReviewDto> getTripReviewsByWriter(String writer) {
        List<TripReview> tripReviews = tripReviewRepository.findByWriter(writer);
        return tripReviews.stream()
                .map(TripReviewDto::toDto)
                .collect(Collectors.toList());
    }

    // isActive 여부로 TripReview 조회
    public List<TripReviewDto> getTripReviewsByIsActive(String isActive) {
        List<TripReview> tripReviews = tripReviewRepository.findByIsActive(isActive);
        return tripReviews.stream()
                .map(TripReviewDto::toDto)
                .collect(Collectors.toList());
    }

    // planId로 TripReview 조회
    public List<TripReviewDto> getTripReviewsByPlanId(Long planId) {
        List<TripReview> tripReviews = tripReviewRepository.findByPlanId(planId);
        return tripReviews.stream()
                .map(TripReviewDto::toDto)
                .collect(Collectors.toList());
    }

    // 제목에 특정 단어가 포함된 TripReview 조회
    public List<TripReviewDto> getTripReviewsByTitleContaining(String title) {
        List<TripReview> tripReviews = tripReviewRepository.findByTitleContaining(title);
        return tripReviews.stream()
                .map(TripReviewDto::toDto)
                .collect(Collectors.toList());
    }

    // TripReview 저장
    public TripReviewDto saveTripReview(TripReviewDto tripReviewDto) {
        TripReview tripReview = tripReviewDto.toEntity();
        TripReview savedTripReview = tripReviewRepository.save(tripReview);
        return TripReviewDto.toDto(savedTripReview);
    }

    // TripReview 수정
    public TripReviewDto updateTripReview(TripReviewDto tripReviewDto) {
        TripReview existingTripReview = tripReviewRepository.findById(tripReviewDto.getTripReviewId()).orElse(null);
        if (existingTripReview != null) {
            existingTripReview.setPlanId(tripReviewDto.getPlanId());
            existingTripReview.setWriter(tripReviewDto.getWriter());
            existingTripReview.setTitle(tripReviewDto.getTitle());
            existingTripReview.setReviewContent(tripReviewDto.getReviewContent());
            existingTripReview.setIsActive(tripReviewDto.getIsActive());
            existingTripReview.setIsDelete(tripReviewDto.getIsDelete());
            existingTripReview.setDeleteDate(tripReviewDto.getDeleteDate());

            TripReview updatedTripReview = tripReviewRepository.save(existingTripReview);
            return TripReviewDto.toDto(updatedTripReview);
        }
        return null; // 수정할 TripReview가 없는 경우
    }

    // TripReview 삭제
    public void deleteTripReview(Long tripReviewId) {
        tripReviewRepository.deleteById(tripReviewId);
    }
}
