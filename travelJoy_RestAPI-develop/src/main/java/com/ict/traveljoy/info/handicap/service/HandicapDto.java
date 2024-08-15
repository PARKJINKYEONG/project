package com.ict.traveljoy.info.handicap.service;

import com.ict.traveljoy.info.allergy.service.AllergyDto;
import com.ict.traveljoy.info.handicap.repository.Handicap;

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
public class HandicapDto {
	private Long id;
	private String handicapCode;
	private String handicapType;
	
	public Handicap toEntity() {
		return Handicap.builder()
				.id(id)
				.handicapCode(handicapCode)
				.handicapType(handicapType)
				.build();
	}
	public static HandicapDto toDto(Handicap handicap) {
		return HandicapDto.builder()
				.id(handicap.getId())
				.handicapCode(handicap.getHandicapCode())
				.handicapType(handicap.getHandicapType())
				.build();
	}
}
