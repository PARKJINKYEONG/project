package com.ict.traveljoy.plan.details.service;

import com.ict.traveljoy.plan.repository.Plan;
import com.ict.traveljoy.place.region.repository.Region;
import com.ict.traveljoy.plan.details.repository.PlanRegion;
import com.ict.traveljoy.plan.details.repository.PlanRegionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PlanRegionService {

    private final PlanRegionRepository planRegionRepository;

    @Autowired
    public PlanRegionService(PlanRegionRepository planRegionRepository) {
        this.planRegionRepository = planRegionRepository;
    }

    public List<PlanRegionDto> getPlanRegionsByPlanId(Long planId) {
        return planRegionRepository.findByPlan_id(planId).stream()
                .map(PlanRegionDto::toDto)
                .collect(Collectors.toList());
    }

    public List<PlanRegionDto> getPlanRegionsByRegionId(Long regionId) {
        return planRegionRepository.findByRegion_Id(regionId).stream()
                .map(PlanRegionDto::toDto)
                .collect(Collectors.toList());
    }

    public PlanRegionDto getPlanRegionByPlanIdAndRegionId(Long planId, Long regionId) {
        return planRegionRepository.findByPlan_idAndRegion_Id(planId, regionId)
                .map(PlanRegionDto::toDto)
                .orElse(null);
    }

    public PlanRegionDto savePlanRegion(PlanRegionDto planRegionDto) {
        PlanRegion planRegion = planRegionDto.toEntity();
        PlanRegion savedPlanRegion = planRegionRepository.save(planRegion);
        return PlanRegionDto.toDto(savedPlanRegion);
    }

    public PlanRegionDto updatePlanRegion(PlanRegionDto planRegionDto) {
        return planRegionRepository.findById(planRegionDto.getPlanRegionId())
                .map(existingPlanRegion -> {

                    Plan plan = new Plan();
                    plan.setId(planRegionDto.getPlanId());
                    existingPlanRegion.setPlan(plan);

                    Region region = new Region();
                    region.setId(planRegionDto.getRegionId());
                    existingPlanRegion.setRegion(region);

                    PlanRegion updatedPlanRegion = planRegionRepository.save(existingPlanRegion);
                    return PlanRegionDto.toDto(updatedPlanRegion);
                })
                .orElse(null); 
    }
    
    public void deletePlanRegionByPlanId(Long planId) {
        planRegionRepository.deleteByPlan_id(planId);
    }

    public void deletePlanRegionByRegionId(Long regionId) {
        planRegionRepository.deleteByRegion_Id(regionId);
    }

}
