package com.ict.traveljoy.service.planProgress;

import java.math.BigDecimal;
import java.util.Date;

import com.ict.traveljoy.repository.planProgress.PlanProgress1;

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
public class PlanProgress1Dto {
    private long planProgress1Id;
    private Date planStartDate;
    private Date planEndDate;
    private Integer travelers;
    private BigDecimal travelCost;
    private long planId;

    public PlanProgress1 toEntity() {
        return PlanProgress1.builder()
                .planProgress1Id(planProgress1Id)
                .planStartDate(planStartDate)
                .planEndDate(planEndDate)
                .travelers(travelers)
                .travelCost(travelCost)
                .planId(planId)
                .build();
    }

    public static PlanProgress1Dto toDto(PlanProgress1 pp1) {
        return PlanProgress1Dto.builder()
                .planProgress1Id(pp1.getPlanProgress1Id())
                .planStartDate(pp1.getPlanStartDate())
                .planEndDate(pp1.getPlanEndDate())
                .travelers(pp1.getTravelers())
                .travelCost(pp1.getTravelCost())
                .planId(pp1.getPlanId())
                .build();
    }
}
