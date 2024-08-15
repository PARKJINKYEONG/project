package com.ict.traveljoy.plan.progress.service;

import com.ict.traveljoy.plan.repository.Plan;
import com.ict.traveljoy.plan.progress.repository.PlanProgress4;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlanProgress4Dto {

    private Long planProgress4Id;
    private Long planId;
    private Long aiMadePlanId;

    public PlanProgress4 toEntity() {
        Plan plan = new Plan();
        plan.setId(planId);

        Plan aiMadePlan = new Plan();
        aiMadePlan.setId(aiMadePlanId);

        return PlanProgress4.builder()
                .planProgress4Id(planProgress4Id)
                .plan(plan)
                .aiMadePlan(aiMadePlan)
                .build();
    }

    public static PlanProgress4Dto toDto(PlanProgress4 planProgress4) {
        return PlanProgress4Dto.builder()
                .planProgress4Id(planProgress4.getPlanProgress4Id())
                .planId(planProgress4.getPlan() != null ? planProgress4.getPlan().getId() : null)
                .aiMadePlanId(planProgress4.getAiMadePlan() != null ? planProgress4.getAiMadePlan().getId() : null)
                .build();
    }
}
