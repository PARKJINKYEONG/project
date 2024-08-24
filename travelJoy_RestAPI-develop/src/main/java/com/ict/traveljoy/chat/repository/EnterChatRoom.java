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
@Table(name="ENTER_CHATROOM")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EnterChatRoom {
	
	@Id
	@SequenceGenerator(name = "seq_enter_chatroom",sequenceName = "seq_enter_chatroom",allocationSize = 1,initialValue = 1)
	@GeneratedValue(generator = "seq_enter_chatroom",strategy = GenerationType.SEQUENCE)
	@Column(name = "ENTER_CHATROOM_ID")
	private Long id;
	
	
	@ManyToOne(optional=false,fetch = FetchType.LAZY)
	@JoinColumn(name="CHATROOM_ID", nullable = false)
	private ChatRoom chatRoom;

	@ManyToOne(optional=false,fetch = FetchType.LAZY)
	@JoinColumn(name="USER_ID", nullable = false)
	private Users user;

}
