package com.ict.traveljoy.service.planInterest;

import com.ict.traveljoy.repository.plan.Plan;
import com.ict.traveljoy.repository.planInterest.PlanInterest;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlanInterestDto {

    private Long planInterestId;
    private Long planId; // 외래키 Plan의 기본키
    private Long interestId;

    public PlanInterest toEntity() {
        Plan plan = new Plan();
        plan.setPlanId(planId); 

        return PlanInterest.builder()
                .planInterestId(planInterestId)
                .plan(plan)
                .interestId(interestId)
                .build();
    }

    public static PlanInterestDto toDto(PlanInterest planInterest) {
        return PlanInterestDto.builder()
                .planInterestId(planInterest.getPlanInterestId())
                .planId(planInterest.getPlan().getPlanId())
                .interestId(planInterest.getInterestId())
                .build();
    }
}
