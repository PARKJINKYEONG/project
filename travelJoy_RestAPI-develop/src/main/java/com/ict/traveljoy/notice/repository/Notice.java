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
	@Column(name="NOTICE_DATE")
	@CreationTimestamp
	private LocalDateTime noticeDate;
	
	@Column(nullable = false,name="NOTICE_TITLE")
	private String title; 
	
	@Column(nullable = false,name="NOTICE_CONTENT",length = 2000)
	private String content;
	
	@Column(name = "IS_DELETE", length = 1, nullable = false,columnDefinition = "NUMBER(1, 0)")
	@ColumnDefault("0")
	private Integer isDelete;
	
	@Column(name = "IS_ACTIVE", length = 1, nullable = false,columnDefinition = "NUMBER(1, 0)")
	@ColumnDefault("1")
	private Integer isActive;
	
	@Column(nullable = false,name="WRITER")
	private String writer;
	
	@ManyToOne
	@JoinColumn(name = "USER_ID")
	private Users user;

}
