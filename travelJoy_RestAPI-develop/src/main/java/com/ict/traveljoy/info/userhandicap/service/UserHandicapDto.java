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
public class UserHandicapDto {
	private Long id;
	private Long userId;
	private Long handicapId;
	
	public UserHandicap toEntity() {
		Users user = new Users();
		Handicap handicap = new Handicap();
		
		user.setId(userId);
		handicap.setId(handicapId);
		return UserHandicap.builder()
				.id(id)
				.user(user)
				.handicap(handicap)
				.build();
	}
	public static UserHandicapDto toDto(UserHandicap userHandicap) {
		return UserHandicapDto.builder()
				.id(userHandicap.getId())
				.userId(userHandicap.getUser() != null ? userHandicap.getUser().getId() : null)
				.handicapId(userHandicap.getHandicap() != null ? userHandicap.getHandicap().getId() : null)
				.build();
	}
}
