package com.ict.traveljoy.controller.plan;

import java.math.BigDecimal;
import java.sql.Date;
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

import com.ict.traveljoy.plan.progress.service.PlanProgress1Dto;
import com.ict.traveljoy.plan.progress.service.PlanProgress1Service;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@Tag(name = "PlanProgress1", description = "1단계")
@RestController
@RequestMapping("/plan")
@CrossOrigin
@RequiredArgsConstructor
public class PlanProgressController1 {
	
	@Autowired
	private final PlanProgress1Service planProgress1Service; 

	@PostMapping("/progress1")
	@Operation(summary = "1단계 저장", description = "1단계 저장 컨트롤러")
	public ResponseEntity<PlanProgress1Dto> savePlanProgress1(@RequestBody PlanProgress1Dto planProgress1Dto){
		
		try {
		PlanProgress1Dto savePlanProgress1 = planProgress1Service.savePlanProgress1(planProgress1Dto);
		if(savePlanProgress1 == null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(savePlanProgress1,HttpStatus.CREATED);
		}catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/progress1")
	@Operation(summary = "1단계 수정", description = "1단계 수정 컨트롤러")
	public ResponseEntity<PlanProgress1Dto> updatePlanProgress1(@RequestBody PlanProgress1Dto planProgress1Dto){
		
		try {
		PlanProgress1Dto updatePlanProgress1 = planProgress1Service.updatePlanProgress1(planProgress1Dto);
		if(updatePlanProgress1 == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(updatePlanProgress1,HttpStatus.OK);
		}catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/progress1/{planProgress1Id}")
	@Operation(summary = "1단계 삭제", description = "1단계 삭제 컨트롤러")
	public ResponseEntity<Void> deletePlanProgress1(@PathVariable Long planProgress1Id){
		
		try {
		planProgress1Service.deletePlanProgress1(planProgress1Id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		
		}catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/progress1/{planProgressByDate}")
	@Operation(summary = "1단계 조회(기간)", description = "특정 기간으로 조회")
	public ResponseEntity<PlanProgress1Dto> getPlanProgressesByPlanStartDateBetween(Date startDate, Date endDate){
		
		try {
		List<PlanProgress1Dto> planProgressByDate = planProgress1Service.getPlanProgressesByPlanStartDateBetween(startDate,endDate);
		if(planProgressByDate.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(HttpStatus.OK);
		
		}catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/progress1/{planProgressByGreater}")
	@Operation(summary = "1단계 조회(여행자순)", description = "특정 여행자 수 이상으로 조회")
	public ResponseEntity<PlanProgress1Dto> getPlanProgressesByTravelersGreaterThanEqual(Integer minTravelers){
		
		try {
		List<PlanProgress1Dto> planProgressByGreater = planProgress1Service.getPlanProgressesByTravelersGreaterThanEqual(minTravelers);
		if(planProgressByGreater.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(HttpStatus.OK);
		
		}catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/progress1/{planProgressByCostLess}")
	@Operation(summary = "1단계 조회(비용)", description = "특정 비용 이하로 조회")
	public ResponseEntity<PlanProgress1Dto> getPlanProgressesByTravelCostLessThanEqual(BigDecimal maxTravelCost){
		
		try {
		List<PlanProgress1Dto> planProgressByCostLess = planProgress1Service.getPlanProgressesByTravelCostLessThanEqual(maxTravelCost);
		if(planProgressByCostLess.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(HttpStatus.OK);
		
		}catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/progress1/{planProgressByPlanId}")
	@Operation(summary = "1단계 조회(계획ID)", description = "특정 계획ID로 조회")
	public ResponseEntity<PlanProgress1Dto> getPlanProgressesByPlanId(Long planId){
		
		try {
		List<PlanProgress1Dto> planProgressByPlanId = planProgress1Service.getPlanProgressesByPlanId(planId);
		if(planProgressByPlanId.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(HttpStatus.OK);
		
		}catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
