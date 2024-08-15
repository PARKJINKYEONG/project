package com.ict.traveljoy.plan.details.service;

import com.ict.traveljoy.plan.details.repository.PlanHandicap;
import com.ict.traveljoy.plan.details.repository.PlanHandicapRepository;
import com.ict.traveljoy.plan.repository.Plan;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PlanHandicapService {

    @Autowired
    private PlanHandicapRepository planHandicapRepository;

    
    public List<PlanHandicapDto> getAllPlanHandicaps() {
        return planHandicapRepository.findAll().stream()
                .map(PlanHandicapDto::toDto)
                .collect(Collectors.toList());
    }

    public PlanHandicapDto getPlanHandicapById(Long id) {
        return planHandicapRepository.findById(id)
                .map(PlanHandicapDto::toDto)
                .orElse(null); // 해당 ID가 없을 경우 null 처리
    }

    public List<PlanHandicapDto> getPlanHandicapsByPlanId(Long planId) {
        return planHandicapRepository.findByPlan_id(planId).stream()
                .map(PlanHandicapDto::toDto)
                .collect(Collectors.toList());
    }

    public List<PlanHandicapDto> getPlanHandicapsByHandicapId(Long handicapId) {
        return planHandicapRepository.findByHandicapId(handicapId).stream()
                .map(PlanHandicapDto::toDto)
                .collect(Collectors.toList());
    }
    @Transactional
    public PlanHandicapDto savePlanHandicap(PlanHandicapDto planHandicapDto) {
        PlanHandicap planHandicap = planHandicapDto.toEntity();
        PlanHandicap saveplanHandicap = planHandicapRepository.save(planHandicap);
        return PlanHandicapDto.toDto(saveplanHandicap);
        
    }
    
    @Transactional
    public PlanHandicapDto updatePlanHandicap(PlanHandicapDto planHandicapDto) {
    	PlanHandicap existingPlanHandicap = planHandicapRepository.findByPlan_idAndHandicapId(planHandicapDto.getPlanId(), planHandicapDto.getPlanHandicapId());
    	if (existingPlanHandicap != null) {
    		Plan plan = new Plan();
    		plan.setId(planHandicapDto.getPlanId());;
    		
    		existingPlanHandicap.setPlan(plan);
    		
    		PlanHandicap updatePlanHandicap = planHandicapRepository.save(existingPlanHandicap);
    		return PlanHandicapDto.toDto(updatePlanHandicap);


    	}
    	return null;
      
    	
    }
    
    

    @Transactional
    public void deletePlanHandicap(Long id) {
        planHandicapRepository.deleteById(id);
    }
}
