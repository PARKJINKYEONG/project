package com.ict.traveljoy.info.handicap.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ict.traveljoy.info.handicap.service.HandicapDTO;
import com.ict.traveljoy.info.handicap.service.HandicapService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/handicap")
@RequiredArgsConstructor
public class HandicapController {

    private HandicapService handicapService;

    @GetMapping
    public List<HandicapDTO> getAllHandicaps() {
        return handicapService.getAll();
    }

    @GetMapping("/{id}")
    public HandicapDTO getHandicapById(@PathVariable Long id) {
        return handicapService.getHandicapById(id);
    }
}