package com.ict.traveljoy.plan.details.service;

import com.ict.traveljoy.info.allergy.repository.Allergy;
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
public class PlanAllergyDTO {
    private Long planAllergyId;
    private Plan plan;
    private Allergy allergy;

    public PlanAllergy toEntity(){
        return PlanAllergy.builder()
                .id(planAllergyId)
                .plan(plan)
                .allergy(allergy)
                .build();
    }

    public static PlanAllergyDTO toDto(PlanAllergy pa){
        return PlanAllergyDTO.builder()
                .planAllergyId(pa.getId())
                .plan(pa.getPlan())
                .allergy(pa.getAllergy())
                .build();
    }
}
