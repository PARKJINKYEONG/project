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
	
	 @Column(name = "START_DETAIL_PLAN_ID")
	 private Long startDetailPlanId;
	 
	 @Column(name = "END_DETAIL_PLAN_ID")
	 private Long endDetailPlanId;
	 
	 @Column(name = "TRANSPORTATION_ID")
	 private Long transportationId;
}
