package com.ict.traveljoy.notice.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ict.traveljoy.notice.repository.ViewCount;
import com.ict.traveljoy.notice.service.ViewCountDTO;
import com.ict.traveljoy.notice.service.ViewCountService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/viewcount")
@RequiredArgsConstructor
public class ViewCountController {

	private final ViewCountService viewCountService;
	private final ObjectMapper objectMapper;
	
//	@PostMapping("/") //조회수 생성은 게시글에서 만들때 같이 만들기
	
	@GetMapping("/{notice_id}")
	public ResponseEntity getViewCount(@PathVariable String noticeId){
		try {
			long viewCount = viewCountService.findbyNoticeId(Long.parseLong(noticeId)).getCount();
			return ResponseEntity.status(200).header(HttpHeaders.CONTENT_TYPE,"application/json").body(viewCount);
		}
		catch(Exception e) {
			System.out.println("viewCount_get: ");
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PutMapping("/{notice_id}")
	public ResponseEntity<ViewCountDTO> updateViewCount(@PathVariable String noticeId){
		try {
			ViewCountDTO viewCountDTO = viewCountService.updateViewCount(Long.parseLong(noticeId));
			return ResponseEntity.status(200).header(HttpHeaders.CONTENT_TYPE,"application/json").body(viewCountDTO);
		}
		catch(Exception e) {
			System.out.println("viewCount_get: ");
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
//	@DeleteMapping //조회수 삭제는 게시글 삭제할때 
}
