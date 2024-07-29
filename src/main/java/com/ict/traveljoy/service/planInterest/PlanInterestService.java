package com.ict.traveljoy.service.planInterest;

import com.ict.traveljoy.repository.plan.Plan;
import com.ict.traveljoy.repository.planInterest.PlanInterest;
import com.ict.traveljoy.repository.planInterest.PlanInterestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PlanInterestService {

    private final PlanInterestRepository planInterestRepository;

    @Autowired
    public PlanInterestService(PlanInterestRepository planInterestRepository) {
        this.planInterestRepository = planInterestRepository;
    }

    // planId로 PlanInterest 조회
    public List<PlanInterestDto> getPlanInterestsByPlanId(Long planId) {
        List<PlanInterest> planInterests = planInterestRepository.findByPlanId(planId);
        return planInterests.stream()
                .map(PlanInterestDto::toDto)
                .collect(Collectors.toList());
    }

    // interestId로 PlanInterest 조회
    public List<PlanInterestDto> getPlanInterestsByInterestId(Long interestId) {
        List<PlanInterest> planInterests = planInterestRepository.findByInterestId(interestId);
        return planInterests.stream()
                .map(PlanInterestDto::toDto)
                .collect(Collectors.toList());
    }

    // planId와 interestId로 PlanInterest 조회
    public PlanInterestDto getPlanInterestByPlanIdAndInterestId(Long planId, Long interestId) {
        PlanInterest planInterest = planInterestRepository.findByPlanIdAndInterestId(planId, interestId);
        if (planInterest != null) {
            return PlanInterestDto.toDto(planInterest);
        }
        return null;
    }

    // 특정 관심사에 해당하는 PlanInterest 조회
    public List<PlanInterestDto> getPlanInterestsByInterestIds(List<Long> interestIds) {
        List<PlanInterest> planInterests = planInterestRepository.findByInterestIdIn(interestIds);
        return planInterests.stream()
                .map(PlanInterestDto::toDto)
                .collect(Collectors.toList());
    }

    // PlanInterest 저장
    public PlanInterestDto savePlanInterest(PlanInterestDto planInterestDto) {
        PlanInterest planInterest = planInterestDto.toEntity();
        PlanInterest savedPlanInterest = planInterestRepository.save(planInterest);
        return PlanInterestDto.toDto(savedPlanInterest);
    }

    // PlanInterest 수정
    public PlanInterestDto updatePlanInterest(PlanInterestDto planInterestDto) {
        PlanInterest existingPlanInterest = planInterestRepository.findByPlanIdAndInterestId(planInterestDto.getPlanId(), planInterestDto.getInterestId());
        if (existingPlanInterest != null) {
            Plan plan = new Plan();
            plan.setPlanId(planInterestDto.getPlanId());
            
            existingPlanInterest.setPlan(plan);
            // 필요한 경우 다른 필드도 업데이트할 수 있습니다.
            
            PlanInterest updatedPlanInterest = planInterestRepository.save(existingPlanInterest);
            return PlanInterestDto.toDto(updatedPlanInterest);
        }
        return null; // 수정할 PlanInterest가 없는 경우
    }

    // planId로 PlanInterest 삭제
    public void deletePlanInterestByPlanId(Long planId) {
        planInterestRepository.deleteByPlanId(planId);
    }
}
