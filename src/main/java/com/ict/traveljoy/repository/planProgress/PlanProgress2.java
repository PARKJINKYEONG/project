package com.ict.traveljoy.repository.planProgress;

import java.sql.Timestamp;

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
@Table(name = "plan_progress_2")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlanProgress2 {

    @Id
    @SequenceGenerator(name = "seq_plan_progress_2",sequenceName = "seq_plan_progress_2",allocationSize = 1,initialValue = 1)
    @GeneratedValue(generator = "seq_plan_progress_2",strategy = GenerationType.SEQUENCE)
    @Column(name = "PLAN_PROGRESS_2_ID", nullable = false)
    private Long planProgress2Id;

    @Column(name = "PLAN_ID")
    private Long planId;

    @Column(name = "DETAIL_PLAN_NAME", length = 50)
    private String detailPlanName;

    @Column(name = "DETAIL_PLAN_START_DATE")
    private Timestamp detailPlanStartDate;

    @Column(name = "DETAIL_PLAN_END_DATE")
    private Timestamp detailPlanEndDate;

    @Column(name = "IS_EVENT", length = 1, nullable = false)
    @ColumnDefault("false")
    private char isEvent;

    @Column(name = "IS_FOOD", length = 1, nullable = false)
    @ColumnDefault("false")
    private char isFood;

    @Column(name = "IS_SIGHT", length = 1, nullable = false)
    @ColumnDefault("false")
    private char isSight;

    @Column(name = "IS_HOTEL", length = 1, nullable = false)
    @ColumnDefault("false")
    private char isHotel;

    @Column(name = "EVENT_ID")
    private Long eventId;

    @Column(name = "FOOD_ID")
    private Long foodId;

    @Column(name = "SIGHT_ID")
    private Long sightId;

    @Column(name = "HOTEL_ID")
    private Long hotelId;

}