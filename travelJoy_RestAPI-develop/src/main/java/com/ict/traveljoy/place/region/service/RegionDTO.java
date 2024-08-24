package com.ict.traveljoy.place.region.service;

import com.ict.traveljoy.place.region.repository.Region;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class RegionDTO {
	
	private Long id;
	private String name;
	private String regionInfo;
	//DTO를 Entity로 변환하는 메소드 
		public Region toEntity() {
			return Region.builder()
					.id(id)
					.name(name)
					.regionInfo(regionInfo)
					.build();
		}
		//Entity를 DTO로 변환하는 메소드
		public static RegionDTO toDto(Region region) {
			return RegionDTO.builder()
							.id(region.getId())
							.name(region.getName())
							.regionInfo(region.getRegionInfo())
							.build();
		}
		
}
