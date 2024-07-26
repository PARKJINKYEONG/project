package com.ict.traveljoy.service.planRegion;

import com.ict.traveljoy.repository.planRegion.PlanRegion;
import com.ict.traveljoy.repository.planRegion.PlanRegionRepository;
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

    // PlanId로 PlanRegion 목록 조회
    public List<PlanRegionDto> getPlanRegionsByPlanId(Long planId) {
        List<PlanRegion> planRegions = planRegionRepository.findByPlanId(planId);
        return planRegions.stream()
                .map(PlanRegionDto::toDto)
                .collect(Collectors.toList());
    }

    // RegionId로 PlanRegion 목록 조회
    public List<PlanRegionDto> getPlanRegionsByRegionId(Long regionId) {
        List<PlanRegion> planRegions = planRegionRepository.findByRegionId(regionId);
        return planRegions.stream()
                .map(PlanRegionDto::toDto)
                .collect(Collectors.toList());
    }

    // PlanId와 RegionId로 특정 PlanRegion 조회
    public PlanRegionDto getPlanRegionByPlanIdAndRegionId(Long planId, Long regionId) {
        PlanRegion planRegion = planRegionRepository.findByPlanIdAndRegionId(planId, regionId);
        return planRegion != null ? PlanRegionDto.toDto(planRegion) : null;
    }

    // PlanRegion 저장
    public PlanRegionDto savePlanRegion(PlanRegionDto planRegionDto) {
        PlanRegion planRegion = planRegionDto.toEntity();
        PlanRegion savedPlanRegion = planRegionRepository.save(planRegion);
        return PlanRegionDto.toDto(savedPlanRegion);
    }

    // PlanRegion 수정
    public PlanRegionDto updatePlanRegion(PlanRegionDto planRegionDto) {
        PlanRegion existingPlanRegion = planRegionRepository.findById(planRegionDto.getPlanRegionId()).orElse(null);
        if (existingPlanRegion != null) {
            existingPlanRegion.setPlanId(planRegionDto.getPlanId());
            existingPlanRegion.setRegionId(planRegionDto.getRegionId());

            PlanRegion updatedPlanRegion = planRegionRepository.save(existingPlanRegion);
            return PlanRegionDto.toDto(updatedPlanRegion);
        }
        return null; // 수정할 PlanRegion가 없는 경우
    }

    // PlanRegion 삭제 (PlanId로 삭제)
    public void deletePlanRegionByPlanId(Long planId) {
        planRegionRepository.deleteByPlanId(planId);
    }

    // PlanRegion 삭제 (RegionId로 삭제)
    public void deletePlanRegionByRegionId(Long regionId) {
        planRegionRepository.deleteByRegionId(regionId);
    }

    // PlanRegion 삭제 (PlanId와 RegionId로 삭제)
    public void deletePlanRegion(Long planId, Long regionId) {
        PlanRegion planRegion = planRegionRepository.findByPlanIdAndRegionId(planId, regionId);
        if (planRegion != null) {
            planRegionRepository.delete(planRegion);
        }
    }
}
