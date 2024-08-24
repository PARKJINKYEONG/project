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
@Table(name="view_count")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ViewCount {
	//각 공지글에 대한 방문수
	
	@Id
	@Column(name="VIEW_COUNT_ID")
	@SequenceGenerator(name = "seq_view_count",sequenceName = "seq_view_count",allocationSize = 1,initialValue = 1)
	@GeneratedValue(generator = "seq_view_count",strategy = GenerationType.SEQUENCE)
	private Long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "NOTICE_ID", nullable = false)
	private Notice notice;
	
	
	@Column(name="COUNT")
	@ColumnDefault("0")
	private Long count;
}
