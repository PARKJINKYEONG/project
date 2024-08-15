package com.ict.traveljoy.place.sight.service;


import com.ict.traveljoy.place.region.repository.Region;
import com.ict.traveljoy.place.sight.repository.Sight;

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
public class SightDTO {
	private Long id;
	private Region region;
	private Boolean isHasImage;
	private Float entranceFee;
	private String sightName;
	private String descriptions;
	private String address;
	private Float lat;
	private Float lng;
	private Long totalReviewCount;
	private Float averageReviewRate;
	
	public Sight toEntity() {
		return Sight.builder()
					 .id(id)
					 .region(region)
					 .isHasImage(isHasImage == true ? 1 : 0)
					 .entranceFee(entranceFee)
					 .sightName(sightName)
					 .descriptions(descriptions)
					 .address(address)
					 .lat(lat)
					 .lng(lng)
					 .totalReviewCount(totalReviewCount)
					 .averageReviewRate(averageReviewRate)
					 .build();
	}
	
	public static SightDTO toDto(Sight sights) {
		return SightDTO.builder()
						.id(sights.getId())
						.region(sights.getRegion())
						.isHasImage(sights.getIsHasImage() == 1 ? true : false)
						.entranceFee(sights.getEntranceFee())
						.sightName(sights.getSightName())
						.descriptions(sights.getDescriptions())
						.address(sights.getAddress())
						.lat(sights.getLat())
						.lng(sights.getLng())
						.totalReviewCount(sights.getTotalReviewCount())
						.averageReviewRate(sights.getAverageReviewRate())
						.build();
	}

}
