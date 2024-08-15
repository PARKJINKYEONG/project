package com.ict.traveljoy.plan.details.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlanInterestRepository extends JpaRepository<PlanInterest, Long> {

    // planId로 PlanInterest 조회
    List<PlanInterest> findByPlan_id(Long planId);

    // interestId로 PlanInterest 조회
    List<PlanInterest> findByInterestId(Long interestId);

    // planId와 interestId로 PlanInterest 조회
    PlanInterest findByPlan_idAndInterestId(Long planId, Long interestId);

    // 특정 관심사에 해당하는 PlanInterest 조회
    List<PlanInterest> findByInterestIdIn(List<Long> interestIds);

    // planId로 특정 PlanInterest 삭제
    void deleteByPlan_id(Long planId);
}
