package com.ict.traveljoy.service.tripReview;

import java.sql.Timestamp;

import com.ict.traveljoy.repository.tripReview.TripReview;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TripReviewDto {
	private long tripReviewId;
	private long planId;
	private String writer;
	private String title;
	private String reviewContent;
	private String isActive;
	private String isDelete;
	private Timestamp deleteDate;
	
	public TripReview toEntity() {
		return TripReview.builder()
				.tripReviewId(tripReviewId)
				.planId(planId)
				.writer(writer)
				.title(title)
				.reviewContent(reviewContent)
				.isActive(isActive)
				.isDelete(isDelete)
				.deleteDate(deleteDate)
				.build();
	}
	
	public static TripReviewDto toDto(TripReview trw) {
		return TripReviewDto.builder()
				.tripReviewId(trw.getTripReviewId())
				.planId(trw.getPlanId())
				.writer(trw.getWriter())
				.title(trw.getTitle())
				.reviewContent(trw.getReviewContent())
				.isActive(trw.getIsActive())
				.isDelete(trw.getIsDelete())
				.deleteDate(trw.getDeleteDate())
				.build();
	}
}
