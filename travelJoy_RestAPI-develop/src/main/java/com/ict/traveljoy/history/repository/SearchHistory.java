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
@Table(name="search_history")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder



public class SearchHistory {

	@Id
	@SequenceGenerator(name = "seq_search_history",sequenceName = "seq_search_history",allocationSize = 1,initialValue = 1)
	@GeneratedValue(generator = "seq_search_history",strategy = GenerationType.SEQUENCE)
	@Column(name="search_history_id")
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private Users user;

	@Column(name="search_word")
	private String searchWord;

	@Column(name="search_date")
	@ColumnDefault("SYSDATE")
	@CreationTimestamp
	private LocalDateTime searchDate;

	@Column(name="is_active",nullable = false, columnDefinition = "NUMBER(1, 0)")
	@ColumnDefault("1")
	private Integer isActive;

	@Column(name="is_delete",nullable = false, columnDefinition = "NUMBER(1, 0)")
	@ColumnDefault("0")
	private Integer isDelete;

	@Column(name="delete_date")
	@CreationTimestamp
	private LocalDateTime deleteDate;
}
