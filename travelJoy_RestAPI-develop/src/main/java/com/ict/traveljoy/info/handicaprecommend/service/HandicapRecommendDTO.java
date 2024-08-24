package com.ict.traveljoy.info.handicaprecommend.service;

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
public class HandicapRecommendDTO {
	
	private Long id;
	private Handicap handicap;
	private Interest interest;
	
	public HandicapRecommend toEntity() {
		
		return HandicapRecommend.builder()
				.id(id)
				.handicap(handicap)
				.interest(interest)
				.build();
	}
	
	public static HandicapRecommendDTO toDTO(HandicapRecommend handicapRecommend) {
		
		return HandicapRecommendDTO.builder()
				.id(handicapRecommend.getId())
				.handicap(handicapRecommend.getHandicap())
				.interest(handicapRecommend.getInterest())
				.build();
	}
}
