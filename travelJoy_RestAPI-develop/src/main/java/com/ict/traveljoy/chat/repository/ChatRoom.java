package com.ict.traveljoy.chat.repository;

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
public class ChatRoom {
	
	@Id
	@SequenceGenerator(name = "seq_chatroom",sequenceName = "seq_chatroom",allocationSize = 1,initialValue = 1)
	@GeneratedValue(generator = "seq_chatroom",strategy = GenerationType.SEQUENCE)
	@Column(name = "chat_room_id")
	private Long id;
	
	@ColumnDefault("SYSDATE")
	@CreationTimestamp
    private LocalDateTime createDate;

	@ColumnDefault("SYSDATE")
	@CreationTimestamp
    private LocalDateTime deleteDate;

	@ColumnDefault("1")
	@Column(columnDefinition = "NUMBER(1, 0)")
	private Integer isActive;
	
	@ColumnDefault("0")
	@Column(columnDefinition = "NUMBER(1, 0)")
	private Integer isDelete;
	
}
