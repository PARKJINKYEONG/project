package com.ict.traveljoy.controller.plan;

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


import com.ict.traveljoy.plan.details.service.PlanHandicapDto;
import com.ict.traveljoy.plan.details.service.PlanHandicapService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@Tag(name = "PlanHandicap", description = "핸디캡")
@RestController
@RequestMapping("/plan")
@CrossOrigin
@RequiredArgsConstructor
public class PlanHandicapController {
	
	@Autowired
	private final PlanHandicapService planHandicapService;
	

	@PostMapping("/handicap")
	@Operation(summary = "핸디캡 저장", description = "핸디캡 저장 컨트롤러")
	public ResponseEntity<PlanHandicapDto> savePlanHandicap(@RequestBody PlanHandicapDto planHandicapDto){
		
		try {
		PlanHandicapDto savePlanHandicap = planHandicapService.savePlanHandicap(planHandicapDto);
		if(savePlanHandicap == null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(savePlanHandicap,HttpStatus.CREATED);
		
		} catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
			
		}
	}

	@PutMapping("/handicap")
	@Operation(summary = "핸디캡 수정", description = "핸디캡 수정 컨트롤러")
	public ResponseEntity<PlanHandicapDto> updatePlanHandicap(@RequestBody PlanHandicapDto planHandicapDto){
		
		try {
		PlanHandicapDto updatePlanHandicap = planHandicapService.updatePlanHandicap(planHandicapDto);
		if(updatePlanHandicap == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(updatePlanHandicap,HttpStatus.OK);
		
		} catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
			
		}
	}
	
	@DeleteMapping("/handicap/{id}")
	@Operation(summary = "핸디캡 삭제", description = "핸디캡 삭제 컨트롤러")
	public ResponseEntity<Void> deletePlanHandicap(@PathVariable Long id){
		
		try {
		planHandicapService.deletePlanHandicap(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		
		} catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
			
		}
	}

	@GetMapping("/handicap/{id}")
	@Operation(summary = "핸디캡 조회(id)", description = "id로 핸디캡 조회 컨트롤러")
	public ResponseEntity<PlanHandicapDto> getPlanHandicapById(@PathVariable Long id){
		
		try {
		PlanHandicapDto planHandicapById = planHandicapService.getPlanHandicapById(id);
		if(planHandicapById == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(planHandicapById,HttpStatus.OK);
		
		} catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			
		}
	}

	@GetMapping("/handicap/{handicapId}")
	@Operation(summary = "핸디캡 조회(hadicapId)", description = "HandicapId로 핸디캡 조회 컨트롤러")
	public ResponseEntity<PlanHandicapDto> getPlanHandicapsByHandicapId(@PathVariable Long handicapId){
		
		try {
		PlanHandicapDto planHandicapByHandicapId = (PlanHandicapDto) planHandicapService.getPlanHandicapsByHandicapId(handicapId);
		if(planHandicapByHandicapId == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND); 	
		}
		return new ResponseEntity<>(planHandicapByHandicapId,HttpStatus.OK);
		
		} catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			
		}
	}

	@GetMapping("/handicap/{planId}")
	@Operation(summary = "핸디캡 조회(planId)", description = "Planid로 핸디캡 조회 컨트롤러")
	public ResponseEntity<PlanHandicapDto> getPlanHandicapsByplanId(@PathVariable Long planId){
		
		try {
		PlanHandicapDto planHandicapByPlanId = (PlanHandicapDto) planHandicapService.getPlanHandicapsByPlanId(planId);
		if(planHandicapByPlanId == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(planHandicapByPlanId,HttpStatus.OK);
		
		} catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			
		}
	}
	
	
	
}
