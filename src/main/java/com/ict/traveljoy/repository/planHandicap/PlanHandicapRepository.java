package com.ict.traveljoy.repository.planHandicap;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlanHandicapRepository extends JpaRepository<PlanHandicap, Long> {

    List<PlanHandicap> findByPlanId(Long planId);

    List<PlanHandicap> findByHandicapId(Long handicapId);

    PlanHandicap findByPlanIdAndHandicapId(Long planId, Long handicapId);

    void deleteByPlanId(Long planId);

    void deleteByHandicapId(Long handicapId);
}