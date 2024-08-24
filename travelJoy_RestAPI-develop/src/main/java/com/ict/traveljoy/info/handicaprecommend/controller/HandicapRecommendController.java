package com.ict.traveljoy.info.handicaprecommend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ict.traveljoy.info.handicaprecommend.service.HandicapRecommendDTO;
import com.ict.traveljoy.info.handicaprecommend.service.HandicapRecommendService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/handicaprecommend")
@RequiredArgsConstructor
public class HandicapRecommendController {

    private HandicapRecommendService handicapRecommendService;

    @PostMapping
    public HandicapRecommendDTO createHandicapRecommend(@RequestBody HandicapRecommendDTO dto) {
        return handicapRecommendService.saveHandicapRecommend(dto);
    }

    @GetMapping("/{id}")
    public HandicapRecommendDTO getHandicapRecommendById(@PathVariable Long id) {
        return handicapRecommendService.findById(id);
    }

    @GetMapping
    public List<HandicapRecommendDTO> getAllHandicapRecommends() {
        return handicapRecommendService.findAll();
    }

    @PutMapping("/{id}")
    public HandicapRecommendDTO updateHandicapRecommend(@PathVariable Long id, @RequestBody HandicapRecommendDTO dto) {
        return handicapRecommendService.updateHandicapRecommend(id, dto);
    }

    @DeleteMapping("/{id}")
    public void deleteHandicapRecommend(@PathVariable Long id) {
        handicapRecommendService.deleteById(id);
    }
}