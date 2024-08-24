package com.ict.traveljoy.info.interest.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ict.traveljoy.info.interest.repository.Interest;
import com.ict.traveljoy.info.interest.repository.InterestRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class InterestService {
	// 의존성 주입을 통해 InterestRepository를 사용
    private final InterestRepository interestRepository;

    // 새로운 Interest를 저장하는 메서드
    public InterestDTO saveInterest(InterestDTO dto) {
        Interest entity = dto.toEntity();
        Interest savedEntity = interestRepository.save(entity);
        return InterestDTO.toDTO(savedEntity);
    }

    // ID로 특정 Interest를 조회하는 메서드
    public InterestDTO findById(Long id) {
        Optional<Interest> entity = interestRepository.findById(id);
        return entity.map(InterestDTO::toDTO)
                     .orElseThrow(() -> new IllegalArgumentException("해당 ID로 관심사를 찾을 수 없습니다: " + id));
    }

    // 모든 Interest를 조회하는 메서드
    public List<InterestDTO> findAll() {
        List<Interest> interests = interestRepository.findAll();
        return interests.stream()
                       .map(interest->InterestDTO.toDTO(interest))
                       .collect(Collectors.toList());
    }

    // 특정 Interest를 삭제하는 메서드
    public void deleteById(Long id) {
        if (!interestRepository.existsById(id)) {
            throw new IllegalArgumentException("해당 ID로 관심사를 찾을 수 없습니다: " + id);
        }
        interestRepository.deleteById(id);
    }

    // 특정 Interest를 업데이트하는 메서드
    public InterestDTO updateInterest(Long id, InterestDTO dto) {
        Interest existingEntity = interestRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("해당 ID로 관심사를 찾을 수 없습니다: " + id));
        
        existingEntity.setInterestTopic(dto.getInterestTopic());
        existingEntity.setActivityPlace(dto.getActivityPlace() != null && dto.getActivityPlace() ? 1 : 0);
        existingEntity.setClassification(dto.getClassification());

        Interest updatedEntity = interestRepository.save(existingEntity);
        return InterestDTO.toDTO(updatedEntity);
    }
}
