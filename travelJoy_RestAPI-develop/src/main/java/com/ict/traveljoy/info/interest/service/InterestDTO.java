package com.ict.traveljoy.info.interest.service;

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
public class InterestDTO {
	private Long id;
	private String interestTopic;
	private Boolean activityPlace;
	private String classification;
	
	public Interest toEntity() {
		return Interest.builder()
				.id(id)
				.interestTopic(interestTopic)
				.activityPlace(activityPlace != null && activityPlace ? 1 : 0)
				.classification(classification)
				.build();
	}
	
	public static InterestDTO toDTO(Interest interest) {
		return InterestDTO.builder()
				.id(interest.getId())
				.interestTopic(interest.getInterestTopic())
				.activityPlace(interest.getActivityPlace()!=null && interest.getActivityPlace() == 1 ? true : false)
				.classification(interest.getClassification())
				.build();
	}
}
