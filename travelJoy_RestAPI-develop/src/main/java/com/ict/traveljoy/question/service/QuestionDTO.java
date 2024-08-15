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
	private String questionContent;
	private Boolean isHasAnswer;

	public Question toEntity() {
//		Users user = new Users();
//		QuestionCategory questionCategory = new QuestionCategory();
//
//		user.setId(userId);
//		questionCategory.setId(questionCategory);

		return Question.builder()
				.id(id)
				.user(user)
				.questionCategory(questionCategory)
				.questionDate(questionDate)
				.questionContent(questionContent)
				.isHasAnswer(isHasAnswer== true ? 1 : 0)
				.build();
	}

	public static QuestionDTO toDTO(Question question) {
		return QuestionDTO.builder()
				.id(question.getId())
//				.userId(question.getUser()!=null ? question.getUser().getId():null)
//				.questionCategoryId(question.getQuestionCategory()!=null ? question.getQuestionCategory().getId():null)
				.user(question.getUser())
				.questionCategory(question.getQuestionCategory())
				.questionDate(question.getQuestionDate())
				.questionContent(question.getQuestionContent())
				.isHasAnswer(question.getIsHasAnswer() == 1 ? true : false)
				.build();
	}
}
