package com.ict.traveljoy.security;


import java.io.IOException;
import java.io.PrintWriter;

import org.springframework.boot.web.servlet.ServletListenerRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.session.HttpSessionEventPublisher;

import com.ict.traveljoy.security.filter.JwtAuthenticationFilter;
import com.ict.traveljoy.security.filter.LoginFilter;
import com.ict.traveljoy.security.jwt.service.RefreshService;
import com.ict.traveljoy.security.jwt.util.JwtUtility;
import com.ict.traveljoy.users.service.UserService;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Configuration // 스프링의 설정 정보를 담는 클래스임을 나타내는 어노테이션입니다.
@EnableWebSecurity // 스프링 시큐리티 설정을 활성화합니다.
public class SecurityConfig {
    private final UserService userService;
    private final RefreshService refreshService;
    private final AuthenticationConfiguration authenticationConfiguration;
    private final JwtUtility jwtUtility;

    // 생성자를 통한 의존성 주입으로, 필요한 서비스와 설정을 초기화합니다.
    public SecurityConfig(UserService userService, RefreshService refreshService, AuthenticationConfiguration authenticationConfiguration, JwtUtility jwtUtility) {
        this.userService = userService;
        this.refreshService = refreshService;
        this.authenticationConfiguration = authenticationConfiguration;
        this.jwtUtility = jwtUtility;
    }

    // 인증 관리자를 스프링 컨테이너에 Bean으로 등록합니다. 인증 과정에서 중요한 역할을 합니다.
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
    
    

    // HTTP 보안 관련 설정을 정의합니다.
    // SecurityFilterChain Bean을 등록하여 HTTP 요청에 대한 보안을 구성합니다.
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // CSRF, Form Login, Http Basic 인증을 비활성화합니다.
                .csrf(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)
                // HTTP 요청에 대한 접근 권한을 설정합니다.
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/**","/register","/logout", "/login", "/reissue", "/checkemail", "/validemail"
                        		, "/swagger-ui/**","/v3/api-docs/**" //swagger관련 링크
                        		,"/statistics/**","/reviewList/**","/places/**","/feedbacks/**","/notice/**","/ask/**","/bookmark/**").permitAll() // 해당 경로들은 인증 없이 접근 가능합니다.
                        .anyRequest().authenticated()) // 그 외의 모든 요청은 인증을 요구합니다.
                // JWTFilter와 LoginFilter를 필터 체인에 등록합니다.
                .addFilterBefore(new JwtAuthenticationFilter(jwtUtility), LoginFilter.class)
                .addFilterAt(new LoginFilter(userService, refreshService, authenticationManager(authenticationConfiguration), jwtUtility), UsernamePasswordAuthenticationFilter.class)
                // 로그아웃 처리를 커스터마이징합니다.
                .logout(logout -> logout
                        .addLogoutHandler(new CustomLogoutHandler(jwtUtility, refreshService, userService))
                        .logoutSuccessHandler((request, response, authentication) -> {
                            response.setStatus(HttpServletResponse.SC_OK);
                        }))
                // 세션 정책을 STATELESS로 설정하여, 세션을 사용하지 않는다는 것을 명시합니다.
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }
}
