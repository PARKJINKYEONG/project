package com.ict.traveljoy.repository.planHandicap;

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
@Table(name = "plan_handicap")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlanHandicap {

    @Id
    @SequenceGenerator(name = "seq_plan_handicap",sequenceName = "seq_plan_handicap",allocationSize = 1,initialValue = 1)
    @GeneratedValue(generator = "seq_plan_handicap",strategy = GenerationType.SEQUENCE)
    @Column(name = "PLAN_HANDICAP_ID")
    private Long planHandicapId;

    @Column(name = "PLAN_ID")
    private Long planId;

    @Column(name = "HANDICAP_ID")
    private Long handicapId;
}
