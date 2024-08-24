package com.ict.traveljoy.question.controller;

import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ict.traveljoy.question.service.AnswerDTO;
import com.ict.traveljoy.question.service.AnswerService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/answer")
@RequiredArgsConstructor
public class AnswerController {

	private final AnswerService answerService;
	private final ObjectMapper objectMapper;
	
	@PostMapping
	public ResponseEntity<AnswerDTO> createAnswer(@RequestBody AnswerDTO answerDTO){
		try {
			AnswerDTO createdAnswer = answerService.createAnswer(answerDTO);
			if(createdAnswer == null) {
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			}
			 return new ResponseEntity<>(createdAnswer, HttpStatus.CREATED);
		}
		catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/{question_id}")
	public ResponseEntity<AnswerDTO> getAnswerByQuestionId(@PathVariable String question_id){
		try {
			AnswerDTO answer = answerService.findByQuestionId(Long.parseLong(question_id));
			return ResponseEntity.status(200).header(HttpHeaders.CONTENT_TYPE,"application/json").body(answer);
		}
		catch(Exception e) {
			System.out.print("answer_get: ");
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PutMapping("/{answer_id}")
	public ResponseEntity<AnswerDTO> updateAnswer(@PathVariable String answer_id,@RequestBody AnswerDTO answerDTO){
		try {
			AnswerDTO updatedAnswerDTO = answerService.updateById(Long.parseLong(answer_id),answerDTO);
			return ResponseEntity.status(200).header(HttpHeaders.CONTENT_TYPE,"application/json").body(answerDTO);
		}
		catch(Exception e) {
			System.out.print("answer_update: ");
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	} 
	
	@DeleteMapping("/{answer_id}")
	public ResponseEntity<AnswerDTO> deleteAnswer(@PathVariable String answer_id){
		try {
			AnswerDTO answerDTO = answerService.deleteById(Long.parseLong(answer_id));
			return ResponseEntity.status(200).header(HttpHeaders.CONTENT_TYPE,"application/json").body(answerDTO);
		}
		catch(Exception e) {
			System.out.print("answer_delete: ");
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
}
