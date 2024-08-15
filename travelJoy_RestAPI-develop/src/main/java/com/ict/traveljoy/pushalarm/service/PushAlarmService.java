package com.ict.traveljoy.pushalarm.service;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ict.traveljoy.pushalarm.repository.PushAlarmRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PushAlarmService {

	private final PushAlarmRepository pushAlarmRepository;
	private final ObjectMapper objectMapper;
	
}
