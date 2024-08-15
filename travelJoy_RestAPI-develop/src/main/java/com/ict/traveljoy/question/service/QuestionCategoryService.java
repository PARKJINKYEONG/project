package com.ict.traveljoy.question.service;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ict.traveljoy.question.repository.QuestionCategoryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class QuestionCategoryService {

	private final QuestionCategoryRepository questionCategoryRepository;
	private final ObjectMapper objectMapper;
}
