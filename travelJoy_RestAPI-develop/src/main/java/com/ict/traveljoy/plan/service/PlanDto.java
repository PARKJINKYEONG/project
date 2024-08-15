package com.ict.traveljoy.plan.service;

import java.time.LocalDateTime;

import com.ict.traveljoy.plan.repository.Plan;

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
	private Long planId;
	private String planName;
	private String planDescriptions;
	private LocalDateTime createDate;
	private Boolean isActive;
	private Boolean isDelete;
	private LocalDateTime deleteDate;
	private Integer progress;
	
	public Plan toEntity() {
		return Plan.builder()
				.id(planId)
				.planName(planName)
				.planDescriptions(planDescriptions)
				.createDate(createDate)
				.isActive(isActive == true ? 1 : 0)
				.isDelete(isDelete == true ? 1 : 0)
				.deleteDate(deleteDate)
				.progress(progress)
				.build();
	}
	public static PlanDto toDto(Plan plans) {
		return PlanDto.builder()
				.planId(plans.getId())
				.planName(plans.getPlanName())
				.planDescriptions(plans.getPlanDescriptions())
				.createDate(plans.getCreateDate())
				.isActive(plans.getIsActive() == 1 ? true : false)
				.isDelete(plans.getIsDelete() == 1 ? true : false)
				.deleteDate(plans.getDeleteDate())
				.progress(plans.getProgress())
				.build();
	}
}
