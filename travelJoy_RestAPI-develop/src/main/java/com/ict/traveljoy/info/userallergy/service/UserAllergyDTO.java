package com.ict.traveljoy.info.userallergy.service;

import com.ict.traveljoy.info.allergy.repository.Allergy;
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
public class UserAllergyDTO {
	private Long id;
	private Users user;
	private Allergy allergy;
	private Long allergyLevel;
	public UserAllergy toEntity() {
		
		return UserAllergy.builder()
				.id(id)
				.user(user)
				.allergy(allergy)
				.allergyLevel(allergyLevel)
				.build();
	}
	public static UserAllergyDTO toDTO(UserAllergy userAllergy) {
		return UserAllergyDTO.builder()
				.id(userAllergy.getId())
				.user(userAllergy.getUser())
				.allergy(userAllergy.getAllergy())
				.allergyLevel(userAllergy.getAllergyLevel())
				.build();
	}
}
