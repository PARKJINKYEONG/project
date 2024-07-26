package com.ict.traveljoy.service.planProgress;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Date;

import com.ict.traveljoy.repository.planProgress.PlanProgress2;

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
public class PlanProgress2Dto {
	private long planProgress2Id;
	private long planId;
	private String detailPlanName;
	private Timestamp detailPlanStartDate;
	private Timestamp detailPlanEndDate;
	private char isEvent;
	private char isFood;
	private char isSight;
	private char isHotel;
	private Long eventId;
	private Long foodId;
	private Long sightId;
	private Long hotelId;
	
	public PlanProgress2 toEntity() {
		return PlanProgress2.builder()
				.planProgress2Id(planProgress2Id)
				.planId(planId)
				.detailPlanName(detailPlanName)
				.detailPlanStartDate(detailPlanStartDate)
				.detailPlanEndDate(detailPlanEndDate)
				.isEvent(isEvent)
				.isFood(isFood)
				.isSight(isSight)
				.isHotel(isHotel)
				.eventId(eventId)
				.foodId(foodId)
				.sightId(sightId)
				.hotelId(hotelId)
				.build();
	}
	
	public static PlanProgress2Dto toDto(PlanProgress2 pp2) {
		return PlanProgress2Dto.builder()
				.planProgress2Id(pp2.getPlanProgress2Id())
				.planId(pp2.getPlanId())
				.detailPlanName(pp2.getDetailPlanName())
				.detailPlanStartDate(pp2.getDetailPlanStartDate())
				.detailPlanEndDate(pp2.getDetailPlanEndDate())
				.isEvent(pp2.getIsEvent())
				.isFood(pp2.getIsFood())
				.isSight(pp2.getIsSight())
				.isHotel(pp2.getIsHotel())
				.eventId(pp2.getEventId())
				.foodId(pp2.getFoodId())
				.sightId(pp2.getSightId())
				.hotelId(pp2.getHotelId())				
				.build();
				
	}
}
