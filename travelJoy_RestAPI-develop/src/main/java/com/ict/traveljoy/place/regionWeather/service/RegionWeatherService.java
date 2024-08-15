package com.ict.traveljoy.place.regionWeather.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.ict.traveljoy.place.regionWeather.repository.RegionWeather;
import com.ict.traveljoy.place.regionWeather.repository.RegionWeatherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class RegionWeatherService {

    @Autowired
    private RegionWeatherRepository regionWeatherRepository;

    // 모든 지역별 날씨 상태 검색
    public List<RegionWeatherDTO> findAllRegionWeathers() {
        return regionWeatherRepository.findAll().stream()
                .map(regionWeather -> RegionWeatherDTO.toDto(regionWeather))
                .collect(Collectors.toList());
    }

    // ID로 지역별 날씨 상태 검색
    public Optional<RegionWeatherDTO> findRegionWeatherById(Long id) {
        return regionWeatherRepository.findById(id)
                .map(regionWeather -> RegionWeatherDTO.toDto(regionWeather));
    }

    // 지역별 날씨 상태 저장
    public RegionWeatherDTO saveRegionWeather(RegionWeatherDTO regionWeatherDto) {
        if (regionWeatherDto == null) {
            throw new IllegalArgumentException("RegionWeatherDTO must not be null");
        }

        RegionWeather regionWeather = regionWeatherDto.toEntity();

        // 필수 필드 확인
        if (regionWeather.getRegion() == null || regionWeather.getWeather() == null) {
            throw new IllegalArgumentException("Region ID and Weather ID must not be null");
        }

        // 저장
        RegionWeather savedRegionWeather = regionWeatherRepository.save(regionWeather);
        return RegionWeatherDTO.toDto(savedRegionWeather);
    }

    // ID로 지역별 날씨 상태 삭제
    public void deleteRegionWeather(Long id) {
        if (regionWeatherRepository.existsById(id)) {
            regionWeatherRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("주어진 번호의 지역별 날씨 상태를 찾을 수 없어요");
        }
    }
}
