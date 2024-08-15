package com.ict.traveljoy.place.food.service;

import com.ict.traveljoy.place.food.repository.Food;
import com.ict.traveljoy.place.region.repository.Region;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FoodDTO {
    private Long id;
    private Region region;
    private String foodType;
    private Boolean isHasImage;
    private Float averagePrice;
    private String foodName;
    private String descriptions;
    private String address;
    private Float lat;
    private Float lng;
    private Long totalReviewCount;
    private Float averageReviewRate;

    public Food toEntity() {
        return Food.builder()
                .id(id)
                .region(region)
                .foodType(foodType)
                .isHasImage(isHasImage == true ? 1 : 0)
                .averagePrice(averagePrice)
                .foodName(foodName)
                .descriptions(descriptions)
                .address(address)
                .lat(lat)
                .lng(lng)
                .totalReviewCount(totalReviewCount)
                .averageReviewRate(averageReviewRate)
                .build();
    }

    public static FoodDTO toDto(Food food) {
        return FoodDTO.builder()
                .id(food.getId())
                .region(food.getRegion())
                .foodType(food.getFoodType())
                .isHasImage(food.getIsHasImage() == 1 ? true : false)
                .averagePrice(food.getAveragePrice())
                .foodName(food.getFoodName())
                .descriptions(food.getDescriptions())
                .address(food.getAddress())
                .lat(food.getLat())
                .lng(food.getLng())
                .totalReviewCount(food.getTotalReviewCount())
                .averageReviewRate(food.getAverageReviewRate())
                .build();
    }
}
