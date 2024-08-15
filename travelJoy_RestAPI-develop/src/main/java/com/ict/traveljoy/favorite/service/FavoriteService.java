package com.ict.traveljoy.favorite.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ict.traveljoy.favorite.repository.Favorite;
import com.ict.traveljoy.favorite.repository.FavoriteRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FavoriteService {

	private final FavoriteRepository favoriteRepository;
	private final ObjectMapper objectMapper;

	public FavoriteDTO addFavorite(FavoriteDTO dto,String target) {
		Favorite newFav = dto.toEntity();
		switch(target) {
			case "event":
				newFav.setIsEvent(1);
				break;
			case "food":
				newFav.setIsFood(1);
				break;
			case "sight":
				newFav.setIsSight(1);
				break;
			default:
				newFav.setIsHotel(1);
				break;
		}
		return FavoriteDTO.toDTO(favoriteRepository.save(newFav));
	}

	@Transactional(readOnly = true)
	public List<FavoriteDTO> favoriteAll() {
		List<Favorite> favoriteEntityList =  favoriteRepository.findAll();

		return objectMapper.convertValue(favoriteEntityList, objectMapper.getTypeFactory().defaultInstance().constructCollectionType(List.class,FavoriteDTO.class));
	}

	//target에 따라 favorite내용 모두 가져오기
	@Transactional(readOnly = true)
	public List<FavoriteDTO> getFavoriteAllByTarget(String target,long uid){
		// target : event / food / sight / hotel
		List<Favorite> favoriteEntityList;
		switch(target) {
			case "event":
				favoriteEntityList = favoriteRepository.findAllByUser_IdAndIsEventAndIsActive(uid,1,1);
				break;// findAllBy엔터티_필드명();
			case "food":
				favoriteEntityList = favoriteRepository.findAllByUser_IdAndIsFoodAndIsActive(uid,1,1);
				break;
			case "sight":
				favoriteEntityList = favoriteRepository.findAllByUser_IdAndIsSightAndIsActive(uid,1,1);
				break;
			default:
				favoriteEntityList = favoriteRepository.findAllByUser_IdAndIsHotelAndIsActive(uid,1,1);
				break;
		}

		List<FavoriteDTO> favoriteDtos = favoriteEntityList.stream().map(fav->FavoriteDTO.toDTO(fav)).collect(Collectors.toList());
		return favoriteDtos;
	}

	// targetId에 따라 내용 가져오기(url)
	@Transactional(readOnly = true)
	public FavoriteDTO getFavoriteByTargetId(String target,long targetId) {
		Favorite favorite;
		switch(target) {
			case "event":
//			favorite = favoriteRepository.findByEventId(targetId);
				break;// findAllBy엔터티_필드명();
			case "food":
//			favorite = favoriteRepository.findByFoodId(targetId);
				break;
			case "sight":
//			favorite = favoriteRepository.findBySightId(targetId);
				break;
			default:
				//favorite = favoriteRepository.findByHotelId(targetId);
				break;
		}

		return null;
	}



	//즐겨찾기 삭제
	public FavoriteDTO removebyId(long id) {
		if(favoriteRepository.existsById(id)) {
			Favorite favorite = favoriteRepository.findById(id).get();
//			favoriteRepository.deleteById(id);
			favorite.setIsActive(0);
			favorite.setIsDelete(1);
			favoriteRepository.save(favorite);
			return FavoriteDTO.toDTO(favorite);
		}
		else throw new IllegalArgumentException("오류");
	}

	public FavoriteDTO removeAll() {
//		favoriteRepository.deleteAll();
		List<Favorite> favoriteEntityList =  favoriteRepository.findAll();
		for(Favorite fav:favoriteEntityList) {
			fav.setIsActive(0);
			fav.setIsDelete(1);
		}
		favoriteRepository.saveAll(favoriteEntityList);
		return null;
	}

}
