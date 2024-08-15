package com.ict.traveljoy.chat.service;

import java.time.LocalDateTime;

import com.ict.traveljoy.chat.repository.ChatRoom;
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
public class ChatRoomDTO {

	private Long id;
	private LocalDateTime createDate;
	private LocalDateTime deleteDate;
	private Boolean isActive;
	private Boolean isDelete;
	
	public ChatRoom toEntity() {
		return ChatRoom.builder()
				.id(id)
				.createDate(createDate)
				.deleteDate(deleteDate)
				.isActive(isActive == true ? 1 : 0)
				.isDelete(isDelete == true ? 1 : 0)
				.build();
	}
	
	public static ChatRoomDTO toDTO(ChatRoom chatRoom) {
		return ChatRoomDTO.builder()
				.id(chatRoom.getId())
				.createDate(chatRoom.getCreateDate())
				.deleteDate(chatRoom.getDeleteDate())
				.isActive(chatRoom.getIsActive() == 1 ? true : false)
				.isDelete(chatRoom.getIsDelete() == 1 ? true : false)
				.build();
	}
	
	
}
