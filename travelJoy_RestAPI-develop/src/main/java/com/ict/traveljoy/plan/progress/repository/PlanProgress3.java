package com.ict.traveljoy.plan.progress.repository;

import org.hibernate.annotations.ColumnDefault;

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

    @ManyToOne
    @JoinColumn(name = "PLAN_ID")
    private Plan plan;

    @Column(name = "IS_TRANSPORTATION", nullable = false,columnDefinition = "NUMBER(1, 0)")
    @ColumnDefault("0")
    private Integer isTransportation;

    @Column(name = "IS_DISTANCE", nullable = false,columnDefinition = "NUMBER(1, 0)")
    @ColumnDefault("1")
    private Integer isDistance;

    @Column(name = "IS_PRICE", nullable = false,columnDefinition = "NUMBER(1, 0)")
    @ColumnDefault("0")
    private Integer isPrice;

    @Column(name = "IS_RATE", nullable = false,columnDefinition = "NUMBER(1, 0)")
    @ColumnDefault("0")
    private Integer isRate;

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