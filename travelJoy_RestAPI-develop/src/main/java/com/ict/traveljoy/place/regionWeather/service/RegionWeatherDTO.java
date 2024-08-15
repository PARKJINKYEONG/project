package com.ict.traveljoy.place.regionWeather.service;


import com.ict.traveljoy.place.regionWeather.repository.RegionWeather;
import com.ict.traveljoy.place.region.repository.Region;
import com.ict.traveljoy.weather.repository.Weather;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegionWeatherDTO {
    private Long id;
    private Weather weather;
    private Region region;
    private LocalDate date;

    public RegionWeather toEntity() {
        return RegionWeather.builder()
                .id(id)
                .weather(weather)
                .region(region)
                .date(date)
                .build();
    }

    public static RegionWeatherDTO toDto(RegionWeather regionWeather) {
        return RegionWeatherDTO.builder()
                .id(regionWeather.getId())
                .weather(regionWeather.getWeather())
                .region(regionWeather.getRegion())
                .date(regionWeather.getDate())
                .build();
    }
}
