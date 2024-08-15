package com.ict.traveljoy.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class PasswordEncoderConfig {
	//비밀번호 암호화를 빈 등록:사용자가 입력한 비밀번호가 BCrypt 해쉬 알고리즘으로 암호화된다
	//  ※데이타베이스나 메모리에 비밀번호를 저장시 반드시 암호화를 해야한다	
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
