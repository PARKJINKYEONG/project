package com.ict.traveljoy.smtp;

import java.time.LocalDateTime;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import com.ict.traveljoy.pushalarm.repository.PushAlarm;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
public class Mail {
	@Id
	@SequenceGenerator(name = "seq_mail",sequenceName = "seq_mail",allocationSize = 1,initialValue = 1)
	@GeneratedValue(generator = "seq_mail",strategy = GenerationType.SEQUENCE)
	@Column(name = "mail_id")
	private Long id;
	
	@Column(length=50)
	private String email;
	
	@Column(length=50)
	private String authCode;
	
	@Column
	private Integer todayTryCount;
	
	@Column(nullable = false,columnDefinition = "NUMBER(1, 0)",name="IS_AUTH")
    @ColumnDefault("0")
    private Integer isAuth;
	
	@Column
	private LocalDateTime lastTryDate;
	
	@Column
	@ColumnDefault("SYSDATE")
	@CreationTimestamp
	private LocalDateTime createDate;
}
