package com.ict.traveljoy.plan.progress.repository;

import java.sql.Timestamp;

import org.hibernate.annotations.ColumnDefault;

import com.ict.traveljoy.place.event.repository.Event;
import com.ict.traveljoy.place.food.repository.Food;
import com.ict.traveljoy.place.hotel.repository.Hotel;
import com.ict.traveljoy.place.sight.repository.Sight;
import com.ict.traveljoy.plan.repository.Plan;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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

    @ManyToOne
    @JoinColumn(name = "PLAN_ID")
    private Plan plan;

    @Column(name = "DETAIL_PLAN_NAME", length = 50)
    private String detailPlanName;

    @Column(name = "DETAIL_PLAN_START_DATE")
    private Timestamp detailPlanStartDate;

    @Column(name = "DETAIL_PLAN_END_DATE")
    private Timestamp detailPlanEndDate;

    @Column(name = "IS_EVENT", length = 1, nullable = false,columnDefinition = "NUMBER(1, 0)")
    @ColumnDefault("0")
    private Integer isEvent;

    @Column(name = "IS_FOOD", length = 1, nullable = false,columnDefinition = "NUMBER(1, 0)")
    @ColumnDefault("0")
    private Integer isFood;

    @Column(name = "IS_SIGHT", length = 1, nullable = false,columnDefinition = "NUMBER(1, 0)")
    @ColumnDefault("0")
    private Integer isSight;

    @Column(name = "IS_HOTEL", length = 1, nullable = false,columnDefinition = "NUMBER(1, 0)")
    @ColumnDefault("0")
    private Integer isHotel;

    @ManyToOne
	@JoinColumn(name = "EVENT_ID")
    private Event event;

    @ManyToOne
	@JoinColumn(name = "FOOD_ID")
    private Food food;

    @ManyToOne
   	@JoinColumn(name = "SIGHT_ID")
    private Sight sight;

    @ManyToOne
   	@JoinColumn(name = "HOTEL_ID")
    private Hotel hotel;

}