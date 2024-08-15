package com.ict.traveljoy.chat.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {
	
	List<Message> findByUserId(Long userId);
	
	List<Message> findByChatRoomId(Long chatRoomId);
	
	
}
