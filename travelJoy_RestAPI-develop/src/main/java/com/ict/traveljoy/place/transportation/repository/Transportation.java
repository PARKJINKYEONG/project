package com.ict.traveljoy.place.transportation.repository;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;

import org.hibernate.annotations.ColumnDefault;

import com.ict.traveljoy.move.repository.Move;

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
public class Transportation {

    @Id
    @SequenceGenerator(name = "seq_transportation", sequenceName = "seq_transportation", allocationSize = 1, initialValue = 1)
    @GeneratedValue(generator = "seq_transportation", strategy = GenerationType.SEQUENCE)
    @Column(name = "TRANSPORTATION_ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "MOVE_ID")
    private Move move;

    @Column(name = "IS_BUS", nullable = false)
    @ColumnDefault("'F'")
    private boolean isBus;

    @Column(name = "IS_TRAIN", nullable = false)
    @ColumnDefault("'F'")
    private boolean isTrain;

    @Column(name = "IS_AIRPLANE", nullable = false)
    @ColumnDefault("'F'")
    private boolean isAirplane;

    @Column(name = "IS_DRIVE", nullable = false)
    @ColumnDefault("'F'")
    private boolean isDrive;

    @Column(name = "IS_WALK", nullable = false)
    @ColumnDefault("'F'")
    private boolean isWalk;

    @Column(name = "START_DATE")
    private LocalDateTime startDate;

    @Column(name = "END_DATE")
    private LocalDateTime endDate;

    @Column(name = "START_ADDRESS", length = 200)
    private String startAddress;

    @Column(name = "END_ADDRESS", length = 200)
    private String endAddress;

    @Column(name = "START_LAT")
    private float startLat;

    @Column(name = "START_LNG")
    private float startLng;

    @Column(name = "END_LAT")
    private float endLat;

    @Column(name = "END_LNG")
    private float endLng;

    @Column(name = "PRICE")
    private float price;
}