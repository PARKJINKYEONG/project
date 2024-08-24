package com.ict.traveljoy.info.userinterest.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ict.traveljoy.info.interest.repository.Interest;
import com.ict.traveljoy.info.interest.repository.InterestRepository;
import com.ict.traveljoy.info.userinterest.repository.UserInterest;
import com.ict.traveljoy.info.userinterest.repository.UserInterestRepository;
import com.ict.traveljoy.users.repository.UserRepository;
import com.ict.traveljoy.users.repository.Users;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserInterestService {
	private final UserInterestRepository userInterestRepository;
    private final UserRepository userRepository;
    private final InterestRepository interestRepository;

    // 새로운 UserInterest를 저장하는 메서드
    public UserInterestDTO saveUserInterest(UserInterestDTO dto) {
        Users user = userRepository.findById(dto.getUser().getId())
                .orElseThrow(() -> new IllegalArgumentException("해당 유저를 찾을 수 없습니다: " + dto.getUser().getId()));
        Interest interest = interestRepository.findById(dto.getInterest().getId())
                .orElseThrow(() -> new IllegalArgumentException("해당 관심사를 찾을 수 없습니다: " + dto.getInterest().getId()));

        UserInterest userInterest = dto.toEntity();
        userInterest.setUser(user);
        userInterest.setInterest(interest);

        UserInterest savedEntity = userInterestRepository.save(userInterest);
        return UserInterestDTO.toDTO(savedEntity);
    }

    // ID로 특정 UserInterest를 조회하는 메서드
    public UserInterestDTO findById(Long id) {
        Optional<UserInterest> userInterests = userInterestRepository.findById(id);
        return userInterests.map(userInterest->UserInterestDTO.toDTO(userInterest))
                .orElseThrow(() -> new IllegalArgumentException("해당 ID로 유저 관심사를 찾을 수 없습니다: " + id));
    }

    // 모든 UserInterest를 조회하는 메서드
    public List<UserInterestDTO> findAll() {
        List<UserInterest> userInterests = userInterestRepository.findAll();
        return userInterests.stream()
                .map(userInterest->UserInterestDTO.toDTO(userInterest))
                .collect(Collectors.toList());
    }

    // 특정 UserInterest를 삭제하는 메서드
    public void deleteById(Long id) {
        if (!userInterestRepository.existsById(id)) {
            throw new IllegalArgumentException("해당 ID로 유저 관심사를 찾을 수 없습니다: " + id);
        }
        userInterestRepository.deleteById(id);
    }

    // 특정 UserInterest를 업데이트하는 메서드
    public UserInterestDTO updateUserInterest(Long id, UserInterestDTO dto) {
        UserInterest existingEntity = userInterestRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 ID로 유저 관심사를 찾을 수 없습니다: " + id));

        Users user = userRepository.findById(dto.getUser().getId())
                .orElseThrow(() -> new IllegalArgumentException("해당 유저를 찾을 수 없습니다: " + dto.getUser().getId()));
        Interest interest = interestRepository.findById(dto.getInterest().getId())
                .orElseThrow(() -> new IllegalArgumentException("해당 관심사를 찾을 수 없습니다: " + dto.getInterest().getId()));

        existingEntity.setUser(user);
        existingEntity.setInterest(interest);

        UserInterest updatedEntity = userInterestRepository.save(existingEntity);
        return UserInterestDTO.toDTO(updatedEntity);
    }
}
