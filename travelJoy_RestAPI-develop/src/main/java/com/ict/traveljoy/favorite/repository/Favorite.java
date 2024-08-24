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
@Table(name="FAVORITE")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Favorite {

	@Id
	@SequenceGenerator(name = "seq_favorite",sequenceName = "seq_favorite",allocationSize = 1,initialValue = 1)
	@GeneratedValue(generator = "seq_favorite",strategy = GenerationType.SEQUENCE)
	@Column(name="FAVORITE_ID")
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "USER_ID", nullable = false)
	private Users user;

	@Column(name="TARGET_ID")
	private Long targetId;

	@Column(name="IS_EVENT", columnDefinition = "NUMBER(1, 0)")
	@ColumnDefault("0")
	private Integer isEvent;

	@Column(name="IS_FOOD", columnDefinition = "NUMBER(1, 0)")
	@ColumnDefault("0")
	private Integer isFood;

	@Column(name="IS_SIGHT", columnDefinition = "NUMBER(1, 0)")
	@ColumnDefault("0")
	private Integer isSight;

	@Column(name="IS_HOTEL", columnDefinition = "NUMBER(1, 0)")
	@ColumnDefault("0")
	private Integer isHotel;

	@Column(name="IS_ACTIVE",nullable = false, columnDefinition = "NUMBER(1, 0)")
	@ColumnDefault("1")
	private Integer isActive;

	@Column(name="IS_DELETE",nullable = false, columnDefinition = "NUMBER(1, 0)")
	@ColumnDefault("0")
	private Integer isDelete;

	@Column(name="CREATE_DATE",nullable = false)
	@ColumnDefault("SYSDATE")
	@CreationTimestamp
	private LocalDateTime createDate;

	@Column(name="DELETE_DATE")
	@ColumnDefault("SYSDATE")
	@CreationTimestamp
	private LocalDateTime deleteDate;


}
