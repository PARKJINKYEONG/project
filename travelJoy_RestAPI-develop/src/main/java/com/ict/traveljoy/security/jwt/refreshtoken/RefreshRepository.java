package com.ict.traveljoy.security.jwt.refreshtoken;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByTokenValue(String tokenValue);

    Boolean existsByTokenValue(String refresh);

    void deleteByTokenValue(String refresh);

    Optional<RefreshToken> findByUserEmail(String email);

	Optional<RefreshToken> findByUserEmailAndUserAgent(String email, String userAgent);

}
