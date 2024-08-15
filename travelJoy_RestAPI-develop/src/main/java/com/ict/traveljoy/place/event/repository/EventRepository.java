package com.ict.traveljoy.place.event.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    // 특정 지역의 이벤트 검색
    List<Event> findByRegion_Id(Long regionId);

    // 이벤트 이름으로 검색
    List<Event> findByEventName(String eventName);

    // 특정 리뷰 평점 이상의 이벤트 검색
    List<Event> findByAverageReviewRateGreaterThanEqual(float reviewRate);
}
