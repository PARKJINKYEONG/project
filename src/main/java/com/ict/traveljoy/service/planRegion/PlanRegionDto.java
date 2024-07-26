package com.ict.traveljoy.service.planRegion;

import com.ict.traveljoy.repository.planRegion.PlanRegion;

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
        return PlanRegion.builder()
                .planRegionId(planRegionId)
                .planId(planId)
                .regionId(regionId)
                .build();
    }

    public static PlanRegionDto toDto(PlanRegion planRegion) {
        return PlanRegionDto.builder()
                .planRegionId(planRegion.getPlanRegionId())
                .planId(planRegion.getPlanId())
                .regionId(planRegion.getRegionId())
                .build();
    }
}
