package com.ict.traveljoy.info.userhandicap.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ict.traveljoy.info.userhandicap.service.UserHandicapDTO;
import com.ict.traveljoy.info.userhandicap.service.UserHandicapService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/userhandicap")
@RequiredArgsConstructor
public class UserHandicapController {

    private UserHandicapService userHandicapService;

    @GetMapping
    public List<UserHandicapDTO> getAllUserHandicaps() {
        return userHandicapService.getAll();
    }

    @GetMapping("/{id}")
    public UserHandicapDTO getUserHandicapById(@PathVariable Long id) {
        return userHandicapService.getById(id);
    }
}
