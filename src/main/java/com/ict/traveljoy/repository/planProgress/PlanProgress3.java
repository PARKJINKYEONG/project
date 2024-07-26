package com.ict.traveljoy.repository.planProgress;

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
@Table(name = "plan_progress_3")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlanProgress3 {

    @Id
    @SequenceGenerator(name = "seq_plan_progress_3",sequenceName = "seq_plan_progress_3",allocationSize = 1,initialValue = 1)
    @GeneratedValue(generator = "seq_plan_progress_3",strategy = GenerationType.SEQUENCE)
    @Column(name = "PLAN_PROGRESS_3_ID", nullable = false)
    private Long planProgress3Id;

    @Column(name = "PLAN_ID")
    private Long planId;

    @Column(name = "IS_TRANSPORTATION", nullable = false)
    @ColumnDefault("false")
    private char isTransportation;

    @Column(name = "IS_DISTANCE", nullable = false)
    @ColumnDefault("false")
    private char isDistance;

    @Column(name = "IS_PRICE", nullable = false)
    @ColumnDefault("false")
    private char isPrice;

    @Column(name = "IS_RATE", nullable = false)
    @ColumnDefault("false")
    private char isRate;

    @Column(name = "MINIMUM_COST")
    @ColumnDefault("100000")
    private Long minimumCost;

    @Column(name = "MAXIMUM_COST")
    @ColumnDefault("200000")
    private Long maximumCost;

    @Column(name = "MINIMUM_RATE")
    private Integer minimumRate;

    @Column(name = "MAXIMUM_RATE")
    private Integer maximumRate;

}