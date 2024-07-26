package com.ict.traveljoy.repository.planProgress;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MoveRepository extends JpaRepository<Move, Long> {
	
	// startDetailPlanId를 기준으로 Move 엔티티를 조회하는 메서드
	List<Move> findByStartDetailPlanId(Long startDetailPlanId);
	
	// endDetailPlanId를 기준으로 Move 엔티티를 조회하는 메서드
	List<Move> findByEndDetailPlanId(Long endDetailPlanId);
	
	// transportationId를 기준으로 Move 엔티티를 조회하는 메서드
	List<Move> findByTransportationId(Long transportationId);

}
