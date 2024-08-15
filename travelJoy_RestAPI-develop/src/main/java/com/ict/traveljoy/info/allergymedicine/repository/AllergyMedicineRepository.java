package com.ict.traveljoy.info.allergymedicine.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AllergyMedicineRepository extends JpaRepository<AllergyMedicine, Long>{

}
