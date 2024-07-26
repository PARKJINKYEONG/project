package com.ict.traveljoy.service.planProgress;

import com.ict.traveljoy.repository.planProgress.PlanProgress1;
import com.ict.traveljoy.repository.planProgress.PlanProgress1Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PlanProgress1Service {

    private final PlanProgress1Repository planProgress1Repository;

    @Autowired
    public PlanProgress1Service(PlanProgress1Repository planProgress1Repository) {
        this.planProgress1Repository = planProgress1Repository;
    }

    // 특정 계획 기간 내의 PlanProgress1 엔티티를 조회하는 메서드
    public List<PlanProgress1Dto> getPlanProgressesByPlanStartDateBetween(Date startDate, Date endDate) {
        List<PlanProgress1> planProgresses = planProgress1Repository.findByPlanStartDateBetween(startDate, endDate);
        return planProgresses.stream()
                .map(PlanProgress1Dto::toDto)
                .collect(Collectors.toList());
    }

    // 특정 여행자 수 이상인 PlanProgress1 엔티티를 조회하는 메서드
    public List<PlanProgress1Dto> getPlanProgressesByTravelersGreaterThanEqual(Integer minTravelers) {
        List<PlanProgress1> planProgresses = planProgress1Repository.findByTravelersGreaterThanEqual(minTravelers);
        return planProgresses.stream()
                .map(PlanProgress1Dto::toDto)
                .collect(Collectors.toList());
    }

    // 특정 비용 이하의 PlanProgress1 엔티티를 조회하는 메서드
    public List<PlanProgress1Dto> getPlanProgressesByTravelCostLessThanEqual(BigDecimal maxTravelCost) {
        List<PlanProgress1> planProgresses = planProgress1Repository.findByTravelCostLessThanEqual(maxTravelCost);
        return planProgresses.stream()
                .map(PlanProgress1Dto::toDto)
                .collect(Collectors.toList());
    }

    // 특정 계획 ID에 해당하는 PlanProgress1 엔티티를 조회하는 메서드
    public List<PlanProgress1Dto> getPlanProgressesByPlanId(Long planId) {
        List<PlanProgress1> planProgresses = planProgress1Repository.findByPlanId(planId);
        return planProgresses.stream()
                .map(PlanProgress1Dto::toDto)
                .collect(Collectors.toList());
    }

    // PlanProgress1 저장
    public PlanProgress1Dto savePlanProgress1(PlanProgress1Dto planProgress1Dto) {
        PlanProgress1 planProgress1 = planProgress1Dto.toEntity();
        PlanProgress1 savedPlanProgress1 = planProgress1Repository.save(planProgress1);
        return PlanProgress1Dto.toDto(savedPlanProgress1);
    }

    // PlanProgress1 수정
    public PlanProgress1Dto updatePlanProgress1(PlanProgress1Dto planProgress1Dto) {
        PlanProgress1 existingPlanProgress1 = planProgress1Repository.findById(planProgress1Dto.getPlanProgress1Id()).orElse(null);
        if (existingPlanProgress1 != null) {
            existingPlanProgress1.setPlanStartDate(planProgress1Dto.getPlanStartDate());
            existingPlanProgress1.setPlanEndDate(planProgress1Dto.getPlanEndDate());
            existingPlanProgress1.setTravelers(planProgress1Dto.getTravelers());
            existingPlanProgress1.setTravelCost(planProgress1Dto.getTravelCost());
            existingPlanProgress1.setPlanId(planProgress1Dto.getPlanId());

            PlanProgress1 updatedPlanProgress1 = planProgress1Repository.save(existingPlanProgress1);
            return PlanProgress1Dto.toDto(updatedPlanProgress1);
        }
        return null; // 수정할 PlanProgress1이 없는 경우
    }

    // PlanProgress1 삭제
    public void deletePlanProgress1(Long planProgress1Id) {
        planProgress1Repository.deleteById(planProgress1Id);
    }

}
