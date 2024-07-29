package com.ict.traveljoy.service.planProgress;

import com.ict.traveljoy.repository.planProgress.Move;
import com.ict.traveljoy.repository.planProgress.PlanProgress2;
import com.ict.traveljoy.repository.transportation.Transportation;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MoveDto {
    private Long moveId;
    private Long startDetailPlanId;
    private Long endDetailPlanId;
    private Long transportationId;

    public Move toEntity() {
        Move move = new Move();
        move.setMoveId(moveId);

        if (startDetailPlanId != null) {
            PlanProgress2 startDetailPlan = new PlanProgress2();
            startDetailPlan.setPlanProgress2Id(startDetailPlanId);
            move.setStartDetailPlan(startDetailPlan);
        }

        if (endDetailPlanId != null) {
            PlanProgress2 endDetailPlan = new PlanProgress2();
            endDetailPlan.setPlanProgress2Id(endDetailPlanId);
            move.setEndDetailPlan(endDetailPlan);
        }

        return move;
    }

    public static MoveDto toDto(Move move) {
        return MoveDto.builder()
                .moveId(move.getMoveId())
                .startDetailPlanId(move.getStartDetailPlan() != null ? move.getStartDetailPlan().getPlanProgress2Id() : null)
                .endDetailPlanId(move.getEndDetailPlan() != null ? move.getEndDetailPlan().getPlanProgress2Id() : null)
                .transportationId(move.getTransportation() != null ? move.getTransportation().getTransportationId() : null)
                .build();
    }
}
