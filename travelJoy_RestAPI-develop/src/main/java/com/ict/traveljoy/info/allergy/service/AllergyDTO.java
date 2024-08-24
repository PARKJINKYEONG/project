package com.ict.traveljoy.info.allergy.service;

import com.ict.traveljoy.info.allergy.repository.Allergy;

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
public class AllergyDTO {
	private Long id;
	private String interestTopic;
	private Boolean activityPlace;
	private String classification;
	
	public Allergy toEntity() {
		return Allergy.builder()
				.id(id)
				.interestTopic(interestTopic)
				.activityPlace(activityPlace != null && activityPlace? 1 : 0)
				.classification(classification)
				.build();
	}
	
	public static AllergyDTO toDTO(Allergy allergy) {
		return AllergyDTO.builder()
				.id(allergy.getId())
				.interestTopic(allergy.getInterestTopic())
				.activityPlace(allergy.getActivityPlace() != null && allergy.getActivityPlace() == 1 ? true : false)
				.classification(allergy.getClassification())
				.build();
	}
}
