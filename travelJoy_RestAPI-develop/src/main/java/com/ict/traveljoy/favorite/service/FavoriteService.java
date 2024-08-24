package com.ict.traveljoy.favorite.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ict.traveljoy.favorite.repository.Favorite;
import com.ict.traveljoy.favorite.repository.FavoriteRepository;
import com.ict.traveljoy.users.repository.UserRepository;
import com.ict.traveljoy.users.repository.Users;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FavoriteService {

	private final FavoriteRepository favoriteRepository;
	private final UserRepository userRepository;
	private final ObjectMapper objectMapper;

	public FavoriteDTO addFavorite(String useremail, FavoriteDTO dto,String target) {

		Users user = userRepository.findByEmail(useremail).get();
		
		Favorite newFav = dto.toEntity();
		newFav.setUser(user);
		
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
	public List<FavoriteDTO> getFavoriteAll(String useremail) {
		Users user = userRepository.findByEmail(useremail).get();
		
		List<Favorite> favoriteEntityList =  favoriteRepository.findAllByUser_Id(user.getId());

		return objectMapper.convertValue(favoriteEntityList, objectMapper.getTypeFactory().defaultInstance().constructCollectionType(List.class,FavoriteDTO.class));
	}

	//target에 따라 favorite내용 모두 가져오기
	@Transactional(readOnly = true)
	public List<FavoriteDTO> getFavoriteAllByTarget(String target,String useremail){
		// target : event / food / sight / hotel
		
		Users user = userRepository.findByEmail(useremail).get();
				
		List<Favorite> favoriteEntityList;
		switch(target) {
			case "event":
				favoriteEntityList = favoriteRepository.findAllByUser_IdAndIsEventAndIsActive(user.getId(),1,1);
				break;// findAllBy엔터티_필드명();
			case "food":
				favoriteEntityList = favoriteRepository.findAllByUser_IdAndIsFoodAndIsActive(user.getId(),1,1);
				break;
			case "sight":
				favoriteEntityList = favoriteRepository.findAllByUser_IdAndIsSightAndIsActive(user.getId(),1,1);
				break;
			default:
				favoriteEntityList = favoriteRepository.findAllByUser_IdAndIsHotelAndIsActive(user.getId(),1,1);
				break;
		}

		return objectMapper.convertValue(favoriteEntityList, objectMapper.getTypeFactory().defaultInstance().constructCollectionType(List.class,FavoriteDTO.class));
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
