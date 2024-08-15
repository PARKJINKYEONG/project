package com.ict.traveljoy.place.transportation.service;

import com.ict.traveljoy.move.repository.Move;
import com.ict.traveljoy.place.transportation.repository.Transportation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TransportationDTO {
    private Long id;
    private Move move;
    private boolean isBus;
    private boolean isTrain;
    private boolean isAirplane;
    private boolean isDrive;
    private boolean isWalk;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String startAddress;
    private String endAddress;
    private float startLat;
    private float startLng;
    private float endLat;
    private float endLng;
    private float price;

    public Transportation toEntity() {
        return Transportation.builder()
                .id(id)
                .move(move)
                .isBus(isBus)
                .isTrain(isTrain)
                .isAirplane(isAirplane)
                .isDrive(isDrive)
                .isWalk(isWalk)
                .startDate(startDate)
                .endDate(endDate)
                .startAddress(startAddress)
                .endAddress(endAddress)
                .startLat(startLat)
                .startLng(startLng)
                .endLat(endLat)
                .endLng(endLng)
                .price(price)
                .build();
    }

    public static TransportationDTO toDto(Transportation transportation) {
        return TransportationDTO.builder()
                .id(transportation.getId())
                .move(transportation.getMove())
                .isBus(transportation.getIsBus())
                .isTrain(transportation.getIsTrain())
                .isAirplane(transportation.getIsAirplane())
                .isDrive(transportation.getIsDrive())
                .isWalk(transportation.getIsWalk())
                .startDate(transportation.getStartDate())
                .endDate(transportation.getEndDate())
                .startAddress(transportation.getStartAddress())
                .endAddress(transportation.getEndAddress())
                .startLat(transportation.getStartLat())
                .startLng(transportation.getStartLng())
                .endLat(transportation.getEndLat())
                .endLng(transportation.getEndLng())
                .price(transportation.getPrice())
                .build();
    }
}
