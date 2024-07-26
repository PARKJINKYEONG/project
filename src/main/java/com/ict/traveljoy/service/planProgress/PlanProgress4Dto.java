package com.ict.traveljoy.service.planProgress;

import com.ict.traveljoy.repository.planProgress.PlanProgress4;

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
public class PlanProgress4Dto {
	private long planProgress4Id;
	private long planId;
	private long aiMadePlanId;
	
	public PlanProgress4 toEntity() {
		return PlanProgress4.builder()
				.planProgress4Id(planProgress4Id)
				.planId(planId)
				.aiMadePlanId(aiMadePlanId)
				.build();
	}
	
	public static PlanProgress4Dto toDto(PlanProgress4 pp4) {
		return PlanProgress4Dto.builder()
				.planProgress4Id(pp4.getPlanProgress4Id())
				.planId(pp4.getPlanId())
				.aiMadePlanId(pp4.getAiMadePlanId())
				.build();
	}
}
