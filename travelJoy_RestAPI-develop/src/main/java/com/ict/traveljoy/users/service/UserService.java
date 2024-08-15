package com.ict.traveljoy.users.service;

import java.util.Optional;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ict.traveljoy.users.repository.UserRepository;
import com.ict.traveljoy.users.repository.Users;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
	private final UserRepository userRepository;
	private final ObjectMapper objectMapper;
	private final BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Transactional
	public UserDto signUp(UserDto dto) {
		userRepository.findByEmail(dto.getEmail()).ifPresent(u -> {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "이메일이 이미 사용중입니다.");
        });
		dto = dto.toBuilder()
		.password(bCryptPasswordEncoder.encode(dto.getPassword())).build();
		return UserDto.toDto(userRepository.save(dto.toEntity()));
	}
	
	@Transactional
    public Optional<Users> findByEmail(String username) {
        return userRepository.findByEmail(username);
    }
}
