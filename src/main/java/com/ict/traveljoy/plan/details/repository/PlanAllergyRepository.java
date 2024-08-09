package com.ict.traveljoy.plan.details.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlanAllergyRepository extends JpaRepository<PlanAllergy, Long> {

    // 특정 계획에 대한 모든 알레르기 정보 검색
	List<PlanAllergy> findByPlan_PlanId(Long planId);

    // 특정 알레르기를 포함하는 모든 계획 정보 검색
    List<PlanAllergy> findByAllergy_AllergyId(Long id);

    // 특정 계획 및 알레르기 조합으로 검색
    PlanAllergy findByPlan_PlanIdAndAllergy_AllergyId(Long planId, Long allergyId);

    // 특정 알레르기를 포함하는 모든 계획 정보 삭제
    void deleteByAllergy_AllergyId(Long allergyId);

    // 특정 계획에 대한 모든 알레르기 정보 삭제
    void deleteByPlan_PlanId(Long planId);
}