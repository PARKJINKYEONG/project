package com.ict.traveljoy.place.event.repository;

import java.time.LocalDateTime;

import org.hibernate.annotations.ColumnDefault;

import com.ict.traveljoy.place.region.repository.Region;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
public class Event {

    @Id
    @SequenceGenerator(name = "seq_event",sequenceName = "seq_event",allocationSize = 1,initialValue = 1)
	@GeneratedValue(generator = "seq_event",strategy = GenerationType.SEQUENCE)
    @Column(name = "EVENT_ID")
    private Long id;

    @ManyToOne
	@JoinColumn(name = "region_id",nullable = false)
    private Region region;

    @Column(name = "IS_HAS_IMAGE", nullable = false,columnDefinition = "NUMBER(1, 0)")
    @ColumnDefault("0")
    private Integer isHasImage;

    @Column(name = "EVENT_START_DATE")
    private LocalDateTime eventStartDate;

    @Column(name = "EVENT_END_DATE")
    private LocalDateTime eventEndDate;

    @Column(name = "ENTRANCE_FEE")
    private Float entranceFee;

    @Column(name = "EVENT_NAME", length = 50)
    private String eventName;

    @Column(name = "DESCRIPTIONS",  length = 2000)
    private String descriptions;

    @Column(name = "ADDRESS", length = 200)
    private String address;

    @Column(name = "LAT")
    private Float lat;

    @Column(name = "LNG")
    private Float lng;

    @Column(name = "TOTAL_REVIEW_COUNT")
    private Long totalReviewCount;

    @Column(name = "AVERAGE_REVIEW_RATE")
    private Float averageReviewRate;
}
