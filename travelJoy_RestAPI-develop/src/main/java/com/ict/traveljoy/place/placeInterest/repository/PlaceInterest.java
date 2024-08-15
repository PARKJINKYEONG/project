package com.ict.traveljoy.place.placeInterest.repository;

import org.hibernate.annotations.ColumnDefault;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Table(name = "place_interest")
public class PlaceInterest {
    @Id
    @SequenceGenerator(name = "seq_place_interest", sequenceName = "seq_place_interest", allocationSize = 1, initialValue = 1)
    @GeneratedValue(generator = "seq_place_interest", strategy = GenerationType.SEQUENCE)
    @Column(name = "PLACE_INTEREST_ID", nullable = false)
    private Long id;

    @Column(name = "INTEREST_ID", nullable = true)
    private Long interestId;

    @Column(name = "IS_EVENT", nullable = false,columnDefinition = "NUMBER(1, 0)")
    @ColumnDefault("0")
    private Integer isEvent;

    @Column(name = "IS_FOOD", nullable = false,columnDefinition = "NUMBER(1, 0)")
    @ColumnDefault("0")
    private Integer isFood;

    @Column(name = "IS_SIGHT", nullable = false,columnDefinition = "NUMBER(1, 0)")
    @ColumnDefault("0")
    private Integer isSight;

    @Column(name = "IS_HOTEL", nullable = false,columnDefinition = "NUMBER(1, 0)")
    @ColumnDefault("0")
    private Integer isHotel;
}
