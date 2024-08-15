package com.ict.traveljoy.place.region.repository;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;

import jakarta.persistence.Column;
import jakarta.persistence.Table;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "region")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Region {

    @Id
    @SequenceGenerator(name = "seq_region",sequenceName = "seq_region",allocationSize = 1,initialValue = 1)
    @GeneratedValue(generator = "seq_region", strategy = GenerationType.SEQUENCE)
    @Column(name="region_id")
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 2000)
    private String R_info;

	}