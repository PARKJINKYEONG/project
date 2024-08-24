package com.ict.traveljoy.info.interest.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ict.traveljoy.info.interest.service.InterestDTO;
import com.ict.traveljoy.info.interest.service.InterestService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/interest")
@RequiredArgsConstructor
public class InterestController {

    private InterestService interestService;

    @PostMapping
    public InterestDTO createInterest(@RequestBody InterestDTO dto) {
        return interestService.saveInterest(dto);
    }

    @GetMapping("/{id}")
    public InterestDTO getInterestById(@PathVariable Long id) {
        return interestService.findById(id);
    }

    @GetMapping
    public List<InterestDTO> getAllInterests() {
        return interestService.findAll();
    }

    @PutMapping("/{id}")
    public InterestDTO updateInterest(@PathVariable Long id, @RequestBody InterestDTO dto) {
        return interestService.updateInterest(id, dto);
    }

    @DeleteMapping("/{id}")
    public void deleteInterest(@PathVariable Long id) {
        interestService.deleteById(id);
    }
}
