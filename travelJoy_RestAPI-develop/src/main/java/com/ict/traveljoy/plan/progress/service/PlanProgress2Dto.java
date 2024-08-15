package com.ict.traveljoy.plan.progress.service;

import com.ict.traveljoy.plan.repository.Plan;
import com.ict.traveljoy.plan.progress.repository.PlanProgress2;

import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlanProgress2Dto {

    private Long planProgress2Id;
    private Long planId;
    private String detailPlanName;
    private Timestamp detailPlanStartDate;
    private Timestamp detailPlanEndDate;
    private Boolean isEvent;
    private Boolean isFood;
    private Boolean isSight;
    private Boolean isHotel;
    private Long eventId;
    private Long foodId;
    private Long sightId;
    private Long hotelId;

    public PlanProgress2 toEntity() {
        Plan plan = new Plan();
        plan.setId(planId);

        return PlanProgress2.builder()
                .planProgress2Id(planProgress2Id)
                .plan(plan)
                .detailPlanName(detailPlanName)
                .detailPlanStartDate(detailPlanStartDate)
                .detailPlanEndDate(detailPlanEndDate)
                .isEvent(isEvent == true ? 1 : 0)
                .isFood(isFood == true ? 1 : 0)
                .isSight(isSight == true ? 1 : 0)
                .isHotel(isHotel == true ? 1 : 0)
                .eventId(eventId)
                .foodId(foodId)
                .sightId(sightId)
                .hotelId(hotelId)
                .build();
    }

    public static PlanProgress2Dto toDto(PlanProgress2 planProgress2) {
        return PlanProgress2Dto.builder()
                .planProgress2Id(planProgress2.getPlanProgress2Id())
                .planId(planProgress2.getPlan() != null ? planProgress2.getPlan().getId() : null)
                .detailPlanName(planProgress2.getDetailPlanName())
                .detailPlanStartDate(planProgress2.getDetailPlanStartDate())
                .detailPlanEndDate(planProgress2.getDetailPlanEndDate())
                .isEvent(planProgress2.getIsEvent()== 1 ? true : false)
                .isFood(planProgress2.getIsFood()== 1 ? true : false)
                .isSight(planProgress2.getIsSight()== 1 ? true : false)
                .isHotel(planProgress2.getIsHotel()== 1 ? true : false)
                .eventId(planProgress2.getEventId())
                .foodId(planProgress2.getFoodId())
                .sightId(planProgress2.getSightId())
                .hotelId(planProgress2.getHotelId())
                .build();
    }
}
