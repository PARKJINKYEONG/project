package com.ict.traveljoy.move.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MoveRepository extends JpaRepository<Move, Long> {
	
	// startDetailPlan의 planProgress2Id를 기준으로 Move 엔티티를 조회하는 메서드
	List<Move> findByStartDetailPlan_PlanProgress2Id(Long startDetailPlanId);
	
	// endDetailPlan의 planProgress2Id를 기준으로 Move 엔티티를 조회하는 메서드
	List<Move> findByEndDetailPlan_PlanProgress2Id(Long endDetailPlanId);
	
	// transportationId를 기준으로 Move 엔티티를 조회하는 메서드
	List<Move> findByTransportationId(Long transportationId);

}
