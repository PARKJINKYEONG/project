package com.ict.traveljoy.history.repository;

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
@Table(name="SEARCH_HISTORY")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder



public class SearchHistory {

	@Id
	@SequenceGenerator(name = "seq_search_history",sequenceName = "seq_search_history",allocationSize = 1,initialValue = 1)
	@GeneratedValue(generator = "seq_search_history",strategy = GenerationType.SEQUENCE)
	@Column(name="SEARCH_HISTORY_ID")
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "USER_ID", nullable = false)
	private Users user;

	@Column(name="SEARCH_WORD")
	private String searchWord;

	@Column(name="SEARCH_DATE")
	@ColumnDefault("SYSDATE")
	@CreationTimestamp
	private LocalDateTime searchDate;

	@Column(name="IS_ACTIVE",nullable = false, columnDefinition = "NUMBER(1, 0)")
	@ColumnDefault("1")
	private Integer isActive;

	@Column(name="IS_DELETE",nullable = false, columnDefinition = "NUMBER(1, 0)")
	@ColumnDefault("0")
	private Integer isDelete;

	@Column(name="DELETE_DATE")
	@CreationTimestamp
	private LocalDateTime deleteDate;
}
