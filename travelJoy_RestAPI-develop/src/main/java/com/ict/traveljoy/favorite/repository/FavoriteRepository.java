package com.ict.traveljoy.favorite.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FavoriteRepository extends JpaRepository<Favorite, Long>{


    // 북마크한 모든 행사 조회
    List<Favorite> findAllByUser_IdAndIsEventAndIsActive(Long userId,Integer isEvent,Integer isActive);
    // 북마크한 행사를 행사 id(targetID)를 통해 조회
    //Favorite findByEventId(Long targetid);

    // 북마크한 모든 식당 조회
    List<Favorite> findAllByUser_IdAndIsFoodAndIsActive(Long userId,Integer isFood,Integer isActive);
    // 북마크한 식당을 식당 id(targetID)를 통해 조회
    //Favorite findByFoodId(Long targetid);

    // 북마크한 모든 관광지 조회
    List<Favorite> findAllByUser_IdAndIsSightAndIsActive(Long userId,Integer isSight,Integer isActive);
    // 북마크한 관광지를 관광지 id(targetID)를 통해 조회
    //Favorite findBySightId(Long targetid);

    // 북마크한 모든 숙소 조회
    List<Favorite> findAllByUser_IdAndIsHotelAndIsActive(Long userId,Integer isHotel,Integer isActive);
    // 북마크한 숙소를 숙소 id(targetID)를 통해 조회
    //Favorite findByHotelId(Long targetid);
}
