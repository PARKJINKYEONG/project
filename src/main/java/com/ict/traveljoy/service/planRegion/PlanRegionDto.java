package com.ict.traveljoy.service.planRegion;

import com.ict.traveljoy.repository.plan.Plan;
import com.ict.traveljoy.repository.planRegion.PlanRegion;
import com.ict.traveljoy.repository.region.Region;
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
        PlanRegion planRegion = new PlanRegion();
        planRegion.setPlanRegionId(planRegionId);

        Plan plan = new Plan();
        plan.setPlanId(planId);
        planRegion.setPlan(plan);

        Region region = new Region();
        region.setRegionId(regionId);
        planRegion.setRegion(region);

        return planRegion;
    }

    public static PlanRegionDto toDto(PlanRegion planRegion) {
        return PlanRegionDto.builder()
                .planRegionId(planRegion.getPlanRegionId())
                .planId(planRegion.getPlan().getPlanId())
                .regionId(planRegion.getRegion().getRegionId())
                .build();
    }
}
