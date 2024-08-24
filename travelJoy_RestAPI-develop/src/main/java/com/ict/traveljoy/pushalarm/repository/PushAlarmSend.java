package com.ict.traveljoy.pushalarm.repository;

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
	
	@ManyToOne
    @JoinColumn(name = "push_alarm_id", nullable = false)
	private PushAlarm pushAlarm;
	
	@ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
	private Users user;
	
	@Column(nullable = false,name="PUSH_ALARM_SEND_DATE")
	@ColumnDefault("SYSDATE")
	@CreationTimestamp
	private LocalDateTime pushAlarmSendDate;
	
}
