package com.ict.traveljoy.service.planProgress;

import com.ict.traveljoy.repository.planProgress.PlanProgress2;
import com.ict.traveljoy.repository.planProgress.PlanProgress2Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PlanProgress2Service {

    private final PlanProgress2Repository planProgress2Repository;

    @Autowired
    public PlanProgress2Service(PlanProgress2Repository planProgress2Repository) {
        this.planProgress2Repository = planProgress2Repository;
    }

    // 특정 계획 ID에 해당하는 PlanProgress2 엔티티를 조회하는 메서드
    public List<PlanProgress2Dto> getPlanProgressesByPlanId(Long planId) {
        List<PlanProgress2> planProgresses = planProgress2Repository.findByPlanId(planId);
        return planProgresses.stream()
                .map(PlanProgress2Dto::toDto)
                .collect(Collectors.toList());
    }

    // 특정 이벤트 여부에 해당하는 PlanProgress2 엔티티를 조회하는 메서드
    public List<PlanProgress2Dto> getPlanProgressesByIsEvent(char isEvent) {
        List<PlanProgress2> planProgresses = planProgress2Repository.findByIsEvent(isEvent);
        return planProgresses.stream()
                .map(PlanProgress2Dto::toDto)
                .collect(Collectors.toList());
    }

    // 특정 식사 여부에 해당하는 PlanProgress2 엔티티를 조회하는 메서드
    public List<PlanProgress2Dto> getPlanProgressesByIsFood(char isFood) {
        List<PlanProgress2> planProgresses = planProgress2Repository.findByIsFood(isFood);
        return planProgresses.stream()
                .map(PlanProgress2Dto::toDto)
                .collect(Collectors.toList());
    }

    // 특정 관광지 여부에 해당하는 PlanProgress2 엔티티를 조회하는 메서드
    public List<PlanProgress2Dto> getPlanProgressesByIsSight(char isSight) {
        List<PlanProgress2> planProgresses = planProgress2Repository.findByIsSight(isSight);
        return planProgresses.stream()
                .map(PlanProgress2Dto::toDto)
                .collect(Collectors.toList());
    }

    // 특정 숙박 여부에 해당하는 PlanProgress2 엔티티를 조회하는 메서드
    public List<PlanProgress2Dto> getPlanProgressesByIsHotel(char isHotel) {
        List<PlanProgress2> planProgresses = planProgress2Repository.findByIsHotel(isHotel);
        return planProgresses.stream()
                .map(PlanProgress2Dto::toDto)
                .collect(Collectors.toList());
    }

    // 특정 계획 ID와 상세 계획 시작일, 종료일에 해당하는 PlanProgress2 엔티티를 조회하는 메서드
    public List<PlanProgress2Dto> getPlanProgressesByPlanIdAndDetailPlanStartDateBetween(Long planId, Timestamp startDate, Timestamp endDate) {
        List<PlanProgress2> planProgresses = planProgress2Repository.findByPlanIdAndDetailPlanStartDateBetween(planId, startDate, endDate);
        return planProgresses.stream()
                .map(PlanProgress2Dto::toDto)
                .collect(Collectors.toList());
    }

    // PlanProgress2 저장
    public PlanProgress2Dto savePlanProgress2(PlanProgress2Dto planProgress2Dto) {
        PlanProgress2 planProgress2 = planProgress2Dto.toEntity();
        PlanProgress2 savedPlanProgress2 = planProgress2Repository.save(planProgress2);
        return PlanProgress2Dto.toDto(savedPlanProgress2);
    }

    // PlanProgress2 수정
    public PlanProgress2Dto updatePlanProgress2(PlanProgress2Dto planProgress2Dto) {
        PlanProgress2 existingPlanProgress2 = planProgress2Repository.findById(planProgress2Dto.getPlanProgress2Id()).orElse(null);
        if (existingPlanProgress2 != null) {
            existingPlanProgress2.setPlanId(planProgress2Dto.getPlanId());
            existingPlanProgress2.setDetailPlanName(planProgress2Dto.getDetailPlanName());
            existingPlanProgress2.setDetailPlanStartDate(planProgress2Dto.getDetailPlanStartDate());
            existingPlanProgress2.setDetailPlanEndDate(planProgress2Dto.getDetailPlanEndDate());
            existingPlanProgress2.setIsEvent(planProgress2Dto.getIsEvent());
            existingPlanProgress2.setIsFood(planProgress2Dto.getIsFood());
            existingPlanProgress2.setIsSight(planProgress2Dto.getIsSight());
            existingPlanProgress2.setIsHotel(planProgress2Dto.getIsHotel());
            existingPlanProgress2.setEventId(planProgress2Dto.getEventId());
            existingPlanProgress2.setFoodId(planProgress2Dto.getFoodId());
            existingPlanProgress2.setSightId(planProgress2Dto.getSightId());
            existingPlanProgress2.setHotelId(planProgress2Dto.getHotelId());

            PlanProgress2 updatedPlanProgress2 = planProgress2Repository.save(existingPlanProgress2);
            return PlanProgress2Dto.toDto(updatedPlanProgress2);
        }
        return null;
    }

    // PlanProgress2 삭제
    public void deletePlanProgress2(Long planProgress2Id) {
        planProgress2Repository.deleteById(planProgress2Id);
    }
}