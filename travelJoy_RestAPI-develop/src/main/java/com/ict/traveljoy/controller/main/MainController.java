package com.ict.traveljoy.controller.main;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/main")
public class MainController {

	@GetMapping("/alarm")
	public String alarm() {
		
		return "알람창";
	}
	
	@GetMapping("/alarm/new")
	public String newCount() {
		
		return "새로운 메시지 수";
	}
	
	@GetMapping("/alarm/return")
	public String alarmView() {
		
		return "기존 알람 보기";
	}
	
	@GetMapping("/alarm/delete")
	public String alarmDelete() {
		
		return "알람 삭제";
	}
	
	@GetMapping("/report")
	public String reportnew() {
		
		return "신고하기";
	}
	
	@GetMapping("/report/reportalarm")
	public String ralarm() {
		
		return "신고알림";
	}
	
	@GetMapping("/report/process")
	public String reportProcessing() {
		
		return "신고처리";
	}
	
	@GetMapping("/report/detail")
	public String viewContent() {
		
		return "신고 내용 보기";
	}
	
	@GetMapping("/report/cancle")
	public String cancle() {
		
		return "신고취소";
	}
	
	
	
}
