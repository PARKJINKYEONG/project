package com.ict.traveljoy.info.userinterest.service;

import com.ict.traveljoy.info.interest.repository.Interest;
import com.ict.traveljoy.info.userinterest.repository.UserInterest;
import com.ict.traveljoy.users.repository.Users;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserInterestDTO {
	private Long id;
	private Users user;
	private Interest interest;
	
	public UserInterest toEntity() {
		return UserInterest.builder()
				.id(id)
				.user(user)
				.interest(interest)
				.build();
	}
	public static UserInterestDTO toDTO(UserInterest userInterest) {
		return UserInterestDTO.builder()
				.id(userInterest.getId())
				.user(userInterest.getUser())
				.interest(userInterest.getInterest())
				.build();
	}
	
}
