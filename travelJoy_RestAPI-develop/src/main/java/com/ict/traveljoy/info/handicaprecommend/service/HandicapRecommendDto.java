package com.ict.traveljoy.info.handicaprecommend.service;

import com.ict.traveljoy.info.allergymedicine.service.AllergyMedicineDto;
import com.ict.traveljoy.info.handicap.repository.Handicap;
import com.ict.traveljoy.info.handicaprecommend.repository.HandicapRecommend;
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
public class HandicapRecommendDto {
	
	private Long id;
	private Long handicapId;
	private Long interestId;
	
	public HandicapRecommend toEntity() {
		Handicap handicap = new Handicap();
		Interest interest = new Interest();
		
		handicap.setId(handicapId);
		interest.setId(interestId);
		
		return HandicapRecommend.builder()
				.id(handicapId)
				.handicap(handicap)
				.interest(interest)
				.build();
	}
	
	public static HandicapRecommendDto toDto(HandicapRecommend handicapRecommend) {
		
		return HandicapRecommendDto.builder()
				.id(handicapRecommend.getId())
				.handicapId(handicapRecommend.getHandicap() != null ? handicapRecommend.getHandicap().getId() : null)
				.interestId(handicapRecommend.getInterest() != null ? handicapRecommend.getInterest().getId() : null)
				.build();
	}
}
