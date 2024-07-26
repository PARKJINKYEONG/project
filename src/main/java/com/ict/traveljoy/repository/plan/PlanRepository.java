package com.ict.traveljoy.repository.plan;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlanRepository extends JpaRepository<Plan, Long> {
	
	// planId로 Plans 조회
    Plan findByPlanId(Long planId);

    // isActive 여부로 Plans 조회
    List<Plan> findByIsActive(String isActive);

    // 특정 날짜 이후에 생성된 Plans 조회
    List<Plan> findByCreateDateAfter(LocalDateTime createDate);

    // 이름에 특정 단어가 포함된 Plans 조회
    List<Plan> findByPlanNameContains(String keyword);

}
