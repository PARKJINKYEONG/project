package com.ict.traveljoy.info.allergymedicine.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ict.traveljoy.info.allergy.repository.Allergy;
import com.ict.traveljoy.info.allergy.repository.AllergyRepository;
import com.ict.traveljoy.info.allergy.service.AllergyService;
import com.ict.traveljoy.info.allergymedicine.repository.AllergyMedicine;
import com.ict.traveljoy.info.allergymedicine.repository.AllergyMedicineRepository;
import com.ict.traveljoy.info.medicine.repository.Medicine;
import com.ict.traveljoy.info.medicine.repository.MedicineRepository;
import com.ict.traveljoy.info.medicine.service.MedicineService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class AllergyMedicineService {
	
	private final AllergyMedicineRepository allergyMedicineRepository;
	private final AllergyRepository allergyRepository;
	private final MedicineRepository medicineRepository;
	
	public List<AllergyMedicineDTO> getAll() {
        List<AllergyMedicine> allergyMedicines = allergyMedicineRepository.findAll();
        return allergyMedicines.stream().map(AllergyMedicineDTO::toDTO).collect(Collectors.toList());
    }

    public AllergyMedicineDTO getAllergyMedicineById(Long id) {
        AllergyMedicine allergyMedicine = allergyMedicineRepository.findById(id).get();
        return AllergyMedicineDTO.toDTO(allergyMedicine);
    }

    public List<AllergyMedicineDTO> getMedicinesByAllergyId(Long allergyId) {
        List<AllergyMedicine> allergyMedicines = allergyMedicineRepository.findByAllergyId(allergyId);
        return allergyMedicines.stream().map(AllergyMedicineDTO::toDTO).collect(Collectors.toList());
    }

    public AllergyMedicineDTO saveAllergyMedicine(AllergyMedicineDTO allergyMedicineDTO) {
    	// 알러지, 약이 테이블에 존재하는지 검증
        Allergy allergy = allergyRepository.findById(allergyMedicineDTO.getAllergy().getId()).orElse(null);
        Medicine medicine = medicineRepository.findById(allergyMedicineDTO.getMedicine().getId()).orElse(null);

        if (allergy == null) {
            throw new IllegalArgumentException("테이블에 존재하지 않는 알러지입니다");
        }
        if (medicine == null) {
            throw new IllegalArgumentException("테이블에 존재하지 않는 약입니다");
        }

        AllergyMedicine allergyMedicine = allergyMedicineDTO.toEntity();
        allergyMedicine.setAllergy(allergy);
        allergyMedicine.setMedicine(medicine);

        AllergyMedicine savedAllergyMedicine = allergyMedicineRepository.save(allergyMedicine);
        return AllergyMedicineDTO.toDTO(savedAllergyMedicine);
    }
}
