package com.ict.traveljoy.place.event.service;

import java.time.LocalDateTime;

import com.ict.traveljoy.place.event.repository.Event;
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
public class EventDTO {
    private Long id;
    private Region region;
    private Boolean isHasImage;
    private LocalDateTime eventStartDate;
    private LocalDateTime eventEndDate;
    private Float entranceFee;
    private String eventName;
    private String descriptions;
    private String address;
    private Float lat;
    private Float lng;
    private Long totalReviewCount;
    private Float averageReviewRate;

    public Event toEntity() {
        return Event.builder()
                .id(id)
                .region(region)
                .isHasImage(isHasImage == true ? 1 : 0)
                .eventStartDate(eventStartDate)
                .eventEndDate(eventEndDate)
                .entranceFee(entranceFee)
                .eventName(eventName)
                .descriptions(descriptions)
                .address(address)
                .lat(lat)
                .lng(lng)
                .totalReviewCount(totalReviewCount)
                .averageReviewRate(averageReviewRate)
                .build();
    }

    public static EventDTO toDto(Event event) {
        return EventDTO.builder()
                .id(event.getId())
                .region(event.getRegion())
                .isHasImage(event.getIsHasImage() == 1 ? true : false)
                .eventStartDate(event.getEventStartDate())
                .eventEndDate(event.getEventEndDate())
                .entranceFee(event.getEntranceFee())
                .eventName(event.getEventName())
                .descriptions(event.getDescriptions())
                .address(event.getAddress())
                .lat(event.getLat())
                .lng(event.getLng())
                .totalReviewCount(event.getTotalReviewCount())
                .averageReviewRate(event.getAverageReviewRate())
                .build();
    }
}
