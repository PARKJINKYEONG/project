package com.ict.traveljoy.notice.repository;

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
@Table(name = "notice")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Notice {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_notice")
    @SequenceGenerator(name = "seq_notice", sequenceName = "seq_notice", allocationSize = 1)
    @Column(nullable = false, name = "NOTICE_ID")
	private Long id;
	
	@ColumnDefault("SYSDATE")
	@CreationTimestamp
	private LocalDateTime noticeDate;
	
	@Column(nullable = false,name="NOTICE_TITLE")
	private String title; 
	
	@Column(nullable = false,name="NOTICE_CONTENT",length = 2000)
	private String content;
	
	@Column(columnDefinition = "NUMBER(1, 0)")
	@ColumnDefault("0")
	private Integer isDelete;
	
	@Column(columnDefinition = "NUMBER(1, 0)")
	@ColumnDefault("1")
	private Integer isActive;
	
	@Column(nullable = false)
	private String writer;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private Users user;

}
