package com.ict.traveljoy.info.allergymedicine.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ict.traveljoy.info.allergymedicine.service.AllergyMedicineDTO;
import com.ict.traveljoy.info.allergymedicine.service.AllergyMedicineService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/allergymedicine")
@RequiredArgsConstructor
public class AllergyMedicineController {

    private AllergyMedicineService allergyMedicineService;

    @GetMapping
    public List<AllergyMedicineDTO> getAllergyMedicines() {
        return allergyMedicineService.getAll();
    }

    @GetMapping("/{id}")
    public AllergyMedicineDTO getAllergyMedicineById(@PathVariable Long id) {
        return allergyMedicineService.getAllergyMedicineById(id);
    }

    @GetMapping("/allergy/{allergyId}")
    public List<AllergyMedicineDTO> getMedicinesByAllergyId(@PathVariable Long allergyId) {
        return allergyMedicineService.getMedicinesByAllergyId(allergyId);
    }

    @PostMapping
    public AllergyMedicineDTO createAllergyMedicine(@RequestBody AllergyMedicineDTO allergyMedicineDTO) {
        return allergyMedicineService.saveAllergyMedicine(allergyMedicineDTO);
    }
}
