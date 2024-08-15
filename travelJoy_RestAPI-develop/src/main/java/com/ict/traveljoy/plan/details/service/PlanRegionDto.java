package com.ict.traveljoy.plan.details.service;

import com.ict.traveljoy.plan.repository.Plan;
import com.ict.traveljoy.plan.details.repository.PlanRegion;
import com.ict.traveljoy.place.region.repository.Region;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlanRegionDto {
    private Long planRegionId;
    private Long planId;
    private Long regionId;

    public PlanRegion toEntity() {
        Plan plan = new Plan();
        plan.setId(planId);

        Region region = new Region();
        region.setId(regionId);

        return PlanRegion.builder()
                .planRegionId(planRegionId)
                .plan(plan)
                .region(region)
                .build();
    }

    public static PlanRegionDto toDto(PlanRegion planRegion) {
        return PlanRegionDto.builder()
                .planRegionId(planRegion.getPlanRegionId())
                .planId(planRegion.getPlan()!=null?planRegion.getPlan().getId():null)
                .regionId(planRegion.getRegion()!=null?planRegion.getRegion().getId():null)
                .build();
    }
}
