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

import com.ict.traveljoy.plan.details.service.PlanRegionDto;
import com.ict.traveljoy.plan.details.service.PlanRegionService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@Tag(name = "PlanRegion", description = "관심지역")
@RestController
@RequestMapping("/plan")
@CrossOrigin
@RequiredArgsConstructor
public class PlanRegionController {
	
	@Autowired
	private final PlanRegionService planRegionService;
	
	@PostMapping("/region")
	@Operation(summary = "관심지역 저장", description = "관심지역 저장 컨트롤러")
	public ResponseEntity<PlanRegionDto> savePlanRegion(@RequestBody PlanRegionDto planRegionDto){
		
		try {
		PlanRegionDto savePlanRegion = planRegionService.savePlanRegion(planRegionDto);
		if(savePlanRegion ==  null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			
		}
		return new ResponseEntity<>(savePlanRegion,HttpStatus.CREATED);
		}catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
		
	@PutMapping("/region")
	@Operation(summary = "관심지역 수정", description = "관심지역 수정 컨트롤러")
	public ResponseEntity<PlanRegionDto> updatePlanRegion(@RequestBody PlanRegionDto planRegionDto){
		
		try {
		PlanRegionDto updatePlanRegion = planRegionService.updatePlanRegion(planRegionDto);
        
		if (updatePlanRegion == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
		return new ResponseEntity<>(updatePlanRegion,HttpStatus.OK);
		}catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	

	@DeleteMapping("/region/{planId}")
	@Operation(summary = "관심지역 삭제(planId)", description = "planId로 관심지역 삭제 컨트롤러")
	public ResponseEntity<Void> deletePlanRegionByPlanId(@PathVariable Long planId){
		
		try {
		planRegionService.deletePlanRegionByPlanId(planId);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@DeleteMapping("/region/{regionId}")
	@Operation(summary = "관심지역 삭제(regionId)", description = "regionId로 관심지역 삭제 컨트롤러")
	public ResponseEntity<Void> deletePlanRegionByRegionId(@PathVariable Long regionId){
		
		try {
		planRegionService.deletePlanRegionByRegionId(regionId);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/region/{planId}")
	@Operation(summary = "관심지역 조회(planId)", description = "planId로 관심지역 조회 컨트롤러")
	public ResponseEntity<List<PlanRegionDto>> getPlanRegionsByPlanId(@PathVariable Long planId){
		
		try {
	 	List<PlanRegionDto> planRegionByPlanId = planRegionService.getPlanRegionsByPlanId(planId);
		
        if (planRegionByPlanId.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
	 	return new ResponseEntity<>(planRegionByPlanId,HttpStatus.OK);
		}catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/region/{regionId}")
	@Operation(summary = "관심지역 조회(regionId)", description = "regionId로 관심지역 조회 컨트롤러")
	public ResponseEntity<List<PlanRegionDto>> getPlanRegionsByRegionId(@PathVariable Long regionId){
		
		try {
	 	List<PlanRegionDto> planRegionByRegionId = planRegionService.getPlanRegionsByRegionId(regionId);
        if (planRegionByRegionId.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
	 	
	 	return new ResponseEntity<>(planRegionByRegionId,HttpStatus.OK);
		}catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/region/{planId}/{regionId}")
	@Operation(summary = "관심지역 조회(planId,regionId)", description = "planId,regionId로 관심지역 조회 컨트롤러")
	public ResponseEntity<PlanRegionDto> getPlanRegionByPlanIdAndRegionId(@PathVariable Long planId ,@PathVariable Long regionId){
		
		try {
			PlanRegionDto planRegion = planRegionService.getPlanRegionByPlanIdAndRegionId(planId,regionId);
	        if (planRegion == null) {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
			return new ResponseEntity<>(planRegion,HttpStatus.OK);
		}catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	
}
