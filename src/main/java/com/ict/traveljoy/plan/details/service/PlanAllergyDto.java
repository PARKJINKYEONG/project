package com.ict.traveljoy.plan.details.service;

import com.ict.traveljoy.info.repository.Allergy;
import com.ict.traveljoy.plan.details.repository.PlanAllergy;
import com.ict.traveljoy.plan.repository.Plan;

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
public class PlanAllergyDto {
    private long planAllergyId;
    private Plan plan;
    private Allergy allergy;

    public PlanAllergy toEntity(){
        return PlanAllergy.builder()
                .planAllergyId(planAllergyId)
                .plan(plan)
                .allergy(allergy)
                .build();
    }

    public static PlanAllergyDto toDto(PlanAllergy pa){
        return PlanAllergyDto.builder()
                .planAllergyId(pa.getPlanAllergyId())
                .plan(pa.getPlan())
                .allergy(pa.getAllergy())
                .build();
    }
}
