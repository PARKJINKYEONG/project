package com.ict.traveljoy.weather.service;

import com.ict.traveljoy.weather.repository.Weather;
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
public class WeatherDTO {
    private Long id;
    private String status;
    private Float temperature;
    private Float humidity;
    private Float precipitationPercent;
    private Float precipitation;
    private Float windSpeed;

    public Weather toEntity() {
        return Weather.builder()
                .id(id)
                .status(status)
                .temperature(temperature)
                .humidity(humidity)
                .precipitationPercent(precipitationPercent)
                .precipitation(precipitation)
                .windSpeed(windSpeed)
                .build();
    }

    public static WeatherDTO toDto(Weather weather) {
        return WeatherDTO.builder()
                .id(weather.getId())
                .status(weather.getStatus())
                .temperature(weather.getTemperature())
                .humidity(weather.getHumidity())
                .precipitationPercent(weather.getPrecipitationPercent())
                .precipitation(weather.getPrecipitation())
                .windSpeed(weather.getWindSpeed())
                .build();
    }
}
