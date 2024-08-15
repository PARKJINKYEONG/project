package com.ict.traveljoy.chat.service;

import com.ict.traveljoy.chat.repository.MessageRepository;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MessageService {

	private final MessageRepository messageRepository;
	private final ObjectMapper objectMapper;
}
