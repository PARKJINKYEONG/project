package com.ict.traveljoy.chat.service;

import com.ict.traveljoy.chat.repository.ChatRoomRepository;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatRoomService {
	
	private final ChatRoomRepository chatRoomRepository;
	private final ObjectMapper objectMapper;

}
