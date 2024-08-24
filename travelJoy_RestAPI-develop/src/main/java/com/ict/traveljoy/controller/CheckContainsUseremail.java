package com.ict.traveljoy.controller;


import org.springframework.stereotype.Component;

import com.ict.traveljoy.security.jwt.util.JwtUtility;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class CheckContainsUseremail {
	
	
	private final JwtUtility jwtUtil;

	public String checkContainsUseremail(HttpServletRequest request) {
		String authorization = request.getHeader("Authorization");
		String token,useremail;
		try {
			if( authorization.startsWith("Bearer ")){
				token = authorization.split(" ")[1];
				useremail = jwtUtil.getUserEmailFromToken(token);
			}
			else {
//				return new ResponseEntity<>(HttpStatus.FORBIDDEN); //useremail없음, 403
				useremail = "aaa@aaa.com";
				//useremail = null;
			}
		}
		catch(Exception e) {
			useremail = "aaa@aaa.com";
		}

		return useremail;
	}
}
