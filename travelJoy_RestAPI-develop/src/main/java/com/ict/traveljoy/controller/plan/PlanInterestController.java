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

import com.ict.traveljoy.plan.details.service.PlanInterestDto;
import com.ict.traveljoy.plan.details.service.PlanInterestService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@Tag(name = "PlanInterest", description = "관심사항")
@RestController
@RequestMapping("/plan")
@CrossOrigin
@RequiredArgsConstructor
public class PlanInterestController {

	@Autowired
	private final PlanInterestService planInterestService;
	
	@CrossOrigin
	@PostMapping("/interest")
	@Operation(summary = "관심사항 저장", description = "관심사항 저장 컨트롤러")
	public ResponseEntity<PlanInterestDto> savePlanInterest(@RequestBody PlanInterestDto planInterestDto){
		
		
		try {
		PlanInterestDto savePlanInterest = planInterestService.savePlanInterest(planInterestDto);
		if(savePlanInterest == null) {
			
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			
		}
		return new ResponseEntity<>(savePlanInterest,HttpStatus.CREATED);
		} catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	
	@CrossOrigin
	@PutMapping("/interest")
	@Operation(summary = "관심사항 수정", description = "관심사항 수정 컨트롤러")
	public ResponseEntity<PlanInterestDto> updatePlanInterest(@RequestBody PlanInterestDto planInterestDto){
		
		
		try {
		PlanInterestDto updatePlanInterest = planInterestService.updatePlanInterest(planInterestDto);
		
		if(updatePlanInterest == null) {
			
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(updatePlanInterest,HttpStatus.OK);
		} catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	
	@CrossOrigin
	@DeleteMapping("/interest/{planId}")
	@Operation(summary = "관심사항 삭제", description = "관심사항 삭제 컨트롤러")
	public ResponseEntity<Void> deletePlanInterest(@PathVariable Long planId){
		
		
		try {
		planInterestService.deletePlanInterestByPlanId(planId);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	
	
	
	@CrossOrigin
	@GetMapping("/interest/{planId}")
	@Operation(summary = "관심사항 조회", description = "planId로 관심사항 조회 컨트롤러")
	public ResponseEntity<PlanInterestDto> getPlanInterest(@PathVariable Long planId){
		
		
		try {
			PlanInterestDto planInterestByPlanId = (PlanInterestDto) planInterestService.getPlanInterestsByPlanId(planId);
			if(planInterestByPlanId == null) {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
			return new ResponseEntity<>(planInterestByPlanId,HttpStatus.OK);
		} catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
	}
	
	@CrossOrigin
	@GetMapping("/interest/{interestId}")
	@Operation(summary = "관심사항 조회", description = "interestId로 관심사항 조회 컨트롤러")
	public ResponseEntity<PlanInterestDto> getPlanInterestsByInterestId(@PathVariable Long interestId){
		
		
		try {
		PlanInterestDto planInterestByInterestId = (PlanInterestDto) planInterestService.getPlanInterestsByInterestId(interestId);
		if(planInterestByInterestId == null) {
			 return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(planInterestByInterestId,HttpStatus.OK);
		} catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
	}
	
	@CrossOrigin
	@GetMapping("/interest/{planId}/{intersetId}")
	@Operation(summary = "관심사항 조회", description = "planID,interestId로 관심사항 조회 컨트롤러")
	public ResponseEntity<PlanInterestDto> getPlanInterestByPlanIdAndInterestId(@PathVariable Long planId, @PathVariable Long interestId){
		
		
		try {
			PlanInterestDto planInterest = (PlanInterestDto)planInterestService.getPlanInterestByPlanIdAndInterestId(planId,interestId);
			if(planInterest == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
			return new ResponseEntity<>(planInterest,HttpStatus.OK);
		} catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	
	@CrossOrigin
	@GetMapping("/interest/{intersetIds}")
	@Operation(summary = "관심사항 조회", description = "특정 관심사에 해당하는 PlanInterest로 관심사항 조회 컨트롤러")
	public ResponseEntity<PlanInterestDto> getPlanInterestsByInterestIds(@PathVariable List<Long> interestIds){
		
		
		try {
			PlanInterestDto planInterest = (PlanInterestDto)planInterestService.getPlanInterestsByInterestIds(interestIds);
		return new ResponseEntity<>(planInterest,HttpStatus.OK);
		} catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
	}
	
}
