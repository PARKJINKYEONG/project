package com.ict.traveljoy.service.planProgress;

import com.ict.traveljoy.repository.planProgress.Move;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MoveDto {
	private long moveId;
	private long startDetailPlanId;
	private long endDetailPlanId;
	private long transportationId;
	
	public Move toEntity() {
		return Move.builder()
				.moveId(moveId)
				.startDetailPlanId(startDetailPlanId)
				.endDetailPlanId(endDetailPlanId)
				.transportationId(transportationId)
				.build();
	}
	
	public static MoveDto toDto(Move move) {
		return MoveDto.builder()
				.moveId(move.getMoveId())
				.startDetailPlanId(move.getStartDetailPlanId())
				.endDetailPlanId(move.getEndDetailPlanId())
				.transportationId(move.getTransportationId())
				.build();
	}
}
