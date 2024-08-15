package com.ict.traveljoy.place.food.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {

    // 특정 지역의 음식 검색
    List<Food> findByRegion_Id(Long regionId);

    // 음식 이름으로 검색
    List<Food> findByFoodName(String foodName);

    // 특정 가격 이하의 음식 검색
    List<Food> findByAveragePriceLessThanEqual(float maxPrice);

    // 특정 리뷰 평점 이상의 음식 검색
    List<Food> findByAverageReviewRateGreaterThanEqual(float reviewRate);
}
