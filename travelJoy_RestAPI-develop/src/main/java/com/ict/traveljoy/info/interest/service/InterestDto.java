package com.ict.traveljoy.info.interest.service;

import com.ict.traveljoy.info.handicaprecommend.service.HandicapRecommendDto;
import com.ict.traveljoy.info.interest.repository.Interest;

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
public class InterestDto {
	private Long id;
	private String interestTopic;
	private Boolean activityPlace;
	private String classification;
	
	public Interest toEntity() {
		return Interest.builder()
				.id(id)
				.interestTopic(interestTopic)
				.activityPlace(activityPlace == true ? 1 : 0)
				.classification(classification)
				.build();
	}
	
	public static InterestDto toDto(Interest interest) {
		return InterestDto.builder()
				.id(interest.getId())
				.interestTopic(interest.getInterestTopic())
				.activityPlace(interest.getActivityPlace() == 1 ? true : false)
				.classification(interest.getClassification())
				.build();
	}
}
