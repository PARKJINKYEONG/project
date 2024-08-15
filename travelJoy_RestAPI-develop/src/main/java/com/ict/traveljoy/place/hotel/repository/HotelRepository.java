package com.ict.traveljoy.place.hotel.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface HotelRepository extends JpaRepository<Hotel, Long> {

    List<Hotel> findByRegion_Id(Long regionId);

    List<Hotel> findByHotelName(String hotelName);

    List<Hotel> findByAveragePriceBetween(float minPrice, float maxPrice);

    List<Hotel> findByTotalReviewCountGreaterThanEqual(Long reviewCount);

    List<Hotel> findByAverageReviewRateGreaterThanEqual(float reviewRate);
}
