package com.ict.traveljoy.security.jwt.service;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import com.ict.traveljoy.security.jwt.refreshtoken.RefreshRepository;
import com.ict.traveljoy.security.jwt.refreshtoken.RefreshToken;

import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class RefreshService {
    private final RefreshRepository refreshRepository;

    public RefreshService(RefreshRepository refreshRepository) {
        this.refreshRepository = refreshRepository;
    }

    public void save(RefreshToken refreshToken) {
    	refreshRepository.findByUserIdAndUserAgent(refreshToken.getUser().getId(), refreshToken.getUserAgent())
    	.ifPresent(token -> refreshRepository.delete(token));
        refreshRepository.save(refreshToken);
    }

    public Optional<RefreshToken> findByTokenValue(String token) {
        return refreshRepository.findByTokenValue(token);
    }

    public Boolean existsByRefresh(String tokenValue) {
        return refreshRepository.existsByTokenValue(tokenValue);
    }

    public void deleteByRefresh(String tokenValue) {
        refreshRepository.deleteByTokenValue(tokenValue);
    }

    public Optional<RefreshToken> findByUserId(Long id) {
        return refreshRepository.findByUserId(id);
    }
}
