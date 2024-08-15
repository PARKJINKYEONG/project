package com.ict.traveljoy.chat.service;

import java.time.LocalDateTime;

import com.ict.traveljoy.chat.repository.ChatRoom;
import com.ict.traveljoy.chat.repository.Message;
import com.ict.traveljoy.users.repository.Users;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MessageDTO {

	private Long id;
	private ChatRoom chatRoom;
	private Users user;
	private String messageContent;
	private LocalDateTime messageSendDate;
	private LocalDateTime messageReceiveDate;
	private Boolean isActive;

	public Message toEnity() {
		return Message.builder()
				.id(id)
				.chatRoom(chatRoom)
				.user(user)
				.messageContent(messageContent)
				.messageSendDate(messageSendDate)
				.isActive(isActive == true ? 1 : 0)
				//.messageReceiveDate(messageReceiveDate)
				.build();
	}

	public static MessageDTO toDTO(Message message) {
		return MessageDTO.builder()
				.id(message.getId())
				.chatRoom(message.getChatRoom())
				.user(message.getUser())
				.messageContent(message.getMessageContent())
				.messageSendDate(message.getMessageSendDate())
				.messageReceiveDate(message.getMessageSendDate())
				.isActive(message.getIsActive() == 1 ? true : false)
				.build();
	}
}
