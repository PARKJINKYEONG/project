package com.ict.traveljoy.repository.planRegion;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlanRegionRepository extends JpaRepository<PlanRegion, Long> {

    List<PlanRegion> findByPlanId(Long planId);

    List<PlanRegion> findByRegionId(Long regionId);

    PlanRegion findByPlanIdAndRegionId(Long planId, Long regionId);

    void deleteByPlanId(Long planId);

    void deleteByRegionId(Long regionId);
}