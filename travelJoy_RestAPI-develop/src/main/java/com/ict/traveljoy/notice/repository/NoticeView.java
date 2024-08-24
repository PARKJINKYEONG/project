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
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="notice_view")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NoticeView {

	@Id
	@Column(name="NOTICE_VIEW_ID")
	@SequenceGenerator(name = "seq_notice_view",sequenceName = "seq_notice_view",allocationSize = 1,initialValue = 1)
	@GeneratedValue(generator = "seq_notice_view",strategy = GenerationType.SEQUENCE)
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "NOTICE_ID", nullable = false)
	private Notice notice;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "USER_ID", nullable = false)
	private Users user;
	
	@ManyToOne
	@JoinColumn(name="VIEW_COUNT_ID")
	private ViewCount viewcount;
	
	@Column(name="VIEW_DATE")
	@ColumnDefault("SYSDATE")
	@CreationTimestamp
    private LocalDateTime viewDate; //가장 최근에 본 날짜에 따라 횟수 증가/증가X
}
