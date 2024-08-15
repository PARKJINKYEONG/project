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
@Table(name="push_alarm_send")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PushAlarmSend {

	@Id
	@SequenceGenerator(name = "seq_push_alarm_send",sequenceName = "seq_push_alarm_send",allocationSize = 1,initialValue = 1)
	@GeneratedValue(generator = "seq_push_alarm_send",strategy = GenerationType.SEQUENCE)
	private Long id;
	
	private Long pushAlarmId;
	
	private Long userId;
	
	@Column(nullable = false)
	@ColumnDefault("SYSDATE")
	@CreationTimestamp
	private LocalDateTime pushAlarmSendDate;
	
}
