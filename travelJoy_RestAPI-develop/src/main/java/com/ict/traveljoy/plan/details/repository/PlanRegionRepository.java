package com.ict.traveljoy.plan.details.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlanRegionRepository extends JpaRepository<PlanRegion, Long> {

    List<PlanRegion> findByPlan_id(Long planId);

    List<PlanRegion> findByRegion_Id(Long regionId);

    Optional<PlanRegion> findByPlan_idAndRegion_Id(Long planId, Long regionId);

    void deleteByPlan_id(Long planId);

    void deleteByRegion_Id(Long regionId);
}
