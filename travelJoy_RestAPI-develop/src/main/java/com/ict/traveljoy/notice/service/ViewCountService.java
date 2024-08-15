package com.ict.traveljoy.notice.service;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ict.traveljoy.notice.repository.ViewCountRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ViewCountService {

	private final ViewCountRepository viewCountRepository;
	private final ObjectMapper objectMapper;
	
}
