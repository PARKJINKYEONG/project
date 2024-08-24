package com.ict.traveljoy.info.medicine.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ict.traveljoy.info.medicine.repository.Medicine;
import com.ict.traveljoy.info.medicine.repository.MedicineRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class MedicineService {
	private final MedicineRepository medicineRepository;
	
	public List<MedicineDTO> getAll() {
        List<Medicine> Medicines = medicineRepository.findAll();
        return Medicines.stream().map(medicine->MedicineDTO.toDTO(medicine)).collect(Collectors.toList());
    }

    public MedicineDTO getMedicineById(Long id) {
    	Medicine medicine = medicineRepository.findById(id).get();
        return MedicineDTO.toDTO(medicine);
    }
}
