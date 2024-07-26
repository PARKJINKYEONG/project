package com.ict.traveljoy.service.planProgress;

import com.ict.traveljoy.repository.planProgress.Move;
import com.ict.traveljoy.repository.planProgress.MoveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class MoveService {

    private final MoveRepository moveRepository;

    @Autowired
    public MoveService(MoveRepository moveRepository) {
        this.moveRepository = moveRepository;
    }

    // startDetailPlanId로 Move 목록 조회
    public List<MoveDto> getMovesByStartDetailPlanId(Long startDetailPlanId) {
        List<Move> moves = moveRepository.findByStartDetailPlanId(startDetailPlanId);
        return moves.stream()
                .map(MoveDto::toDto)
                .collect(Collectors.toList());
    }

    // endDetailPlanId로 Move 목록 조회
    public List<MoveDto> getMovesByEndDetailPlanId(Long endDetailPlanId) {
        List<Move> moves = moveRepository.findByEndDetailPlanId(endDetailPlanId);
        return moves.stream()
                .map(MoveDto::toDto)
                .collect(Collectors.toList());
    }

    // transportationId로 Move 목록 조회
    public List<MoveDto> getMovesByTransportationId(Long transportationId) {
        List<Move> moves = moveRepository.findByTransportationId(transportationId);
        return moves.stream()
                .map(MoveDto::toDto)
                .collect(Collectors.toList());
    }

    // Move 저장
    public MoveDto saveMove(MoveDto moveDto) {
        Move move = moveDto.toEntity();
        Move savedMove = moveRepository.save(move);
        return MoveDto.toDto(savedMove);
    }

    // Move 수정
    public MoveDto updateMove(MoveDto moveDto) {
        Move existingMove = moveRepository.findById(moveDto.getMoveId()).orElse(null);
        if (existingMove != null) {
            existingMove.setStartDetailPlanId(moveDto.getStartDetailPlanId());
            existingMove.setEndDetailPlanId(moveDto.getEndDetailPlanId());
            existingMove.setTransportationId(moveDto.getTransportationId());

            Move updatedMove = moveRepository.save(existingMove);
            return MoveDto.toDto(updatedMove);
        }
        return null; // 수정할 Move가 없는 경우
    }

    // Move 삭제
    public void deleteMove(Long moveId) {
        moveRepository.deleteById(moveId);
    }
}
