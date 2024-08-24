package com.ict.traveljoy.info.userallergy.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ict.traveljoy.info.userallergy.repository.UserAllergy;
import com.ict.traveljoy.info.userallergy.repository.UserAllergyRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserAllergyService {
	private final UserAllergyRepository userAllergyRepository;

    public List<UserAllergyDTO> getAll() {
        List<UserAllergy> userAllergies = userAllergyRepository.findAll();
        return userAllergies.stream()
            .map(userAllergie->UserAllergyDTO.toDTO(userAllergie))
            .collect(Collectors.toList());
    }

    public UserAllergyDTO getById(Long id) {
        UserAllergy userAllergy = userAllergyRepository.findById(id).orElse(null);
        return UserAllergyDTO.toDTO(userAllergy);
    }
}
