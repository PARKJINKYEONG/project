package com.ict.traveljoy.plan.details.service;

import com.ict.traveljoy.plan.repository.Plan;
import com.ict.traveljoy.info.interest.repository.Interest;
import com.ict.traveljoy.plan.details.repository.PlanInterest;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlanInterestDto {

    private Long planInterestId;
    private Long planId; 
    private Long interestId;

    public PlanInterest toEntity() {
        Plan plan = new Plan();
        Interest interest = new Interest();
        
        plan.setId(planId);
        interest.setId(interestId);
        
        return PlanInterest.builder()
                .id(planInterestId)
                .plan(plan)
                .interest(interest)
                .build();
    }

    public static PlanInterestDto toDto(PlanInterest planInterest) {
        return PlanInterestDto.builder()
                .planInterestId(planInterest.getId())
                .planId(planInterest.getPlan()!=null ?planInterest.getPlan().getId():null)
                .interestId(planInterest.getInterest()!=null?planInterest.getInterest().getId():null)
                .build();
    }
}
