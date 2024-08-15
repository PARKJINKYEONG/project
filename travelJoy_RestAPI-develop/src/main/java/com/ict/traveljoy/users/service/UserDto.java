package com.ict.traveljoy.users.service;


import java.sql.Date;
import java.time.LocalDateTime;

import com.ict.traveljoy.users.repository.Users;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


//일단 모든 정보를 담고있는 DTO 만들어놨음(여기서 잘라서 용도에 맞는 DTO로 분해)

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class UserDto {
	//엔터티의 필드중 데이타 전달에 필요한 필드만 지정
	private String email;
	private String password;
	private String name;
	private String nickname;
	private Date birthDate;
	private LocalDateTime signInDate;
	private Boolean gender;
	private Boolean isKakao;
	private Boolean isGoogle;
	private Boolean isNaver;
	private Boolean handicap;
	private Boolean handicapAllow;
	private Boolean allergy;
	private Boolean allergyAllow;
	private Boolean interest;
	private Boolean interestAllow;
	private Long reported;
	private Boolean isDeleteId;
	private LocalDateTime deleteIdDate;
	private Boolean isActive;
	private LocalDateTime updateDate;
	
	//DTO를 ENTITY로 변환하는 메소드
	public Users toEntity() {
		return Users.builder()
				.email(email)
				.password(password)
				.name(name)
				.nickname(nickname)
				.birthDate(birthDate)
				.signInDate(signInDate)
				.gender(gender == true ? 1 : 0)
				.isKakao(isKakao == true ? 1 : 0)
				.isGoogle(isGoogle == true ? 1 : 0)
				.isNaver(isNaver == true ? 1 : 0)
				.handicap(handicap == true ? 1 : 0)
				.handicapAllow(handicapAllow == true ? 1 : 0)
				.allergy(allergy == true ? 1 : 0)
				.allergyAllow(allergyAllow == true ? 1 : 0)
				.interest(interest == true ? 1 : 0)
				.interestAllow(interestAllow == true ? 1 : 0)
				.reported(reported)
				.isDeleteId(isDeleteId == true ? 1 : 0)
				.deleteIdDate(deleteIdDate)
				.isActive(isActive == true ? 1 : 0)
				.updateDate(updateDate)
				.build();
	}
	//ENTITY를 DTO로 변환하는 메소드
	public static UserDto toDto(Users users) {
		return UserDto.builder()
				.email(users.getEmail())
				.password(users.getPassword())
				.name(users.getName())
				.nickname(users.getNickname())
				.birthDate(users.getBirthDate())
				.signInDate(users.getSignInDate())
				.gender(users.getGender() == 1 ? true : false)
				.isKakao(users.getIsKakao() == 1 ? true : false)
				.isGoogle(users.getIsGoogle() == 1 ? true : false)
				.isNaver(users.getIsNaver() == 1 ? true : false)
				.handicap(users.getHandicap() == 1 ? true : false)
				.handicapAllow(users.getHandicapAllow() == 1 ? true : false)
				.allergy(users.getAllergy() == 1 ? true : false)
				.allergyAllow(users.getAllergyAllow() == 1 ? true : false)
				.interest(users.getInterest() == 1 ? true : false)
				.interestAllow(users.getInterestAllow() == 1 ? true : false)
				.reported(users.getReported())
				.isDeleteId(users.getIsDeleteId() == 1 ? true : false)
				.deleteIdDate(users.getDeleteIdDate())
				.isActive(users.getIsActive() == 1 ? true : false)
				.updateDate(users.getUpdateDate())
				.build();
	}
}
