package com.ict.traveljoy.security;

import io.jsonwebtoken.ExpiredJwtException;
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
        if (authorization != null && authorization.startsWith("Bearer ")) {
            String token = authorization.substring(7); // 'Bearer ' 문자 제거

            try {
                jwtUtility.isTokenExpired(token);
            } catch (ExpiredJwtException e) {
                log.info("Token expired during logout: {}", e.getMessage());
                // HTTP 응답을 설정하여 직접 클라이언트에게 오류 정보를 전달합니다.
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 401 Unauthorized
                response.setContentType("application/json");
                try {
                    response.getWriter().write("{\"error\":\"Session has expired. Please log in again.\"}");
                    response.getWriter().flush();
                } catch (IOException ioException) {
                    log.error("Error writing to response", ioException);
                }
                return; // 메서드를 빠져나와 추가 처리를 중단합니다.
            }

            // 만료 여부와 상관없이 사용자 정보를 조회하여 로그아웃 처리를 합니다.
            String userName = jwtUtility.getUserEmailFromToken(token);
            Optional<Users> userOptional = userService.findByEmail(userName);
            if (userOptional.isPresent()) {
                Users user = userOptional.get();
                /*
                // 카카오 로그아웃 처리
                if ("kakao".equals(user.getLoginType())) {
                    String kakaoAccessToken = user.getSnsAccessToken(); // 저장된 카카오 액세스 토큰 사용
                    String kakaoLogoutUrl = "https://kapi.kakao.com/v1/user/logout";
                    HttpHeaders headers = new HttpHeaders();
                    headers.set("Authorization", "Bearer " + kakaoAccessToken);

                    HttpEntity<String> kakaoRequestEntity = new HttpEntity<>(headers);
                    RestTemplate restTemplate = new RestTemplate();
                    ResponseEntity<String> kakaoResponse = restTemplate.exchange(kakaoLogoutUrl, HttpMethod.POST, kakaoRequestEntity, String.class);
                    log.info("Kakao logout response = {}", kakaoResponse.getBody());
                }
				*/
                Optional<RefreshToken> refresh = refreshService.findByUserId(user.getId());
                refresh.ifPresent(refreshToken -> refreshService.deleteByRefresh(refreshToken.getTokenValue()));
            }
        }

        // 성공적인 로그아웃 응답을 설정합니다.
        response.setStatus(HttpServletResponse.SC_OK);
    }
}
