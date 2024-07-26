package com.ict.traveljoy.service.planProgress;

import com.ict.traveljoy.repository.planProgress.PlanProgress4;
import com.ict.traveljoy.repository.planProgress.PlanProgress4Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PlanProgress4Service {

    private final PlanProgress4Repository planProgress4Repository;

    @Autowired
    public PlanProgress4Service(PlanProgress4Repository planProgress4Repository) {
        this.planProgress4Repository = planProgress4Repository;
    }

    // 특정 계획 ID에 해당하는 PlanProgress4 엔티티를 조회하는 메서드
    public List<PlanProgress4Dto> getPlanProgressesByPlanId(Long planId) {
        List<PlanProgress4> planProgresses = planProgress4Repository.findByPlanId(planId);
        return planProgresses.stream()
                .map(PlanProgress4Dto::toDto)
                .collect(Collectors.toList());
    }

    // 특정 AI 생성 계획 ID에 해당하는 PlanProgress4 엔티티를 조회하는 메서드
    public List<PlanProgress4Dto> getPlanProgressesByAiMadePlanId(Long aiMadePlanId) {
        List<PlanProgress4> planProgresses = planProgress4Repository.findByAiMadePlanId(aiMadePlanId);
        return planProgresses.stream()
                .map(PlanProgress4Dto::toDto)
                .collect(Collectors.toList());
    }

    // 특정 계획 ID와 AI 생성 계획 ID에 해당하는 PlanProgress4 엔티티를 조회하는 메서드
    public List<PlanProgress4Dto> getPlanProgressesByPlanIdAndAiMadePlanId(Long planId, Long aiMadePlanId) {
        List<PlanProgress4> planProgresses = planProgress4Repository.findByPlanIdAndAiMadePlanId(planId, aiMadePlanId);
        return planProgresses.stream()
                .map(PlanProgress4Dto::toDto)
                .collect(Collectors.toList());
    }

    // PlanProgress4 저장
    public PlanProgress4Dto savePlanProgress4(PlanProgress4Dto planProgress4Dto) {
        PlanProgress4 planProgress4 = planProgress4Dto.toEntity();
        PlanProgress4 savedPlanProgress4 = planProgress4Repository.save(planProgress4);
        return PlanProgress4Dto.toDto(savedPlanProgress4);
    }

    // PlanProgress4 수정
    public PlanProgress4Dto updatePlanProgress4(PlanProgress4Dto planProgress4Dto) {
        PlanProgress4 existingPlanProgress4 = planProgress4Repository.findById(planProgress4Dto.getPlanProgress4Id()).orElse(null);
        if (existingPlanProgress4 != null) {
            existingPlanProgress4.setPlanId(planProgress4Dto.getPlanId());
            existingPlanProgress4.setAiMadePlanId(planProgress4Dto.getAiMadePlanId());

            PlanProgress4 updatedPlanProgress4 = planProgress4Repository.save(existingPlanProgress4);
            return PlanProgress4Dto.toDto(updatedPlanProgress4);
        }
        return null; // 수정할 PlanProgress4가 없는 경우
    }

    // PlanProgress4 삭제
    public void deletePlanProgress4(Long planProgress4Id) {
        planProgress4Repository.deleteById(planProgress4Id);
    }

}
