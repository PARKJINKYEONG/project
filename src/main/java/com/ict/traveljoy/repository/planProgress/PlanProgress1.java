package com.ict.traveljoy.repository.planProgress;

import java.math.BigDecimal;
import java.util.Date;

import org.hibernate.annotations.ColumnDefault;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "plan_progress_1")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlanProgress1 {

    @Id
    @SequenceGenerator(name = "seq_plan_progress_1",sequenceName = "seq_plan_progress_1",allocationSize = 1,initialValue = 1)
    @GeneratedValue(generator = "seq_plan_progress_1", strategy = GenerationType.SEQUENCE)
    @Column(name = "PLAN_PROGRESS_1_ID")
    private Long planProgress1Id;

    @Column(name = "PLAN_START_DATE", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date planStartDate;

    @Column(name = "PLAN_END_DATE", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date planEndDate;

    @Column(name = "TRAVELERS", nullable = false)
    @ColumnDefault("1")
    private Integer travelers;

    @Column(name = "TRAVEL_COST")
    private BigDecimal travelCost;

    @Column(name = "PLAN_ID")
    private Long planId;
}