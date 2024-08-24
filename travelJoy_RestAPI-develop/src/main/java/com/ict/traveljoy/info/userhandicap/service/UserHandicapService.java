package com.ict.traveljoy.info.userhandicap.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ict.traveljoy.info.userhandicap.repository.UserHandicap;
import com.ict.traveljoy.info.userhandicap.repository.UserHandicapRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserHandicapService {
	
	private final UserHandicapRepository userHandicapRepository;

    public List<UserHandicapDTO> getAll() {
        List<UserHandicap> userHandicaps = userHandicapRepository.findAll();
        return userHandicaps.stream()
            .map(userHandicap->UserHandicapDTO.toDTO(userHandicap))
            .collect(Collectors.toList());
    }

    public UserHandicapDTO getById(Long id) {
        UserHandicap userHandicap = userHandicapRepository.findById(id).orElse(null);
        return UserHandicapDTO.toDTO(userHandicap);
    }
}
