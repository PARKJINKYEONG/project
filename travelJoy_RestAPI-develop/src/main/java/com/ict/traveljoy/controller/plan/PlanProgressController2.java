package com.ict.traveljoy.controller.plan;

import java.sql.Timestamp;
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
import com.ict.traveljoy.plan.progress.service.PlanProgress2Dto;
import com.ict.traveljoy.plan.progress.service.PlanProgress2Service;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@Tag(name = "PlanProgress2", description = "2단계")
@RestController
@RequestMapping("/plan")
@CrossOrigin
@RequiredArgsConstructor
public class PlanProgressController2 {
	
	@Autowired
	private final PlanProgress2Service planProgress2Service;
	
	@PostMapping("/progress2")
	@Operation(summary = "2단계 저장", description = "2단계 저장 컨트롤러")
	public ResponseEntity<PlanProgress2Dto> savePlanProgress2(@RequestBody PlanProgress2Dto planProgress2Dto){
		
		try {
		PlanProgress2Dto savePlanProgress2 = planProgress2Service.savePlanProgress2(planProgress2Dto);
		if(savePlanProgress2 == null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(savePlanProgress2,HttpStatus.CREATED);
		}catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PutMapping("/progress2")
	@Operation(summary = "2단계 수정", description = "2단계 수정 컨트롤러")
	public ResponseEntity<PlanProgress2Dto> updatePlanProgress2(@RequestBody PlanProgress2Dto planProgress2Dto){
		
		try {
		PlanProgress2Dto updatePlanProgress2 = planProgress2Service.updatePlanProgress2(planProgress2Dto);
		if(updatePlanProgress2 == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(updatePlanProgress2,HttpStatus.OK);
		}catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@DeleteMapping("/progress2/{planProgress2Id}")
	@Operation(summary = "2단계 삭제", description = "2단계 삭제 컨트롤러")
	public ResponseEntity<Void> deletePlanProgress2(@PathVariable Long planProgress2Id){
		
		try {
		planProgress2Service.deletePlanProgress2(planProgress2Id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		
		}catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/progress2/{planProgressByPlanId}")
	@Operation(summary = "2단계 조회(계획ID)", description = "특정 계획ID로 조회")
	public ResponseEntity<PlanProgress2Dto> getPlanProgressesByPlanId(Long planId){
		
		try {
		List<PlanProgress2Dto> planProgressByPlanId = planProgress2Service.getPlanProgressesByPlanId(planId);
		if(planProgressByPlanId.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(HttpStatus.OK);
		
		}catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/progress2/{planProgressByEvent}")
	@Operation(summary = "2단계 조회(Event여부)", description = "특정 Event여부로 조회")
	public ResponseEntity<PlanProgress2Dto> getPlanProgressesByEvent(Integer isEvent){
		
		try {
		List<PlanProgress2Dto> planProgressByEvent = planProgress2Service.getPlanProgressesByIsEvent(isEvent);
		if(planProgressByEvent.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(HttpStatus.OK);
		
		}catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/progress2/{planProgressByFood}")
	@Operation(summary = "2단계 조회(Food여부)", description = "특정 식사 여부로 조회")
	public ResponseEntity<PlanProgress2Dto> getPlanProgressesByFood(Integer isFood){
		
		try {
		List<PlanProgress2Dto> planProgressByFood = planProgress2Service.getPlanProgressesByIsFood(isFood);
		if(planProgressByFood.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(HttpStatus.OK);
		
		}catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/progress2/{planProgressBySight}")
	@Operation(summary = "2단계 조회(Sight여부)", description = "특정 관광지 여부로 조회")
	public ResponseEntity<PlanProgress2Dto> getPlanProgressesBySight(Integer isSight){
		
		try {
		List<PlanProgress2Dto> planProgressBySight = planProgress2Service.getPlanProgressesByIsSight(isSight);
		if(planProgressBySight.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(HttpStatus.OK);
		
		}catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/progress2/{planProgressByHotel}")
	@Operation(summary = "2단계 조회(Hotel여부)", description = "특정 숙박 여부로 조회")
	public ResponseEntity<PlanProgress2Dto> getPlanProgressesByHotel(Integer isHotel){
		
		try {
		List<PlanProgress2Dto> planProgressByHotel = planProgress2Service.getPlanProgressesByIsHotel(isHotel);
		if(planProgressByHotel.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(HttpStatus.OK);
		
		}catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/progress2/{PlanProgressesByPlanIdAndDetailPlanStartDateBetween}")
	@Operation(summary = "2단계 조회(ID,계획시작/종료일)", description = "특정 ID,날짜로 조회")
	public ResponseEntity<PlanProgress2Dto> getPlanProgressesByPlanIdAndDetailPlanStartDateBetween(Long planId, Timestamp startDate, Timestamp endDate){
		
		try {
		List<PlanProgress2Dto> PlanProgressesByPlanIdAndDetailPlanStartDateBetween = planProgress2Service.getPlanProgressesByPlanIdAndDetailPlanStartDateBetween(planId,startDate,endDate);
		if(PlanProgressesByPlanIdAndDetailPlanStartDateBetween.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(HttpStatus.OK);
		
		}catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	

}
