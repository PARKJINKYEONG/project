package com.ict.traveljoy.place.food.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ict.traveljoy.place.food.repository.Food;
import com.ict.traveljoy.place.food.repository.FoodRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class FoodService {

    @Autowired
    private FoodRepository foodRepository;

    // 모든 음식 검색
    public List<FoodDTO> findAllFoods() {
        return foodRepository.findAll().stream()
                .map(FoodDTO::toDto)
                .collect(Collectors.toList());
    }

    // ID로 음식 검색
    public Optional<FoodDTO> findFoodById(Long id) {
        return foodRepository.findById(id)
                .map(FoodDTO::toDto);
    }

    // 음식 저장
    @Transactional
    public FoodDTO saveFood(FoodDTO foodDto) {
    	if (foodDto.getFoodName().isEmpty()) {
    		throw new IllegalArgumentException("음식 이름이 비어있어요");
    	}
        Food food = foodDto.toEntity();
        food = foodRepository.save(food);
        return FoodDTO.toDto(food);
    }
    
 // 음식 수정
    @Transactional
    public FoodDTO updateFood(Long id, FoodDTO foodDto) {
        Optional<Food> foodOpt = foodRepository.findById(id);

        if (foodOpt.isPresent()) {
            Food food = foodOpt.get();
            food.setFoodType(foodDto.getFoodType());
            food.setDescriptions(foodDto.getDescriptions());
            food.setFoodName(foodDto.getFoodName());
            food.setRegion(foodDto.getRegion());
            food.setAddress(foodDto.getAddress());
            food.setTotalReviewCount(foodDto.getTotalReviewCount());
            food.setAveragePrice(foodDto.getAveragePrice());
            food.setAverageReviewRate(foodDto.getAverageReviewRate());
            
            Food updatedFood = foodRepository.save(food);
            return FoodDTO.toDto(updatedFood);
        } else {
            throw new IllegalArgumentException("주어진 번호의 음식을 찾을 수 없어요");
        }
    }

    // ID로 음식 삭제
    @Transactional
    public void deleteFood(Long id) {
        if (foodRepository.existsById(id)) {
            foodRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("주어진 번호의 음식을 찾을 수 없어요");
        }
    }

    // 특정 지역의 음식 검색
    public List<FoodDTO> findFoodsByRegionId(Long regionId) {
        return foodRepository.findByRegion_Id(regionId).stream()
                .map(FoodDTO::toDto)
                .collect(Collectors.toList());
    }

    // 음식 이름으로 검색
    public List<FoodDTO> findFoodsByName(String foodName) {
        return foodRepository.findByFoodName(foodName).stream()
                .map(FoodDTO::toDto)
                .collect(Collectors.toList());
    }

    // 특정 가격 이하의 음식 검색
    public List<FoodDTO> findFoodsByPrice(float maxPrice) {
        return foodRepository.findByAveragePriceLessThanEqual(maxPrice).stream()
                .map(FoodDTO::toDto)
                .collect(Collectors.toList());
    }

    // 특정 리뷰 평점 이상의 음식 검색
    public List<FoodDTO> findFoodsByReviewRate(float reviewRate) {
        return foodRepository.findByAverageReviewRateGreaterThanEqual(reviewRate).stream()
                .map(FoodDTO::toDto)
                .collect(Collectors.toList());
    }
}