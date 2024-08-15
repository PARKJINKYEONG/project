package com.ict.traveljoy.plan.details.service;

import com.ict.traveljoy.info.handicap.repository.Handicap;
import com.ict.traveljoy.plan.details.repository.PlanHandicap;
import com.ict.traveljoy.plan.repository.Plan;

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
        Plan plan = new Plan();
        Handicap handicap = new Handicap();
        
        plan.setId(planId);
        handicap.setId(handicapId);

        return PlanHandicap.builder()
                .planHandicapId(planHandicapId)
                .plan(plan)
                .handicap(handicap)
                .build();
    }

    public static PlanHandicapDto toDto(PlanHandicap planHandicap) {
        return PlanHandicapDto.builder()
                .planHandicapId(planHandicap.getPlanHandicapId())
                .planId(planHandicap.getPlan()!= null ? planHandicap.getPlan().getId() : null) 
                .handicapId(planHandicap.getHandicap()!= null ? planHandicap.getHandicap().getId() : null)
                .build();
    }
}
