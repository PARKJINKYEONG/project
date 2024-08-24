package com.ict.traveljoy.question.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ict.traveljoy.question.repository.QuestionCategory;
import com.ict.traveljoy.question.repository.QuestionCategoryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class QuestionCategoryService {

	private final QuestionCategoryRepository questionCategoryRepository;
	private final ObjectMapper objectMapper;
	
	public List<QuestionCategoryDTO> getAllCategory() {
		List<QuestionCategory> questionCategories = questionCategoryRepository.findAll();
		return questionCategories.stream().map(qcategory->QuestionCategoryDTO.toDTO(qcategory)).collect(Collectors.toList());
	}

	public QuestionCategory findCategoryByCategoryName(String category) {
		List<QuestionCategory> questionCategories = questionCategoryRepository.findAll();
		for(QuestionCategory qcategory: questionCategories) {
			if(qcategory.getQuestionCategoryName().equals(category)) {
				return qcategory;
			}
		}
		return null;
		
	}
}
