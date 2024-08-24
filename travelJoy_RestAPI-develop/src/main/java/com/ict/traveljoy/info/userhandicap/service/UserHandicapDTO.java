package com.ict.traveljoy.info.userhandicap.service;

import com.ict.traveljoy.info.handicap.repository.Handicap;
import com.ict.traveljoy.info.userhandicap.repository.UserHandicap;
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
public class UserHandicapDTO {
	private Long id;
	private Users user;
	private Handicap handicap;
	
	public UserHandicap toEntity() {
		return UserHandicap.builder()
				.id(id)
				.user(user)
				.handicap(handicap)
				.build();
	}
	public static UserHandicapDTO toDTO(UserHandicap userHandicap) {
		return UserHandicapDTO.builder()
				.id(userHandicap.getId())
				.user(userHandicap.getUser())
				.handicap(userHandicap.getHandicap())
				.build();
	}
}
