package com.ict.traveljoy.weather.repository;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Weather {

    @Id
    @SequenceGenerator(name = "seq_weather", sequenceName = "seq_weather", allocationSize = 1, initialValue = 1)
    @GeneratedValue(generator = "seq_weather", strategy = GenerationType.SEQUENCE)
    @Column(name = "WEATHER_ID")
    private Long id;

    @Column(name = "WEATHER_STATUS", nullable = true, length = 50)
    private String status;

    @Column(name = "WEATHER_TEMPERATURE", nullable = true)
    private Float temperature;

    @Column(name = "WEATHER_HUMIDITY", nullable = true)
    private Float humidity;

    @Column(name = "WEATHER_PRECIPITATION_PERCENT", nullable = true)
    private Float precipitationPercent;

    @Column(name = "WEATHER_PRECIPITATION", nullable = true)
    private Float precipitation;

    @Column(name = "WEATHER_WIND_SPEED", nullable = true)
    private Float windSpeed;
}
