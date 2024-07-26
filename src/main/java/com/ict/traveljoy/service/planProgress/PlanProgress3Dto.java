package com.ict.traveljoy.service.planProgress;

import com.ict.traveljoy.repository.planProgress.PlanProgress3;

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
public class PlanProgress3Dto {
	private long planProgress3Id;
	private long planId;
	private char isTransportation;
	private char isDistance;
	private char isPrice;
	private char isRate;
	private long minimumCost;
	private long maximumCost;
	private Integer minimumRate;
	private Integer maximumRate;
	
	public PlanProgress3 toEntity() {
		return PlanProgress3.builder()
				.planProgress3Id(planProgress3Id)
				.planId(planId)
				.isTransportation(isTransportation)
				.isDistance(isDistance)
				.isPrice(isPrice)
				.isRate(isRate)
				.minimumCost(minimumCost)
				.maximumCost(maximumCost)
				.minimumRate(minimumRate)
				.maximumRate(maximumRate)
				.build();
	}
	
	public static PlanProgress3Dto toDto(PlanProgress3 pp3) {
		return PlanProgress3Dto.builder()
				.planProgress3Id(pp3.getPlanProgress3Id())
				.planId(pp3.getPlanId())
				.isTransportation(pp3.getIsTransportation())
				.isDistance(pp3.getIsDistance())
				.isPrice(pp3.getIsPrice())
				.isRate(pp3.getIsRate())
				.minimumCost(pp3.getMinimumCost())
				.maximumCost(pp3.getMaximumCost())
				.minimumRate(pp3.getMinimumRate())
				.maximumRate(pp3.getMaximumRate())
				.build();
	}
}
