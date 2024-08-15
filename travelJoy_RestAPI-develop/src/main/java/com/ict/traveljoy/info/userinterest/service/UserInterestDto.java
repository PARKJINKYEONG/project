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
public class UserInterestDto {
	private Long id;
	private Long userId;
	private Long interestId;
	
	public UserInterest toEntity() {
		Users user = new Users();
		Interest interest = new Interest();
		
		user.setId(userId);
		interest.setId(interestId);
		return UserInterest.builder()
				.id(id)
				.user(user)
				.interest(interest)
				.build();
	}
	public static UserInterestDto toDto(UserInterest userInterest) {
		return UserInterestDto.builder()
				.id(userInterest.getId())
				.userId(userInterest.getUser() != null ? userInterest.getUser().getId() : null)
				.interestId(userInterest.getInterest() != null ? userInterest.getInterest().getId() : null)
				.build();
	}
	
}
