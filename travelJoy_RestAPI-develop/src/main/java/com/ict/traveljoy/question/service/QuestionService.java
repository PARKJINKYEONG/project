package com.ict.traveljoy.question.service;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ict.traveljoy.question.repository.QuestionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class QuestionService {

	private final QuestionRepository questionRepostiory;
	private final ObjectMapper objectMapper;
	
	
	public QuestionDTO createQuestion(QuestionDTO questionDTO) {
		return questionDTO;
		// TODO Auto-generated method stub
		
	}
}
