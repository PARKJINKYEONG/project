package com.ict.traveljoy.info.handicaprecommend.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ict.traveljoy.info.handicaprecommend.repository.HandicapRecommend;
import com.ict.traveljoy.info.handicaprecommend.repository.HandicapRecommendRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class HandicapRecommendService {
	// 의존성 주입을 통해 HandicapRecommendRepository를 사용
    private final HandicapRecommendRepository handicapRecommendRepository;

    // 새로운 HandicapRecommend를 저장하는 메서드
    public HandicapRecommendDTO saveHandicapRecommend(HandicapRecommendDTO dto) {
        HandicapRecommend entity = dto.toEntity();
        HandicapRecommend savedEntity = handicapRecommendRepository.save(entity);
        return HandicapRecommendDTO.toDTO(savedEntity);
    }

    // ID로 특정 HandicapRecommend를 조회하는 메서드
    public HandicapRecommendDTO findById(Long id) {
        Optional<HandicapRecommend> handicapRecommends = handicapRecommendRepository.findById(id);
        return handicapRecommends.map(handicapRecommend->HandicapRecommendDTO.toDTO(handicapRecommend))
                     .orElseThrow(() -> new IllegalArgumentException("해당 ID로 장애 추천을 찾을 수 없습니다: " + id));
    }

    // 모든 HandicapRecommend를 조회하는 메서드
    public List<HandicapRecommendDTO> findAll() {
        List<HandicapRecommend> handicapRecommends = handicapRecommendRepository.findAll();
        return handicapRecommends.stream()
                       .map(handicapRecommend->HandicapRecommendDTO.toDTO(handicapRecommend))
                       .collect(Collectors.toList());
    }

    // 특정 HandicapRecommend를 삭제하는 메서드
    public void deleteById(Long id) {
        if (!handicapRecommendRepository.existsById(id)) {
            throw new IllegalArgumentException("해당 ID로 장애 추천을 찾을 수 없습니다: " + id);
        }
        handicapRecommendRepository.deleteById(id);
    }

    // 특정 HandicapRecommend를 업데이트하는 메서드
    public HandicapRecommendDTO updateHandicapRecommend(Long id, HandicapRecommendDTO dto) {
        HandicapRecommend existingEntity = handicapRecommendRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("해당 ID로 장애 추천을 찾을 수 없습니다: " + id));
        
        existingEntity.setHandicap(dto.getHandicap());
        existingEntity.setInterest(dto.getInterest());

        HandicapRecommend updatedEntity = handicapRecommendRepository.save(existingEntity);
        return HandicapRecommendDTO.toDTO(updatedEntity);
    }
}
