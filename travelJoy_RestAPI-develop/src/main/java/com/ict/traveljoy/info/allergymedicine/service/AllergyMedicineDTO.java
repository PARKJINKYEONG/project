package com.ict.traveljoy.info.allergymedicine.service;


import com.ict.traveljoy.info.allergy.repository.Allergy;
import com.ict.traveljoy.info.allergymedicine.repository.AllergyMedicine;
import com.ict.traveljoy.info.medicine.repository.Medicine;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AllergyMedicineDTO {
	private Long id;
	private Allergy allergy;
	private Medicine medicine;
	
	public AllergyMedicine toEntity() {
		return AllergyMedicine.builder()
		.id(id)
		.allergy(allergy)
		.medicine(medicine)
		.build();
		
	}
	
	public static AllergyMedicineDTO toDTO(AllergyMedicine allergyMedicine) {
		return AllergyMedicineDTO.builder()
				.id(allergyMedicine.getId())
				.allergy(allergyMedicine.getAllergy())
				.medicine(allergyMedicine.getMedicine())
				.build();
	}
}
