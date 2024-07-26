package com.ict.traveljoy.repository.planInterest;

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
@Table(name = "plan_interest")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlanInterest {

    @Id
    @SequenceGenerator(name = "seq_plan_interest",sequenceName = "seq_plan_interest",allocationSize = 1,initialValue = 1)
    @GeneratedValue(generator = "seq_plan_interest",strategy = GenerationType.SEQUENCE)
    @Column(name = "PLAN_INTEREST_ID", nullable = false)
    private Long planInterestId;

    @Column(name = "PLAN_ID")
    private Long planId;

    @Column(name = "INTEREST_ID")
    private Long interestId;

}