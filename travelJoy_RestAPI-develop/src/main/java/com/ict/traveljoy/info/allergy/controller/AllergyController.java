package com.ict.traveljoy.info.allergy.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ict.traveljoy.info.allergy.service.AllergyDTO;
import com.ict.traveljoy.info.allergy.service.AllergyService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/allergy")
@RequiredArgsConstructor
public class AllergyController {
	
    private AllergyService allergyService;

    @GetMapping
    public List<AllergyDTO> getAllergies() {
        return allergyService.getAll();
    }
    @GetMapping("/{id}")
    public AllergyDTO getAllergyById(@PathVariable Long id) {
        return allergyService.getAllergyById(id);
    }
}