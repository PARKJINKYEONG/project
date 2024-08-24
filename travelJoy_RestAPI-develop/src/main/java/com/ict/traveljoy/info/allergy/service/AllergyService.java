package com.ict.traveljoy.info.allergy.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ict.traveljoy.info.allergy.repository.Allergy;
import com.ict.traveljoy.info.allergy.repository.AllergyRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class AllergyService {
	private final AllergyRepository allergyRepository;
	
    public List<AllergyDTO> getAll() {
        List<Allergy> allergies = allergyRepository.findAll();
        return allergies.stream().map(allergy->AllergyDTO.toDTO(allergy)).collect(Collectors.toList());
    }

    public AllergyDTO getAllergyById(Long id) {
        Allergy allergy = allergyRepository.findById(id).get();
        return AllergyDTO.toDTO(allergy);
    }
}
