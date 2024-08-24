package com.ict.traveljoy.smtp;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MailDTO {
	private Long id;
    private String email;
    private String authCode;
    private Integer todayTryCount;
    private LocalDateTime createDate;
    private LocalDateTime lastTryDate;

    private Boolean isAuth;
    
    public Mail toEntity() {
    	return Mail.builder()
    			.id(id)
    			.email(email)
    			.authCode(authCode)
    			.todayTryCount(todayTryCount)
    			.createDate(createDate)
    			.lastTryDate(lastTryDate)
    			.isAuth(isAuth != null && isAuth ? 1 : 0)
    			.build();
    }
    
    public static MailDTO toDTO(Mail mail) {
    	
    	return MailDTO.builder()
    			.id(mail.getId())
    			.email(mail.getEmail())
    			.authCode(mail.getAuthCode())
    			.todayTryCount(mail.getTodayTryCount())
    			.createDate(mail.getCreateDate())
    			.lastTryDate(mail.getLastTryDate())
    			.isAuth(mail.getIsAuth() != null && mail.getIsAuth() == 1 ? true : false)
    			.build();
    	
    }
}