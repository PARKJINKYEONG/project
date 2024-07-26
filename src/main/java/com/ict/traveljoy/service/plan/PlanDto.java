package com.ict.traveljoy.service.plan;

import java.time.LocalDateTime;

import com.ict.traveljoy.repository.plan.Plan;

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
public class PlanDto {
	private long planId;
	private String planName;
	private String planDescriptions;
	private LocalDateTime createDate;
	private String isActive;
	private String isDelete;
	private LocalDateTime deleteDate;
	private Integer progress;
	
	public Plan toEntity() {
		return Plan.builder()
				.planId(planId)
				.planName(planName)
				.planDescriptions(planDescriptions)
				.createDate(createDate)
				.isActive(isActive)
				.isDelete(isDelete)
				.deleteDate(deleteDate)
				.progress(progress)
				.build();
	}
	public static PlanDto toDto(Plan plans) {
		return PlanDto.builder()
				.planId(plans.getPlanId())
				.planName(plans.getPlanName())
				.planDescriptions(plans.getPlanDescriptions())
				.createDate(plans.getCreateDate())
				.isActive(plans.getIsActive())
				.isDelete(plans.getIsDelete())
				.deleteDate(plans.getDeleteDate())
				.progress(plans.getProgress())
				.build();
	}
}
