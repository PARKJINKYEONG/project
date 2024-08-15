package com.ict.traveljoy.security.jwt.refreshtoken;

import java.time.LocalDateTime;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import com.ict.traveljoy.users.repository.Users;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RefreshToken {
	
	@Id
	@SequenceGenerator(name = "seq_refresh_token",sequenceName = "seq_refresh_token",allocationSize = 1,initialValue = 1)
	@GeneratedValue(generator = "seq_refresh_token",strategy = GenerationType.SEQUENCE)
	@Column(name = "refresh_token_id", nullable = false)
	private Long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false)
    private Users user;
	
	@Column(nullable = false)
	private String tokenValue;//토큰 값
	
	@Column(nullable = false)
	@ColumnDefault("SYSDATE")
	@CreationTimestamp
	private LocalDateTime issuedAt; //발급 시간
	
	@Column(nullable = false)
	private LocalDateTime expirationDate; //만료 시간
	
	@Column
	private String userAgent; //접속 위치 확인
	
	@Column
	private String status; //토큰의 상태
}
