package com.ict.traveljoy.repository.planProgress;

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
@Table(name = "plan_progress_4")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlanProgress4 {
	
	@Id
    @SequenceGenerator(name = "seq_plan_progress_4",sequenceName = "seq_plan_progress_4",allocationSize = 1,initialValue = 1)
    @GeneratedValue(generator = "seq_plan_progress_4",strategy = GenerationType.SEQUENCE)
    @Column(name = "PLAN_PROGRESS_4_ID", nullable = false)
    private Long planProgress4Id;
	
	 @Column(name = "PLAN_ID")
	 private Long planId;
	 
	 @Column(name = "AI_MADE_PLAN_ID")
	 private Long aiMadePlanId;
}
