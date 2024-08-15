package com.ict.traveljoy.favorite.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ict.traveljoy.favorite.service.FavoriteDTO;
import com.ict.traveljoy.favorite.service.FavoriteService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/bookmark")
@RequiredArgsConstructor
public class FavoriteController {
	
	private final FavoriteService favoriteService; //주입받음
	private final ObjectMapper objectMapper;
	
	//CRUD
	//CREATE
	@PostMapping("/{target}")
	public ResponseEntity<FavoriteDTO> addFavorite(@RequestParam Map map, @PathVariable String target){ //target,targetId받아서 저장하기
		try {
			FavoriteDTO dto = objectMapper.convertValue(map, FavoriteDTO.class);
			FavoriteDTO insertedDTO = favoriteService.addFavorite(dto,target);
			return ResponseEntity.ok(insertedDTO);
		}
		catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
	
	//READ
	//event
	@GetMapping("/event")
	public ResponseEntity<List<FavoriteDTO>> getAllFavEvents(){
		
		try {
			List<FavoriteDTO> favorietEventList = favoriteService.getFavoriteAllByTarget("event",1); //userid=1인경우
			return ResponseEntity.status(200).header(HttpHeaders.CONTENT_TYPE,"application/json").body(favorietEventList);
		}
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
		
	}
	
	@GetMapping("/event/{targetId}")
	public ResponseEntity<FavoriteDTO> getFavEvent(@PathVariable String targetId) {
		try {
			FavoriteDTO favorite = favoriteService.getFavoriteByTargetId("event",Long.parseLong(targetId));
			return ResponseEntity.status(200).header(HttpHeaders.CONTENT_TYPE,"application/json").body(favorite);
		}
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
	
	//food
	@GetMapping("/food")
	public ResponseEntity<List<FavoriteDTO>> getAllFavFoods(){
		try {
			List<FavoriteDTO> favorietEventList = favoriteService.getFavoriteAllByTarget("food",1);
			return ResponseEntity.status(200).header(HttpHeaders.CONTENT_TYPE,"application/json").body(favorietEventList);
		}
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
		
	}
	
	@GetMapping("/food/{targetId}")
	public ResponseEntity<FavoriteDTO> getFavFood(@PathVariable String targetId) {
		try {
			FavoriteDTO favorite = favoriteService.getFavoriteByTargetId("food",Long.parseLong(targetId));
			return ResponseEntity.status(200).header(HttpHeaders.CONTENT_TYPE,"application/json").body(favorite);
		}
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
	//sight
	@GetMapping("/sight")
	public ResponseEntity<List<FavoriteDTO>> getAllFavSights(){
		try {
			List<FavoriteDTO> favorietEventList = favoriteService.getFavoriteAllByTarget("sight",1);
			return ResponseEntity.status(200).header(HttpHeaders.CONTENT_TYPE,"application/json").body(favorietEventList);
		}
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
		
	}
	
	@GetMapping("/sight/{targetId}")
	public ResponseEntity<FavoriteDTO> getFavSight(@PathVariable String targetId) {
		try {
			FavoriteDTO favorite = favoriteService.getFavoriteByTargetId("sight",Long.parseLong(targetId));
			return ResponseEntity.status(200).header(HttpHeaders.CONTENT_TYPE,"application/json").body(favorite);
		}
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
	//hotel
	@GetMapping("/hotel")
	public ResponseEntity<List<FavoriteDTO>> getAllFavHotels(){
		try {
			List<FavoriteDTO> favorietEventList = favoriteService.getFavoriteAllByTarget("hotel",1);
			return ResponseEntity.status(200).header(HttpHeaders.CONTENT_TYPE,"application/json").body(favorietEventList);
		}
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
		
	}
	
	@GetMapping("/hotel/{targetId}")
	public ResponseEntity<FavoriteDTO> getFavHotel(@PathVariable String targetId) {
		try {
			FavoriteDTO favorite = favoriteService.getFavoriteByTargetId("hotel",Long.parseLong(targetId));
			return ResponseEntity.status(200).header(HttpHeaders.CONTENT_TYPE,"application/json").body(favorite);
		}
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
	
	//DELETE
	//즐겨찾기삭제 id로 
	@DeleteMapping("/{id}")
	public ResponseEntity<FavoriteDTO> removeOneById(@PathVariable String id) {
		try {
			FavoriteDTO favorite = favoriteService.removebyId(Long.parseLong(id));
			return ResponseEntity.status(200).header(HttpHeaders.CONTENT_TYPE,"application/json").body(favorite);
		}
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
	
	@DeleteMapping("/clear")
	public ResponseEntity<FavoriteDTO> removeAll() {
		try {
			FavoriteDTO favorite = favoriteService.removeAll();
			return ResponseEntity.status(200).header(HttpHeaders.CONTENT_TYPE,"application/json").body(favorite);
		}
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
}
