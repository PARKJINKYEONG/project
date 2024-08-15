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
public class AllergyMedicineDto {
	private Long id;
	private Long allergyId;
	private Long medicineId;
	
	public AllergyMedicine toEntity() {
		Allergy allergy = new Allergy();
		Medicine medicine = new Medicine();
		
		allergy.setId(allergyId);
		medicine.setId(medicineId);
		return AllergyMedicine.builder()
		.id(id)
		.allergy(allergy)
		.medicine(medicine)
		.build();
		
	}
	
	public static AllergyMedicineDto toDto(AllergyMedicine allergyMedicine) {
		return AllergyMedicineDto.builder()
				.id(allergyMedicine.getId())
				.allergyId(allergyMedicine.getAllergy() != null ? allergyMedicine.getAllergy().getId() : null)
				.medicineId(allergyMedicine.getMedicine() != null ? allergyMedicine.getMedicine().getId() : null)
				.build();
	}
}
