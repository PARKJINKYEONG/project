package com.ict.traveljoy.service.feedback;

import com.ict.traveljoy.repository.feedback.Feedback;

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
public class FeedbackDto {
	private long feedbackId;
	private long planId;
	private String owner;
	private Integer rate;
	
	public Feedback toEntity() {
		return Feedback.builder()
				.feedbackId(feedbackId)
				.planId(planId)
				.owner(owner)
				.rate(rate)
				.build();
	}
	
	public static FeedbackDto toDto(Feedback fbk) {
		return FeedbackDto.builder()
				.feedbackId(fbk.getFeedbackId())
				.planId(fbk.getPlanId())
				.owner(fbk.getOwner())
				.rate(fbk.getRate())
				.build();
	}
}
