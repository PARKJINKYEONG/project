package com.ict.traveljoy.controller.user;

import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ict.traveljoy.security.CustomUserDetails;
import com.ict.traveljoy.users.service.UserDTO;
import com.ict.traveljoy.users.service.UserService;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequiredArgsConstructor
public class UserController {
	
	private final UserService userService;
	private final ObjectMapper objectMapper;
	
	@PostMapping("/register")
	public ResponseEntity<UserDTO> signUp(@RequestBody UserDTO dto){
		try {
			UserDTO insertedDto=userService.signUp(dto);
			return ResponseEntity.ok(insertedDto);
		}
		catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}	
	}
	
	@GetMapping("/getprofile")
	public ResponseEntity<Map<String, Object>> getProfile() {
	    try {
	        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal(); // CustomUserDetails로 캐스팅
	        String email = userDetails.getUsername(); // 또는 getEmail() 메서드가 있으면 사용

	        UserDTO user = userService.findByEmail(email);

	        if (user == null) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	        }

	        Map<String, Object> profileData = objectMapper.convertValue(user, Map.class);

	        if (user.getProfileImage() != null) {
	            String imageUrl = "/images/" + user.getProfileImage().getId();
	            profileData.put("profileImageUrl", imageUrl);
	        }

	        profileData.keySet().retainAll(List.of("birthDate", "gender", "name", "nickname", "introduce", "profileImageUrl", "email"));

	        return ResponseEntity.ok(profileData);
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	    }
	}
	
	 @GetMapping("/checkemail")
	 public ResponseEntity<Map<String, Boolean>> checkEmail(@RequestParam("email") String email) {
	        try {
	            boolean exists = userService.checkEmailExists(email);
	            return ResponseEntity.ok(Map.of("exists", exists));
	        } catch (Exception e) {
	            e.printStackTrace();
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("exists", false));
	        }
	  }
	
}
