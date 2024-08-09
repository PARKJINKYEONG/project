package com.ict.traveljoy.plan.details.service;

import com.ict.traveljoy.info.repository.Allergy;
import com.ict.traveljoy.plan.details.repository.PlanAllergy;
import com.ict.traveljoy.plan.details.repository.PlanAllergyRepository;
import com.ict.traveljoy.plan.repository.Plan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PlanAllergyService {

    private final PlanAllergyRepository planAllergyRepository;

    @Autowired
    public PlanAllergyService(PlanAllergyRepository planAllergyRepository) {
        this.planAllergyRepository = planAllergyRepository;
    }

    // 특정 계획에 대한 모든 알레르기 정보 조회
    public List<PlanAllergyDto> getPlanAllergiesByPlanId(Long planId) {
        List<PlanAllergy> planAllergies = planAllergyRepository.findByPlan_PlanId(planId);
        return planAllergies.stream()
                .map(PlanAllergyDto::toDto)
                .collect(Collectors.toList());
    }

    // 특정 알레르기를 포함하는 모든 계획 정보 조회
    public List<PlanAllergyDto> getPlanAllergiesByAllergyId(Long allergyId) {
        List<PlanAllergy> planAllergies = planAllergyRepository.findByAllergy_AllergyId(allergyId);
        return planAllergies.stream()
                .map(PlanAllergyDto::toDto)
                .collect(Collectors.toList());
    }

    // 특정 계획 및 알레르기 조합으로 조회
    public PlanAllergyDto getPlanAllergy(Long planId, Long allergyId) {
        PlanAllergy planAllergy = planAllergyRepository.findByPlan_PlanIdAndAllergy_AllergyId(planId, allergyId);
        return planAllergy != null ? PlanAllergyDto.toDto(planAllergy) : null;
    }

    // PlanAllergy 저장
    public PlanAllergyDto savePlanAllergy(PlanAllergyDto planAllergyDto) {
        PlanAllergy planAllergy = planAllergyDto.toEntity();
        PlanAllergy savedPlanAllergy = planAllergyRepository.save(planAllergy);
        return PlanAllergyDto.toDto(savedPlanAllergy);
    }

    // 특정 알레르기를 포함하는 모든 계획 정보 삭제
    public void deleteByAllergyId(Long allergyId) {
        planAllergyRepository.deleteByAllergy_AllergyId(allergyId);
    }

    // 특정 계획에 대한 모든 알레르기 정보 삭제
    public void deleteByPlanId(Long planId) {
        planAllergyRepository.deleteByPlan_PlanId(planId);
    }
}
