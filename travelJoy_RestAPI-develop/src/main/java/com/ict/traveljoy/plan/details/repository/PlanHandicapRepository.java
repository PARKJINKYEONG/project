package com.ict.traveljoy.plan.details.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlanHandicapRepository extends JpaRepository<PlanHandicap, Long> {

    List<PlanHandicap> findByPlan_id(Long planId);

    List<PlanHandicap> findByHandicapId(Long handicapId);

    PlanHandicap findByPlan_idAndHandicapId(Long planId, Long handicapId);

    void deleteByPlan_id(Long planId);

    void deleteByHandicapId(Long handicapId);
}
