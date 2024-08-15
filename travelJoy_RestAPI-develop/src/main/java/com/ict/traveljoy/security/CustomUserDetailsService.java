package com.ict.traveljoy.security;


import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.ict.traveljoy.users.repository.UserRepository;
import com.ict.traveljoy.users.repository.Users;

import lombok.RequiredArgsConstructor;

//※아래 UserDetailsService를 스프링 시큐리티에 등록해야
//회원 테이블에 있는 데이타로 로그인 처리를 한다

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

	//리포지토리 주입
	private final UserRepository userRepository;
	private final BCryptPasswordEncoder bCryptPasswordEncoder;
	
	
	

	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		//리포지토리 호출
		Users userEntity=userRepository.findByEmail(email).get();
		
		//조회한 사용자 정보를 저장
		/*
		return User
				.builder()
				.username(userEntity.getEmail())
				.password(userEntity.getPassword())
				.roles(userEntity.getPermission())
				.build();
		*/
		return CustomUserDetails.builder()
				.userEntity(userEntity)
				.build();
				
	}
	
	private Users validateUser(InputUser inputUser){
        // 주어진 이메일로 사용자를 조회합니다. 사용자가 존재하지 않을 경우 UsernameNotFoundException 예외를 발생시킵니다.
        Users user = userRepository.findByEmail(inputUser.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("존재하지 않는 이메일입니다: " + inputUser.getEmail()));
        // 사용자 계정이 삭제된 경우 UsernameNotFoundException 예외를 발생시킵니다.
        if (user.getIsDeleteId() == 1 ? true : false) {
            throw new DisabledException ("삭제된 계정입니다: " + inputUser.getEmail());
        }
        // 사용자 계정이 활성화되지 않은 경우 UsernameNotFoundException 예외를 발생시킵니다.
        if (user.getIsActive() == 1 ? true : false) {
            throw new LockedException("활성화되지 않은 계정입니다: " + inputUser.getEmail());
        }
        return user; // 유효한 사용자 정보를 반환합니다.
    }

}
