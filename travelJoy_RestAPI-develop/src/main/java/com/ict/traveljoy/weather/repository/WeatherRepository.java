package com.ict.traveljoy.weather.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WeatherRepository extends JpaRepository<Weather, Long> {
    // 추가적인 쿼리 메소드가 필요하면 여기에 작성합니다.
}
