package com.ict.traveljoy.controller.user;

import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ict.traveljoy.users.service.UserDto;
import com.ict.traveljoy.users.service.UserService;

import lombok.RequiredArgsConstructor;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequiredArgsConstructor
public class UserController {
	
	private final UserService userService;
	private final ObjectMapper objectMapper;
	
	@PostMapping("/register")
	/*
	public ResponseEntity<UserDto> signUp(@RequestParam Map map){
		try {
			//맵을 DTO로 변환코드 추가
			UserDto dto=objectMapper.convertValue(map, UserDto.class);
			UserDto insertedDto=userService.signUp(dto);
			return ResponseEntity.ok(insertedDto);
		}
		catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
	*/
	
	public ResponseEntity<UserDto> signUp(@RequestBody UserDto dto){
		try {
			UserDto insertedDto=userService.signUp(dto);
			return ResponseEntity.ok(insertedDto);
		}
		catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}	
	}
	
}
