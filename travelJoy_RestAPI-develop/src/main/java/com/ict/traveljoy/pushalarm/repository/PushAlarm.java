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
	@Column(name = "push_alarm_id")
	private Long id;
	
	@Column(length=50,name="TITLE")
	private String title;
	
	@Column(length=2000,name="PUSH_ALARM_CONTENT")
	private String pushAlarmContent;
	
	@Column(nullable = false,columnDefinition = "NUMBER(1, 0)",name="IS_ACTIVE")
    @ColumnDefault("1")
    private Integer isActive;
	
	@Column(nullable = false,columnDefinition = "NUMBER(1, 0)",name="IS_DELETE")
    @ColumnDefault("0")
    private Integer isDelete;
	
	@Column(name="DELETE_DATE")
	@ColumnDefault("SYSDATE")
	@CreationTimestamp
	private LocalDateTime deleteDate;
	
	
}
