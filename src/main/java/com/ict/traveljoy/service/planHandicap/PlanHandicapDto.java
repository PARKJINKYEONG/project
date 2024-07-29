package com.ict.traveljoy.service.planHandicap;

import com.ict.traveljoy.repository.planHandicap.PlanHandicap;
import com.ict.traveljoy.repository.plan.Plan;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlanHandicapDto {

    private Long planHandicapId;
    private Long planId; // 외래키 Plan의 기본키
    private Long handicapId;

    public PlanHandicap toEntity() {
        Plan plan = new Plan();
        plan.setPlanId(planId);

        return PlanHandicap.builder()
                .planHandicapId(planHandicapId)
                .plan(plan)
                .handicapId(handicapId)
                .build();
    }

    public static PlanHandicapDto toDto(PlanHandicap planHandicap) {
        return PlanHandicapDto.builder()
                .planHandicapId(planHandicap.getPlanHandicapId())
                .planId(planHandicap.getPlan().getPlanId())
                .handicapId(planHandicap.getHandicapId())
                .build();
    }
}