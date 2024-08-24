package com.ict.traveljoy.info.userallergy.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ict.traveljoy.info.userallergy.service.UserAllergyDTO;
import com.ict.traveljoy.info.userallergy.service.UserAllergyService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/userallergie")
@RequiredArgsConstructor
public class UserAllergyController {

    private UserAllergyService userAllergyService;

    @GetMapping
    public List<UserAllergyDTO> getAllUserAllergies() {
        return userAllergyService.getAll();
    }

    @GetMapping("/{id}")
    public UserAllergyDTO getUserAllergyById(@PathVariable Long id) {
        return userAllergyService.getById(id);
    }
}