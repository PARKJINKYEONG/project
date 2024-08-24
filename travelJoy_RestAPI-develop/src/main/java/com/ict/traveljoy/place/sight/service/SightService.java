package com.ict.traveljoy.place.sight.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ict.traveljoy.place.sight.repository.Sight;
import com.ict.traveljoy.place.sight.repository.SightRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class SightService {

    @Autowired
    private SightRepository sightRepository;

    // 모든 명소 검색
    public List<SightDTO> findAllSights() {
        return sightRepository.findAll().stream()
                .map(SightDTO::toDto)
                .collect(Collectors.toList());
    }

    // ID로 명소 검색
    public Optional<SightDTO> findSightById(Long id) {
        return sightRepository.findById(id)
                .map(SightDTO::toDto);
    }

    // 명소 저장
    @Transactional
    public SightDTO saveSight(SightDTO sightDto) {
        // 데이터 유효성 검증
        if (sightDto.getSightName() == null || sightDto.getSightName().isEmpty()) {
            throw new IllegalArgumentException("관광지 이름이 비어있으면 안돼요");
        }
        // 다른 필수 필드 검증 추가 가능

        Sight sight = sightDto.toEntity();
        sight = sightRepository.save(sight);
        return SightDTO.toDto(sight);
    }
    
    // 명소 수정
    
    @Transactional
    public SightDTO updateSight(Long id, SightDTO sightDto) {
        Optional<Sight> sightOpt = sightRepository.findById(id);

        if (sightOpt.isPresent()) {
            Sight sight = sightOpt.get();
        	sight.setSightName(sightDto.getSightName());
        	sight.setEntranceFee(sightDto.getEntranceFee());
            sight.setDescriptions(sightDto.getDescriptions());
            sight.setRegion(sightDto.getRegion());
            sight.setAddress( sightDto.getAddress());
            sight.setTotalReviewCount(sightDto.getTotalReviewCount());
            sight.setAverageReviewRate(sightDto.getAverageReviewRate());
            
            Sight updatedSight = sightRepository.save(sight);
            return SightDTO.toDto(updatedSight);
        } else {
            throw new IllegalArgumentException("주어진 번호의 관광지를 찾을 수 없어요");
        }
    }

    // ID로 명소 삭제
    @Transactional
    public void deleteSight(Long id) {
        if (sightRepository.existsById(id)) {
            sightRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("주어진 번호의 관광지를 찾을 수 없어요");
        }
    }

    // 특정 지역의 명소 검색
    public List<SightDTO> findSightsByRegionId(Long regionId) {
        return sightRepository.findByRegion_Id(regionId).stream()
                .map(SightDTO::toDto)
                .collect(Collectors.toList());
    }

    // 명소 이름으로 검색
    public List<SightDTO> findSightsByName(String sightName) {
        return sightRepository.findBySightName(sightName).stream()
                .map(SightDTO::toDto)
                .collect(Collectors.toList());
    }

    // 특정 리뷰 평점 이상의 명소 검색
    public List<SightDTO> findSightsByReviewRate(float reviewRate) {
        return sightRepository.findByAverageReviewRateGreaterThanEqual(reviewRate).stream()
                .map(SightDTO::toDto)
                .collect(Collectors.toList());
    }
}