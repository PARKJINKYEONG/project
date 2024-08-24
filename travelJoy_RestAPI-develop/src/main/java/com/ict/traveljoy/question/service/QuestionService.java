package com.ict.traveljoy.question.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ict.traveljoy.question.repository.Question;
import com.ict.traveljoy.question.repository.QuestionCategory;
import com.ict.traveljoy.question.repository.QuestionRepository;
import com.ict.traveljoy.users.repository.UserRepository;
import com.ict.traveljoy.users.repository.Users;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class QuestionService {

	private final QuestionRepository questionRepostiory;
	private final QuestionCategoryService questionCategoryService;
	private final AnswerService answerService;
	private final UserRepository userRepository;
	private final ObjectMapper objectMapper;
	
	
	public QuestionDTO createQuestion(String useremail,String category, QuestionDTO questionDTO) {
		
		Question question = questionDTO.toEntity();
		
		Users user = userRepository.findByEmail(useremail).get();
		question.setUser(user);
		QuestionCategory questionCategory = questionCategoryService.findCategoryByCategoryName(category);
		if(questionCategory!=null) {
			question.setQuestionCategory(questionCategory);
			Question afterSave = questionRepostiory.save(question);
			return QuestionDTO.toDTO(afterSave);
		}
		else return null;
		
	}


	public List<QuestionDTO> findAll() {
		List<Question> questionList = questionRepostiory.findAll();
		for(Question question:questionList) {
//			question.setQuestionCategory(null);
			System.out.println(question);
		}
		
		return questionList.stream().map(question->QuestionDTO.toDTO(question)).collect(Collectors.toList());
	}

	public List<QuestionDTO> findAllByCategory(String category) {
		// category name으로 해당 category question 다 받아오기
		// category 객체 받아와서 그걸로 찾기
		QuestionCategory questionCategory = questionCategoryService.findCategoryByCategoryName(category);
		if(questionCategory!=null) {
			List<Question> questionList = questionRepostiory.findAllByQuestionCategory_Id(questionCategory.getId());
			return questionList.stream().map(question->QuestionDTO.toDTO(question)).collect(Collectors.toList());
		}
		else throw new IllegalArgumentException("오류");
		
		
//		QuestionCategory category = questionRepostiory.findByQuestionCategoryName(questionCategory);
//		List<Question> questionListByCategory = questionRepostiory.findAllByQuestionCategory_Id(category.getId());
//		return questionListByCategory.stream().map(QuestionDTO::toDTO).collect(Collectors.toList());
	}
	
	
	
	//본인꺼외에는 안보이게 할지 말지
	public QuestionDTO findById(long questionId) {
		if(questionRepostiory.existsById(questionId)) {
			Question question = questionRepostiory.findById(questionId).get();
			return QuestionDTO.toDTO(question);
		}
		return null;
	}


	public QuestionDTO updateById(long questionId,QuestionDTO questionDTO) {
		if(questionRepostiory.existsById(questionId)) {
			Question beforeQuestion = questionRepostiory.findById(questionId).get();
			beforeQuestion.setQuestionCategory(questionDTO.getQuestionCategory());
			beforeQuestion.setQuestionContent(questionDTO.getQuestionContent());
			Question updatedQuestion = questionRepostiory.save(beforeQuestion);
			return QuestionDTO.toDTO(updatedQuestion);
		}
		else throw new IllegalArgumentException("해당 id와 일치하는 question 없음");
	}
	
	public int answerCompleted(long questionId) {
		if(questionRepostiory.existsById(questionId)) {
			Question answeredQuestion = questionRepostiory.findById(questionId).orElseThrow(() -> new RuntimeException("Question not found"));
			answeredQuestion.setIsHasAnswer(1);
			questionRepostiory.save(answeredQuestion);
			return 1;
		}
		else return 0;
	}

	public QuestionDTO deleteById(long questionId) {
		if(questionRepostiory.existsById(questionId)) {
			Question question = questionRepostiory.findById(questionId).orElseThrow(() -> new RuntimeException("Question not found"));
			boolean answerDeleted = false;
			if(question.getIsHasAnswer()==1) {
				answerDeleted = answerService.deleteByQuestionId(questionId);
				if(answerDeleted) {
					questionRepostiory.delete(question);
					return QuestionDTO.toDTO(question);
				}
			}
		}
		else throw new IllegalArgumentException("삭제 실패");
		return null;
	}

	





}
