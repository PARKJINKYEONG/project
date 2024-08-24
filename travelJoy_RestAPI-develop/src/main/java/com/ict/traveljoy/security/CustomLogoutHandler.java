package com.ict.traveljoy.security;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.web.client.RestTemplate;

import com.ict.traveljoy.security.jwt.refreshtoken.RefreshToken;
import com.ict.traveljoy.security.jwt.service.RefreshService;
import com.ict.traveljoy.security.jwt.util.JwtUtility;
import com.ict.traveljoy.users.repository.Users;
import com.ict.traveljoy.users.service.UserDTO;
import com.ict.traveljoy.users.service.UserService;

import java.io.IOException;
import java.util.Optional;

@Slf4j
public class CustomLogoutHandler implements LogoutHandler {
    private final JwtUtility jwtUtility;
    private final RefreshService refreshService;
    private final UserService userService;

    public CustomLogoutHandler(JwtUtility jwtUtility, RefreshService refreshService, UserService userService) {
        this.jwtUtility = jwtUtility;
        this.refreshService = refreshService;
        this.userService = userService;
    }

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
    	String authorization = request.getHeader("Authorization");

        try {
            if (authorization != null && authorization.startsWith("Bearer ")) {
                String token = authorization.substring(7); // 'Bearer ' 문자 제거

                // 토큰이 만료되었는지 확인하고 예외 처리
                try {
                    jwtUtility.isTokenExpired(token);
                } catch (ExpiredJwtException e) {
                    log.info("만료된 토큰입니다.");
                    // 토큰이 만료된 경우, 사용자 정보를 조회하지 않고 바로 로그아웃 처리로 넘어갑니다.
                }

                // 토큰이 만료되지 않은 경우에만 사용자 정보를 조회하고 리프레시 토큰을 삭제합니다.
                if (!jwtUtility.isTokenExpired(token)) {
                    String userName = jwtUtility.getUserEmailFromToken(token);
                    UserDTO userDTO = userService.findByEmail(userName);
                    Users user = userDTO.toEntity();

                    String currentUserAgent = request.getHeader("User-Agent");

                    // 특정 userAgent에 해당하는 RefreshToken 삭제
                    Optional<RefreshToken> refreshTokenOptional = refreshService.findByUserEmailAndUserAgent(user.getEmail(), currentUserAgent);
                    refreshTokenOptional.ifPresent(refreshToken -> refreshService.deleteByRefresh(refreshToken.getTokenValue()));
                }
            }
        } finally {
            // 리프레시 토큰 쿠키 삭제
            Cookie refreshTokenCookie = new Cookie("refreshToken", null);
            refreshTokenCookie.setHttpOnly(true);
            refreshTokenCookie.setPath("/");
            refreshTokenCookie.setMaxAge(0);
            response.addCookie(refreshTokenCookie);

            // 성공적인 로그아웃 응답을 설정합니다.
            response.setStatus(HttpServletResponse.SC_OK);
        }
    }
}
