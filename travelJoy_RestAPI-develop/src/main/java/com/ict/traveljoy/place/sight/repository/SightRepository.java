package com.ict.traveljoy.place.sight.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SightRepository extends JpaRepository<Sight, Long> {
    List<Sight> findByRegion_Id(Long regionId);
    List<Sight> findBySightName(String sightName);
    List<Sight> findByAverageReviewRateGreaterThanEqual(float reviewRate);
}
