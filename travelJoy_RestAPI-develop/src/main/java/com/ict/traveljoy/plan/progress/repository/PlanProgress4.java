package com.ict.traveljoy.plan.progress.repository;

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
	
	@ManyToOne
    @JoinColumn(name = "PLAN_ID")
    private Plan plan;
	 
	@ManyToOne
	@JoinColumn(name = "AI_MADE_PLAN_ID")
	private Plan aiMadePlan;
}
