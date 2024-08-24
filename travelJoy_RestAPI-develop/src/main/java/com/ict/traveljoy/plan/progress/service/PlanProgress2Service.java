package com.ict.traveljoy.plan.progress.service;

import com.ict.traveljoy.plan.repository.Plan;
import com.ict.traveljoy.plan.repository.PlanRepository;
import com.ict.traveljoy.plan.progress.repository.PlanProgress2;
import com.ict.traveljoy.plan.progress.repository.PlanProgress2Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class PlanProgress2Service {

    private final PlanProgress2Repository planProgress2Repository;
    private final PlanRepository planRepository; // PlanRepository 추가 필요

    @Autowired
    public PlanProgress2Service(PlanProgress2Repository planProgress2Repository, PlanRepository planRepository) {
        this.planProgress2Repository = planProgress2Repository;
        this.planRepository = planRepository;
    }

    // 특정 계획 ID에 해당하는 PlanProgress2 엔티티를 조회하는 메서드
    public List<PlanProgress2Dto> getPlanProgressesByPlanId(Long planId) {
        List<PlanProgress2> planProgresses = planProgress2Repository.findByPlan_id(planId);
        return planProgresses.stream()
                .map(PlanProgress2Dto::toDto)
                .collect(Collectors.toList());
    }

    // 특정 이벤트 여부에 해당하는 PlanProgress2 엔티티를 조회하는 메서드
    public List<PlanProgress2Dto> getPlanProgressesByIsEvent(Integer isEvent) {
        List<PlanProgress2> planProgresses = planProgress2Repository.findByIsEvent(isEvent);
        return planProgresses.stream()
                .map(PlanProgress2Dto::toDto)
                .collect(Collectors.toList());
    }

    // 특정 식사 여부에 해당하는 PlanProgress2 엔티티를 조회하는 메서드
    public List<PlanProgress2Dto> getPlanProgressesByIsFood(Integer isFood) {
        List<PlanProgress2> planProgresses = planProgress2Repository.findByIsFood(isFood);
        return planProgresses.stream()
                .map(PlanProgress2Dto::toDto)
                .collect(Collectors.toList());
    }

    // 특정 관광지 여부에 해당하는 PlanProgress2 엔티티를 조회하는 메서드
    public List<PlanProgress2Dto> getPlanProgressesByIsSight(Integer isSight) {
        List<PlanProgress2> planProgresses = planProgress2Repository.findByIsSight(isSight);
        return planProgresses.stream()
                .map(PlanProgress2Dto::toDto)
                .collect(Collectors.toList());
    }

    // 특정 숙박 여부에 해당하는 PlanProgress2 엔티티를 조회하는 메서드
    public List<PlanProgress2Dto> getPlanProgressesByIsHotel(Integer isHotel) {
        List<PlanProgress2> planProgresses = planProgress2Repository.findByIsHotel(isHotel);
        return planProgresses.stream()
                .map(PlanProgress2Dto::toDto)
                .collect(Collectors.toList());
    }

    // 특정 계획 ID와 상세 계획 시작일, 종료일에 해당하는 PlanProgress2 엔티티를 조회하는 메서드
    public List<PlanProgress2Dto> getPlanProgressesByPlanIdAndDetailPlanStartDateBetween(Long planId, Timestamp startDate, Timestamp endDate) {
        List<PlanProgress2> planProgresses = planProgress2Repository.findByPlan_idAndDetailPlanStartDateBetween(planId, startDate, endDate);
        return planProgresses.stream()
                .map(PlanProgress2Dto::toDto)
                .collect(Collectors.toList());
    }

    // PlanProgress2 저장
    public PlanProgress2Dto savePlanProgress2(PlanProgress2Dto planProgress2Dto) {
        PlanProgress2 planProgress2 = planProgress2Dto.toEntity();

        // Plan 엔티티 설정
        if (planProgress2Dto.getPlanId() != null) {
            Plan plan = planRepository.findById(planProgress2Dto.getPlanId()).orElse(null);
            planProgress2.setPlan(plan);
        }

        PlanProgress2 savedPlanProgress2 = planProgress2Repository.save(planProgress2);
        return PlanProgress2Dto.toDto(savedPlanProgress2);
    }

    // PlanProgress2 수정
    public PlanProgress2Dto updatePlanProgress2(PlanProgress2Dto planProgress2Dto) {
        Optional<PlanProgress2> existingPlanProgress2Opt = planProgress2Repository.findById(planProgress2Dto.getPlanProgress2Id());

        if (existingPlanProgress2Opt.isPresent()) {
            PlanProgress2 existingPlanProgress2 = existingPlanProgress2Opt.get();
            
            existingPlanProgress2.setDetailPlanName(planProgress2Dto.getDetailPlanName());
            existingPlanProgress2.setDetailPlanStartDate(planProgress2Dto.getDetailPlanStartDate());
            existingPlanProgress2.setDetailPlanEndDate(planProgress2Dto.getDetailPlanEndDate());
            existingPlanProgress2.setIsEvent(planProgress2Dto.getIsEvent() == true ? 1 : 0);
            existingPlanProgress2.setIsFood(planProgress2Dto.getIsFood() == true ? 1 : 0);
            existingPlanProgress2.setIsSight(planProgress2Dto.getIsSight() == true ? 1 : 0);
            existingPlanProgress2.setIsHotel(planProgress2Dto.getIsHotel() == true ? 1 : 0);
//            existingPlanProgress2.setEventId(planProgress2Dto.getEvent());
//            existingPlanProgress2.setFoodId(planProgress2Dto.getFood());
//            existingPlanProgress2.setSightId(planProgress2Dto.getSight());
//            existingPlanProgress2.setHotelId(planProgress2Dto.getHotel());

            // Plan 엔티티를 조회하여 설정
            if (planProgress2Dto.getPlanId() != null) {
                Plan plan = planRepository.findById(planProgress2Dto.getPlanId()).orElse(null);
                existingPlanProgress2.setPlan(plan);
            }

            PlanProgress2 updatedPlanProgress2 = planProgress2Repository.save(existingPlanProgress2);
            return PlanProgress2Dto.toDto(updatedPlanProgress2);
        }
        return null; // 수정할 PlanProgress2가 없는 경우
    }

    // PlanProgress2 삭제
    public void deletePlanProgress2(Long planProgress2Id) {
        planProgress2Repository.deleteById(planProgress2Id);
    }
}
