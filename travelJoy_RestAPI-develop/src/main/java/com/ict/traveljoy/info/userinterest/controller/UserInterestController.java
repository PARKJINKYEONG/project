package com.ict.traveljoy.info.userinterest.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ict.traveljoy.info.userinterest.service.UserInterestDTO;
import com.ict.traveljoy.info.userinterest.service.UserInterestService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/userinterest")
@RequiredArgsConstructor
public class UserInterestController {

    private UserInterestService userInterestService;

    @PostMapping
    public UserInterestDTO createUserInterest(@RequestBody UserInterestDTO dto) {
        return userInterestService.saveUserInterest(dto);
    }

    @GetMapping("/{id}")
    public UserInterestDTO getUserInterestById(@PathVariable Long id) {
        return userInterestService.findById(id);
    }

    @GetMapping
    public List<UserInterestDTO> getAllUserInterests() {
        return userInterestService.findAll();
    }

    @PutMapping("/{id}")
    public UserInterestDTO updateUserInterest(@PathVariable Long id, @RequestBody UserInterestDTO dto) {
        return userInterestService.updateUserInterest(id, dto);
    }

    @DeleteMapping("/{id}")
    public void deleteUserInterest(@PathVariable Long id) {
        userInterestService.deleteById(id);
    }
}