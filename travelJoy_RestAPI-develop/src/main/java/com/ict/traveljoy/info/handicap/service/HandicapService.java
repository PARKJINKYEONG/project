package com.ict.traveljoy.info.handicap.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ict.traveljoy.info.handicap.repository.Handicap;
import com.ict.traveljoy.info.handicap.repository.HandicapRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class HandicapService {
	
	private final HandicapRepository handicapRepository;
	
	public List<HandicapDTO> getAll() {
        List<Handicap> handicaps = handicapRepository.findAll();
        return handicaps.stream().map(handicap->HandicapDTO.toDTO(handicap)).collect(Collectors.toList());
    }

    public HandicapDTO getHandicapById(Long id) {
    	Handicap handicap = handicapRepository.findById(id).get();
        return HandicapDTO.toDTO(handicap);
    }
}
