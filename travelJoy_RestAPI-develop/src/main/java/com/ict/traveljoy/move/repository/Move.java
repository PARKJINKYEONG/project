package com.ict.traveljoy.move.repository;

import com.ict.traveljoy.plan.progress.repository.PlanProgress2;
import com.ict.traveljoy.place.transportation.repository.Transportation;

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
@Table(name = "move")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Move {
	@Id
    @SequenceGenerator(name = "seq_move",sequenceName = "seq_move",allocationSize = 1,initialValue = 1)
    @GeneratedValue(generator = "seq_move",strategy = GenerationType.SEQUENCE)
    @Column(name = "MOVE_ID", nullable = false)
    private Long moveId;
	
	@ManyToOne
    @JoinColumn(name = "START_DETAIL_PLAN_ID")
    private PlanProgress2 startDetailPlan;

    @ManyToOne
    @JoinColumn(name = "END_DETAIL_PLAN_ID")
    private PlanProgress2 endDetailPlan;

    @ManyToOne
    @JoinColumn(name = "TRANSPORTATION_ID")
    private Transportation transportation;
}
