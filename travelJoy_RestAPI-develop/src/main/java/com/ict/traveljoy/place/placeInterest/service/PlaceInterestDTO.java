package com.ict.traveljoy.place.placeInterest.service;


import com.ict.traveljoy.place.placeInterest.repository.PlaceInterest;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PlaceInterestDTO {
    private Long id;
    private Long interestId;
    private Boolean isEvent;
    private Boolean isFood;
    private Boolean isSight;
    private Boolean isHotel;
    
    public PlaceInterest toEntity() {
        return PlaceInterest.builder()
                            .id(id)
                            .interestId(interestId)
                            .isEvent(isEvent == true ? 1 : 0)
                            .isFood(isFood == true ? 1 : 0)
                            .isSight(isSight == true ? 1 : 0)
                            .isHotel(isHotel == true ? 1 : 0)
                            .build();
    }
    
    public static PlaceInterestDTO toDto(PlaceInterest placeInterest) {
        return PlaceInterestDTO.builder()
                               .id(placeInterest.getId())
                               .interestId(placeInterest.getInterestId())
                               .isEvent(placeInterest.getIsEvent() == 1 ? true : false)
                               .isFood(placeInterest.getIsFood() == 1 ? true : false)
                               .isSight(placeInterest.getIsSight() == 1 ? true : false)
                               .isHotel(placeInterest.getIsHotel() == 1 ? true : false)
                               .build();
    }
}
