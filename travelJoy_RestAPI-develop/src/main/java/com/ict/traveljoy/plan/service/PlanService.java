package com.ict.traveljoy.plan.service;

import com.ict.traveljoy.plan.repository.Plan;
import com.ict.traveljoy.plan.repository.PlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PlanService {

    private final PlanRepository planRepository;

    @Autowired
    public PlanService(PlanRepository planRepository) {
        this.planRepository = planRepository;
    }

    // planId로 Plans 조회
    public PlanDto getPlanById(Long planId) {
        Plan plan = planRepository.findById(planId).get();
        if (plan != null) {
            return PlanDto.toDto(plan);
        }
        return null;
    }

    // isActive 여부로 Plan 목록 조회
    public List<PlanDto> getPlansByIsActive(Integer isActive) {
        List<Plan> plans = planRepository.findByIsActive(isActive);
        return plans.stream()
                .map(PlanDto::toDto)
                .collect(Collectors.toList());
    }

    // 특정 날짜 이후에 생성된 Plan 목록 조회
    public List<PlanDto> getPlansCreatedAfter(LocalDateTime createDate) {
        List<Plan> plans = planRepository.findByCreateDateAfter(createDate);
        return plans.stream()
                .map(PlanDto::toDto)
                .collect(Collectors.toList());
    }

    // 이름에 특정 단어가 포함된 Plan 목록 조회
    public List<PlanDto> getPlansByKeyword(String keyword) {
        List<Plan> plans = planRepository.findByPlanNameContains(keyword);
        return plans.stream()
                .map(PlanDto::toDto)
                .collect(Collectors.toList());
    }

    // Plan 저장
    public PlanDto savePlan(PlanDto planDto) {
        Plan plan = planDto.toEntity();
        Plan savedPlan = planRepository.save(plan);
        return PlanDto.toDto(savedPlan);
    }

    // Plan 수정
    public PlanDto updatePlan(PlanDto planDto) {
        Plan existingPlan = planRepository.findById(planDto.getPlanId()).get();
        if (existingPlan != null) {
            existingPlan.setPlanName(planDto.getPlanName());
            existingPlan.setPlanDescriptions(planDto.getPlanDescriptions());
            existingPlan.setCreateDate(planDto.getCreateDate());
            existingPlan.setIsActive(planDto.getIsActive() == true ? 1 : 0);
            existingPlan.setIsDelete(planDto.getIsDelete() == true ? 1 : 0);
            existingPlan.setDeleteDate(planDto.getDeleteDate());
            existingPlan.setProgress(planDto.getProgress());
            Plan updatedPlan = planRepository.save(existingPlan);
            return PlanDto.toDto(updatedPlan);
        }
        return null; // 수정할 Plan이 없는 경우
    }

    // Plan 삭제 (논리 삭제)
    public boolean deletePlan(Long planId) {
        Plan existingPlan = planRepository.findById(planId).get();
        if (existingPlan != null) {
            existingPlan.setIsDelete(null);
            existingPlan.setDeleteDate(LocalDateTime.now());
            planRepository.save(existingPlan);
            return true;
        }
        return false; // 삭제할 Plan이 없는 경우
    }
}
