package com.ict.traveljoy.question.service;

import java.time.LocalDateTime;

import com.ict.traveljoy.question.repository.Answer;
import com.ict.traveljoy.question.repository.Question;
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
public class AnswerDTO {

	private Long id;
	private Question question;
	private Users user;
	//	private Long answerHandlerId;
	private String answerHandlerName;
	private LocalDateTime answerDate;
	private String answerContent;

	public Answer toEntity() {

//		Question question = new Question();
//		Users user = new Users();
//
//		question.setId(questionId);
//		user.setId(answerHandlerId);

		return Answer.builder()
				.id(id)
				.question(question)
				.user(user)
				.answerDate(answerDate)
				.answerContent(answerContent)
				.build();
	}

	public static AnswerDTO toDTO(Answer answer) {
		return AnswerDTO.builder()
				.id(answer.getId())
				.question(answer.getQuestion())
				.user(answer.getUser())
				.answerDate(answer.getAnswerDate())
				.answerContent(answer.getAnswerContent())
				.build();
	}
}
