package com.ict.traveljoy.history.controller;

import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ict.traveljoy.history.service.SearchHistoryDTO;
import com.ict.traveljoy.history.service.SearchHistoryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/history")
@RequiredArgsConstructor
public class HistoryController {

	private final SearchHistoryService searchHistoryService;
	private final ObjectMapper objectMapper;
	
	//모든 내역 보기 - 링크도 같이 보내주기
	// user받아서 넘기기기기기기기ㅣ기기
	@GetMapping
	public ResponseEntity<List<SearchHistoryDTO>> getAllHistory() {
		try {
			List<SearchHistoryDTO> historyList = searchHistoryService.getAll();
			return ResponseEntity.status(200).header(HttpHeaders.CONTENT_TYPE,"application/json").body(historyList);
		}
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
	
	//특정 내역 삭제
	@DeleteMapping("/{id}")
	public ResponseEntity<SearchHistoryDTO> removeOneById(@PathVariable String id) {
		// user별로 삭제하는걸로 로직 바꾸기
		try {
			SearchHistoryDTO searchHistory = searchHistoryService.removebyId(Long.parseLong(id));
			return ResponseEntity.status(200).header(HttpHeaders.CONTENT_TYPE,"application/json").body(searchHistory);
		}
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
	
	//모든 내역 삭제
	@DeleteMapping("/clear")
	public ResponseEntity removeAll() {
		try {
			// user별로 삭제하는걸로 로직 바꾸기
			SearchHistoryDTO searchHistory = searchHistoryService.removeAll();
			return ResponseEntity.status(200).header(HttpHeaders.CONTENT_TYPE,"application/json").body(searchHistory);
		}
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
}
