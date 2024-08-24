package com.ict.traveljoy.info.medicine.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ict.traveljoy.info.medicine.service.MedicineDTO;
import com.ict.traveljoy.info.medicine.service.MedicineService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/medicine")
@RequiredArgsConstructor
public class MedicineController {

    private MedicineService medicineService;

    @GetMapping
    public List<MedicineDTO> getAllMedicines() {
        return medicineService.getAll();
    }

    @GetMapping("/{id}")
    public MedicineDTO getMedicineById(@PathVariable Long id) {
        return medicineService.getMedicineById(id);
    }
}
