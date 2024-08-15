package com.ict.traveljoy.place.transportation.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransportationRepository extends JpaRepository<Transportation, Long> {

    // 이동 유형에 따른 검색

    List<Transportation> findByIsBus(boolean isBus);
    List<Transportation> findByIsTrain(boolean isTrain);
    List<Transportation> findByIsAirplane(boolean isAirplane);
    List<Transportation> findByIsDrive(boolean isDrive);

    List<Transportation> findByIsBus(char isBus);
    List<Transportation> findByIsTrain(char isTrain);
    List<Transportation> findByIsAirplane(char isAirplane);
    List<Transportation> findByIsDrive(char isDrive);


    // 특정 기간 내의 교통수단 검색
    List<Transportation> findByStartDateBetween(LocalDateTime startDate, LocalDateTime endDate);

    // 가격 범위 내의 교통수단 검색
    List<Transportation> findByPriceBetween(float minPrice, float maxPrice);
}
