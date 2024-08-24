package com.ict.traveljoy.users.service;

import java.util.Optional;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ict.traveljoy.users.repository.UserRepository;
import com.ict.traveljoy.users.repository.Users;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {
	private final UserRepository userRepository;
	private final BCryptPasswordEncoder bCryptPasswordEncoder;
	
	public UserDTO signUp(UserDTO dto) {
		userRepository.findByEmail(dto.getEmail()).ifPresent(u -> {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "이메일이 이미 사용중입니다.");
        });
		dto = dto.toBuilder()
		.password(bCryptPasswordEncoder.encode(dto.getPassword())).build();
		return UserDTO.toDTO(userRepository.save(dto.toEntity()));
	}
	
	public UserDTO findByEmail(String username) {
	    Users user = userRepository.findByEmail(username)
	                               .orElseThrow(() -> new EntityNotFoundException("존재하지 않는 유저입니다."));
	    return UserDTO.toDTO(user);
	}
	
	public Users findEntityByEmail(String email) {
	    return userRepository.findByEmail(email)
	        .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
	}

	public boolean checkEmailExists(String email) {
		return userRepository.existsByEmail(email);
	}
    
}
