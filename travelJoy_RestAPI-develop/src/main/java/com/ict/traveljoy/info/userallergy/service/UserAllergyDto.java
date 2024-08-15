package com.ict.traveljoy.info.userallergy.service;

import com.ict.traveljoy.info.allergy.repository.Allergy;
import com.ict.traveljoy.info.interest.service.InterestDto;
import com.ict.traveljoy.info.userallergy.repository.UserAllergy;
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
public class UserAllergyDto {
	private Long id;
	private Long userId;
	private Long allergyId;
	private Long allergyLevel;
	public UserAllergy toEntity() {
		Users user = new Users();
		Allergy allergy = new Allergy();
		
		user.setId(userId);
		allergy.setId(allergyId);
		
		return UserAllergy.builder()
				.id(id)
				.user(user)
				.allergy(allergy)
				.allergyLevel(allergyLevel)
				.build();
	}
	public static UserAllergyDto toDto(UserAllergy userAllergy) {
		return UserAllergyDto.builder()
				.id(userAllergy.getId())
				.userId(userAllergy.getUser() != null ? userAllergy.getUser().getId() : null)
				.allergyId(userAllergy.getAllergy() != null ? userAllergy.getAllergy().getId() : null)
				.allergyLevel(userAllergy.getAllergyLevel())
				.build();
	}
}
