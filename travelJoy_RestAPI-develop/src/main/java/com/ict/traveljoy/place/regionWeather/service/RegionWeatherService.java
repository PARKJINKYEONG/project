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
        RegionWeather regionWeather = regionWeatherDto.toEntity();
        regionWeather = regionWeatherRepository.save(regionWeather);
        return RegionWeatherDTO.toDto(regionWeather);
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
