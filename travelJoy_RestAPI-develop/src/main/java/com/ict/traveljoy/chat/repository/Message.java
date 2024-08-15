package com.ict.traveljoy.chat.repository;

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
@Table
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Message {

	@Id
	@SequenceGenerator(name = "seq_message",sequenceName = "seq_message",allocationSize = 1,initialValue = 1)
	@GeneratedValue(generator = "seq_message",strategy = GenerationType.SEQUENCE)
	@Column(name = "message_id")
	private Long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chat_room_id", nullable = false)
	private ChatRoom chatRoom;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
	private Users user;
	
	@Column(length=2000)
	private String messageContent;
	
	
	@ColumnDefault("SYSDATE")
	@CreationTimestamp
	private LocalDateTime messageSendDate;
	
	

	@ColumnDefault("1")
	@Column(columnDefinition = "NUMBER(1, 0)")
	private Integer isActive;
	
	/*
	//보낸시간이랑 받은시간 같지 않은지?
	
	@ColumnDefault("SYSDATE")
	@CreationTimestamp
	private LocalDateTime messageReceiveDate;
	
	@ColumnDefault("'F'")
	private boolean isDelete;
	
	//메세지 삭제 기능 넣을것인지?

	@CreationTimestamp
	private LocalDateTime deleteDate;
	*/
}
