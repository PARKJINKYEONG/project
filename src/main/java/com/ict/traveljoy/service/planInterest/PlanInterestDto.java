package com.ict.traveljoy.service.planInterest;

import com.ict.traveljoy.repository.planInterest.PlanInterest;

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
public class PlanInterestDto {
	private long planInterestId;
	private long planId;
	
	public PlanInterest toEntity() {
		return PlanInterest.builder()
				.planInterestId(planInterestId)
				.planId(planId)
				.build();
	}
	
	public static PlanInterestDto toDto(PlanInterest pinter) {
		return PlanInterestDto.builder()
				.planInterestId(pinter.getInterestId())
				.planId(pinter.getPlanId())
				.build();
	}
}
