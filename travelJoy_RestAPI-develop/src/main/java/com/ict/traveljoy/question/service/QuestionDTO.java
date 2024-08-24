package com.ict.traveljoy.question.service;

import java.time.LocalDateTime;

import com.ict.traveljoy.question.repository.Question;
import com.ict.traveljoy.question.repository.QuestionCategory;
import com.ict.traveljoy.users.repository.Users;

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
public class QuestionDTO {

	private Long id;
	private Users user;
	private QuestionCategory questionCategory;
	private LocalDateTime questionDate;
	private String questionTitle;
	private String questionContent;
	private Boolean isHasAnswer;

	public Question toEntity() {

		return Question.builder()
				.id(id)
				.user(user)
				.questionCategory(questionCategory)
				.questionDate(questionDate)
				.questionTitle(questionTitle)
				.questionContent(questionContent)
				.isHasAnswer(isHasAnswer!=null && isHasAnswer? 1:0)
				.build();
	}

	public static QuestionDTO toDTO(Question question) {
		return QuestionDTO.builder()
				.id(question.getId())
				.user(question.getUser())
				.questionCategory(question.getQuestionCategory())
				.questionDate(question.getQuestionDate())
				.questionTitle(question.getQuestionTitle())
				.questionContent(question.getQuestionContent())
				.isHasAnswer(question.getIsHasAnswer() == 1 ? true : false)
				.build();
	}
}
