package com.ict.traveljoy.image.repository;

import java.time.LocalDateTime;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import com.ict.traveljoy.users.repository.Users;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="IMAGE")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Image {

	@Id
	@SequenceGenerator(name = "seq_image",sequenceName = "seq_image",allocationSize = 1,initialValue = 1)
	@GeneratedValue(generator = "seq_image",strategy = GenerationType.SEQUENCE)
	@Column(name="IMAGE_ID")
	private Long id;

	//@Column(length = 200,name="image_url")
	@Column(name="IMAGE_URL",length = 200)
	private String imageUrl;
	
	@Column(name="SAVE_DATE")
	@ColumnDefault("SYSDATE")
	@CreationTimestamp
	private LocalDateTime saveDate;
	
	@Column(name="IS_ACTIVE",nullable = false, columnDefinition = "NUMBER(1, 0)")
	@ColumnDefault("1")
	private Integer isActive;
	
	@Column(name="IS_DELETE",nullable = false, columnDefinition = "NUMBER(1, 0)")
	@ColumnDefault("0")
	private Integer isDelete;
	
	@Column(name="DELETE_DATE")
	@CreationTimestamp
    private LocalDateTime deleteDate;
	
	@OneToOne(mappedBy = "profileImage")
	private Users user;
}
