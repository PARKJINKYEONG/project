package com.ict.traveljoy.info.allergymedicine.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AllergyMedicineRepository extends JpaRepository<AllergyMedicine, Long>{
	List<AllergyMedicine> findByAllergyId(Long allergyId);
    List<AllergyMedicine> findByMedicineId(Long medicineId);
}
