package com.ict.traveljoy.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ict.traveljoy.users.service.UserDto;
import com.ict.traveljoy.users.service.UserService;

import lombok.RequiredArgsConstructor;

@CrossOrigin
@RestController // If you need to expose RESTful APIs
@RequiredArgsConstructor
public class testController {

    private final UserService usersService;
    private final ObjectMapper objectMapper;
    
    @GetMapping("/api")
    public String test() {
        return "success";
    }
    
    @GetMapping("/api/hello")
    public String test2() {
        return "success hello";
    }
    
    @PostMapping("/users")
    public ResponseEntity<UserDto> signUp(@RequestParam Map<String, Object> map) {
        try {
            System.out.println(map.get("kakao"));
            
            UserDto dto = objectMapper.convertValue(map, UserDto.class);
            UserDto insertedDto = usersService.signUp(dto);
            
            return ResponseEntity.ok(insertedDto);
        } catch(Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    
    @GetMapping("/react")
    public String frontend() {
        return "react/index";
    }
    
    
    
}
