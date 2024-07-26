package com.ict.traveljoy.service.planHandicap;

import com.ict.traveljoy.repository.planHandicap.PlanHandicap;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlanHandicapDto {

    private Long planHandicapId;
    private Long planId;
    private Long handicapId;

    public PlanHandicap toEntity() {
        return PlanHandicap.builder()
                .planHandicapId(planHandicapId)
                .planId(planId)
                .handicapId(handicapId)
                .build();
    }

    public static PlanHandicapDto toDto(PlanHandicap planHandicap) {
        return PlanHandicapDto.builder()
                .planHandicapId(planHandicap.getPlanHandicapId())
                .planId(planHandicap.getPlanId())
                .handicapId(planHandicap.getHandicapId())
                .build();
    }
}
