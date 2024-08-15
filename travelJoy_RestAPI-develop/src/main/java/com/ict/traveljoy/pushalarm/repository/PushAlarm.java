package com.ict.traveljoy.pushalarm.repository;

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
@Table
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PushAlarm {

	@Id
	@SequenceGenerator(name = "seq_push_alarm",sequenceName = "seq_push_alarm",allocationSize = 1,initialValue = 1)
	@GeneratedValue(generator = "seq_push_alarm",strategy = GenerationType.SEQUENCE)
	private Long id;
	
	@Column(length=50)
	private String title;
	
	@Column(length=2000)
	private String pushAlarmContent;
	
	@Column(nullable = false,columnDefinition = "NUMBER(1, 0)")
    @ColumnDefault("1")
    private Integer isActive;
	
	@Column(nullable = false,columnDefinition = "NUMBER(1, 0)")
    @ColumnDefault("0")
    private Integer isDelete;
	
	@Column
	@ColumnDefault("SYSDATE")
	@CreationTimestamp
	private LocalDateTime deleteDate;
	
	
}
