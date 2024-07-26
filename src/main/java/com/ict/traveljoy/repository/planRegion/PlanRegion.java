package com.ict.traveljoy.repository.planRegion;

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
@Table(name = "plan_region")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlanRegion {

    @Id
    @SequenceGenerator(name = "seq_plan_region",sequenceName = "seq_plan_region",allocationSize = 1,initialValue = 1)
    @GeneratedValue(generator = "seq_plan_region",strategy = GenerationType.SEQUENCE)
    @Column(name = "PLAN_REGION_ID")
    private Long planRegionId;

    @Column(name = "PLAN_ID")
    private Long planId;

    @Column(name = "REGION_ID")
    private Long regionId;
}