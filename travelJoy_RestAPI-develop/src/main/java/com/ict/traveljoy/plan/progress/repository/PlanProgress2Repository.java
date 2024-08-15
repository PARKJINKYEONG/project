package com.ict.traveljoy.plan.progress.repository;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlanProgress2Repository extends JpaRepository<PlanProgress2, Long> {

    // 특정 계획 ID에 해당하는 PlanProgress2 엔티티를 조회하는 메서드
    List<PlanProgress2> findByPlan_id(Long planId);

    // 특정 이벤트 여부에 해당하는 PlanProgress2 엔티티를 조회하는 메서드
    List<PlanProgress2> findByIsEvent(Integer isEvent);

    // 특정 식사 여부에 해당하는 PlanProgress2 엔티티를 조회하는 메서드
    List<PlanProgress2> findByIsFood(Integer isFood);

    // 특정 관광지 여부에 해당하는 PlanProgress2 엔티티를 조회하는 메서드
    List<PlanProgress2> findByIsSight(Integer isSight);

    // 특정 숙박 여부에 해당하는 PlanProgress2 엔티티를 조회하는 메서드
    List<PlanProgress2> findByIsHotel(Integer isHotel);

    // 특정 계획 ID와 상세 계획 시작일, 종료일에 해당하는 PlanProgress2 엔티티를 조회하는 메서드
    List<PlanProgress2> findByPlan_idAndDetailPlanStartDateBetween(Long planId, Timestamp startDate, Timestamp endDate);

}
