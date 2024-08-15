package com.ict.traveljoy.place.region.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ict.traveljoy.place.region.repository.Region;
import com.ict.traveljoy.place.region.repository.RegionRepository;

@Service
public class RegionService {
	
	//인젝션
	@Autowired 
	private RegionRepository regionRepository;
	
	//서비스에서 리포지토리로 갈때는 엔터티, 서비스에서 컨트롤러로 갈땐 DTO
	//데이터 저장, 업데이트, 조회 등은 리포지토리로 데이터 전송
	//RegionDTO 객체를 받아 데이터에 저장, 저장된 엔터티를 RegionDTO로 변환
	public RegionDTO saveRegion(RegionDTO regionDto) {
		Region region =regionDto.toEntity();
		Region saveRegion= regionRepository.save(region);
		return RegionDTO.toDto(saveRegion);
	}
	//id로 Region 엔터티를 검색 이를 RegionDTO로 변환
	//Optional: 값이 존재할 수도 있고 없을 수도 있는 경우를 안전하게 처리
	public Optional<RegionDTO> getRegionById(Long id){
		return regionRepository.findById(id).map(region->RegionDTO.toDto(region));
	}
	
	//모든 지역 검색 
	public List<RegionDTO> getAllRegion(){
		return regionRepository.findAll().stream()
								.map(region->RegionDTO.toDto(region))
								.collect(Collectors.toList());
	}

	public RegionDTO updateRegion(Long id, RegionDTO regionDto) {
		// Find the existing region by ID
		Optional<Region> existingRegionOpt = regionRepository.findById(id);

		if (existingRegionOpt.isPresent()) {
			Region existingRegion = existingRegionOpt.get();

			// Update fields with values from regionDto
			existingRegion.setName(regionDto.getName());
			existingRegion.setR_info(regionDto.getR_info());

			// Save the updated region
			Region updatedRegion = regionRepository.save(existingRegion);
			return RegionDTO.toDto(updatedRegion);
		} else {
			throw new IllegalArgumentException("Region with ID " + id + " not found");
		}
	}

	//주어진 id를 가진 Region 엔터티 삭제
	public void deleteRegion(Long id) {
        regionRepository.deleteById(id);
    }
	//이름으로 Region 엔터티 검색(사용자용)
	public RegionDTO getRegionByName(String name) {
        Region region = regionRepository.findByName(name);
        return RegionDTO.toDto(region);
    }
}
