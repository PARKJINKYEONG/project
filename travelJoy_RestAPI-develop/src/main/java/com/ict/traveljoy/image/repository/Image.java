package com.ict.traveljoy.image.repository;

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
@Table(name = "image")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Image {

	@Id
	@SequenceGenerator(name = "seq_image",sequenceName = "seq_image",allocationSize = 1,initialValue = 1)
	@GeneratedValue(generator = "seq_image",strategy = GenerationType.SEQUENCE)
	@Column(name="image_id")
	private Long id;

	//@Column(length = 200,name="image_url")
	@Column(length = 200)
	private String imageUrl;
	
	@Column
	@ColumnDefault("SYSDATE")
	@CreationTimestamp
	private LocalDateTime saveDate;
	
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
