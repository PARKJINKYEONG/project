package com.ict.traveljoy.notice.repository;

import java.time.LocalDateTime;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

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
@Table(name="view_count")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ViewCount {

	@Id
	@Column(name="view_count_id")
	@SequenceGenerator(name = "seq_view_count",sequenceName = "seq_view_count",allocationSize = 1,initialValue = 1)
	@GeneratedValue(generator = "seq_view_count",strategy = GenerationType.SEQUENCE)
	private Long id;
	
	@Column(name="notive_id")
	private Long noticeId;
	
	@Column(name="user_id")
	private Long userId;
	
	@Column(name="view_date")
	@ColumnDefault("SYSDATE")
	@CreationTimestamp
    private LocalDateTime viewDate;
}
