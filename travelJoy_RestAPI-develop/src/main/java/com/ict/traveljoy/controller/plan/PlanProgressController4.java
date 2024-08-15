package com.ict.traveljoy.controller.plan;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ict.traveljoy.plan.progress.service.PlanProgress3Dto;
import com.ict.traveljoy.plan.progress.service.PlanProgress3Service;
import com.ict.traveljoy.plan.progress.service.PlanProgress4Dto;
import com.ict.traveljoy.plan.progress.service.PlanProgress4Service;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@Tag(name = "PlanProgress4", description = "4단계")
@RestController
@RequestMapping("/plan")
@CrossOrigin
@RequiredArgsConstructor
public class PlanProgressController4 {
	
	@Autowired
	public final PlanProgress4Service planProgress4Service;
	
	@PostMapping("/progress4")
	@Operation(summary = "4단계 저장", description = "4단계 저장 컨트롤러")
	public ResponseEntity<PlanProgress4Dto> savePlanProgress4(@RequestBody PlanProgress4Dto planProgress4Dto){
		
		try {
		PlanProgress4Dto savePlanProgress4 = planProgress4Service.savePlanProgress4(planProgress4Dto);
		if(savePlanProgress4 == null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(savePlanProgress4,HttpStatus.CREATED);
		}catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PutMapping("/progress4")
	@Operation(summary = "4단계 수정", description = "4단계 수정 컨트롤러")
	public ResponseEntity<PlanProgress4Dto> updatePlanProgress4(@RequestBody PlanProgress4Dto planProgress4Dto){
		
		try {
		PlanProgress4Dto updatePlanProgress4 = planProgress4Service.updatePlanProgress4(planProgress4Dto);
		if(updatePlanProgress4 == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(updatePlanProgress4,HttpStatus.OK);
		}catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@DeleteMapping("/progress4/{planProgress4Id}")
	@Operation(summary = "4단계 삭제", description = "4단계 삭제 컨트롤러")
	public ResponseEntity<Void> deletePlanProgress4(@PathVariable Long planProgress4Id){
		
		try {
		planProgress4Service.deletePlanProgress4(planProgress4Id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		
		}catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		
	}
	
	@GetMapping("/progress4/{planProgressByPlanId}")
	@Operation(summary = "4단계 조회(계획ID)", description = "특정 계획ID로 조회")
	public ResponseEntity<PlanProgress4Dto> getPlanProgressesByPlanId(Long planId){
		
		try {
		List<PlanProgress4Dto> planProgressByPlanId = planProgress4Service.getPlanProgressesByPlanId(planId);
		if(planProgressByPlanId.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(HttpStatus.OK);
		
		}catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/progress4/{planProgressByAiMade}")
	@Operation(summary = "4단계 조회(AI계획)", description = "AI 생성계획ID로 조회")
	public ResponseEntity<PlanProgress4Dto> getPlanProgressesByAiMadePlanId(Long aiMadePlanId){
		
		try {
		List<PlanProgress4Dto> getPlanProgressesByAiMadePlanId = planProgress4Service.getPlanProgressesByAiMadePlanId(aiMadePlanId);
		if(getPlanProgressesByAiMadePlanId.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(HttpStatus.OK);
		
		}catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/progress4/{planProgressByPlanIdAiMade}")
	@Operation(summary = "4단계 조회(PlanId, AI계획)", description = "PlanId와 AI 생성계획ID로 조회")
	public ResponseEntity<PlanProgress4Dto> getPlanProgressesByPlanIdAndAiMadePlanId(Long planId, Long aiMadePlanId){
		
		try {
		List<PlanProgress4Dto> getPlanProgressesByPlanIdAndAiMadePlanId = planProgress4Service.getPlanProgressesByPlanIdAndAiMadePlanId(planId,aiMadePlanId);
		if(getPlanProgressesByPlanIdAndAiMadePlanId.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(HttpStatus.OK);
		
		}catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
