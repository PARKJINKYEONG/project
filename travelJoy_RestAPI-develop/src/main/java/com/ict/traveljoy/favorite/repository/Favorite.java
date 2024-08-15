package com.ict.traveljoy.favorite.repository;

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
@Table(name="favorite")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Favorite {

	@Id
	@SequenceGenerator(name = "seq_favorite",sequenceName = "seq_favorite",allocationSize = 1,initialValue = 1)
	@GeneratedValue(generator = "seq_favorite",strategy = GenerationType.SEQUENCE)
	@Column(name="favorite_id")
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private Users user;

	@Column(name="target_id")
	private Long targetId;

	@Column(name="is_event", columnDefinition = "NUMBER(1, 0)")
	@ColumnDefault("0")
	private Integer isEvent;

	@Column(name="is_food", columnDefinition = "NUMBER(1, 0)")
	@ColumnDefault("0")
	private Integer isFood;

	@Column(name="is_sight", columnDefinition = "NUMBER(1, 0)")
	@ColumnDefault("0")
	private Integer isSight;

	@Column(name="is_hotel", columnDefinition = "NUMBER(1, 0)")
	@ColumnDefault("0")
	private Integer isHotel;

	@Column(name="is_active",nullable = false, columnDefinition = "NUMBER(1, 0)")
	@ColumnDefault("1")
	private Integer isActive;

	@Column(name="is_delete",nullable = false, columnDefinition = "NUMBER(1, 0)")
	@ColumnDefault("0")
	private Integer isDelete;

	@Column(name="create_date",nullable = false)
	@ColumnDefault("SYSDATE")
	@CreationTimestamp
	private LocalDateTime createDate;

	@Column(name="delete_date")
	@ColumnDefault("SYSDATE")
	@CreationTimestamp
	private LocalDateTime deleteDate;


}
