package com.ict.traveljoy.plan.details.service;

import com.ict.traveljoy.plan.details.repository.PlanAllergy;
import com.ict.traveljoy.plan.details.repository.PlanAllergyRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PlanAllergyService {

    @Autowired
    private PlanAllergyRepository planAllergyRepository;

    // PlanAllergy 생성
    public PlanAllergyDTO createPlanAllergy(PlanAllergyDTO planAllergyDTO) {
        PlanAllergy planAllergy = planAllergyDTO.toEntity();
        PlanAllergy savedPlanAllergy = planAllergyRepository.save(planAllergy);
        return PlanAllergyDTO.toDto(savedPlanAllergy);
    }

    // 모든 PlanAllergy 조회
    public List<PlanAllergyDTO> getAllPlanAllergies() {
        List<PlanAllergy> planAllergies = planAllergyRepository.findAll();
        return planAllergies.stream()
                .map(PlanAllergyDTO::toDto)
                .collect(Collectors.toList());
    }

    // 특정 ID로 PlanAllergy 조회
    public PlanAllergyDTO getPlanAllergyById(Long id) {
        Optional<PlanAllergy> optionalPlanAllergy = planAllergyRepository.findById(id);
        return optionalPlanAllergy.map(PlanAllergyDTO::toDto).orElse(null);
    }

    // PlanAllergy 수정
    public PlanAllergyDTO updatePlanAllergy(Long id, PlanAllergyDTO planAllergyDTO) {
        Optional<PlanAllergy> optionalPlanAllergy = planAllergyRepository.findById(id);
        if (optionalPlanAllergy.isPresent()) {
            PlanAllergy planAllergy = optionalPlanAllergy.get();
            planAllergy.setPlan(planAllergyDTO.getPlan());
            planAllergy.setAllergy(planAllergyDTO.getAllergy());
            PlanAllergy updatedPlanAllergy = planAllergyRepository.save(planAllergy);
            return PlanAllergyDTO.toDto(updatedPlanAllergy);
        } else {
            return null;
        }
    }

    // PlanAllergy 삭제
    public void deletePlanAllergy(Long id) {
        planAllergyRepository.deleteById(id);
    }
}
