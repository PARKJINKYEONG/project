package com.ict.traveljoy.place.regionWeather.repository;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import com.ict.traveljoy.weather.repository.Weather;
import com.ict.traveljoy.place.region.repository.Region;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "REGION_WEATHER")
public class RegionWeather {

    @Id
    @SequenceGenerator(name = "seq_region_weather", sequenceName = "seq_region_weather", allocationSize = 1, initialValue = 1)
    @GeneratedValue(generator = "seq_region_weather", strategy = GenerationType.SEQUENCE)
    @Column(name = "REGION_WEATHER_ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "WEATHER_ID", nullable = false)
    private Weather weather;

    @ManyToOne
    @JoinColumn(name = "REGION_ID", nullable = false)
    private Region region;

    @Column(name = "REGION_WEATHER_DATE", nullable = true)
    private LocalDate date;
}
