package com.ict.traveljoy.question.service;

import com.ict.traveljoy.question.repository.QuestionCategory;

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
public class QuestionCategoryDTO {

	private Long questionCategoryId;
	private String questionCategoryName;

	public QuestionCategory toEntity() {
		return QuestionCategory.builder()
				.id(questionCategoryId)
				.questionCategoryName(questionCategoryName)
				.build();
	}
	public static QuestionCategoryDTO toDTO(QuestionCategory questionCategory) {
		return QuestionCategoryDTO.builder()
				.questionCategoryId(questionCategory.getId())
				.questionCategoryName(questionCategory.getQuestionCategoryName())
				.build();
	}
}

