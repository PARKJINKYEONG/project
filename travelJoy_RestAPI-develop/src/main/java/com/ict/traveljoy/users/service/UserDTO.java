package com.ict.traveljoy.users.service;


import java.sql.Date;
import java.time.LocalDateTime;

import com.ict.traveljoy.image.repository.Image;
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
public class UserDTO {
    private String email; //not null
    private String password; //not null
    private String name;
    private String nickname; //not null
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
    private Image profileImage;
    private String introduce;

    public Users toEntity() {
        return Users.builder()
            .email(email)
            .password(password)
            .name(name)
            .nickname(nickname)
            .birthDate(birthDate)
            .signInDate(signInDate)
            .gender(gender != null && gender ? 1 : 0)
            .isKakao(isKakao != null && isKakao ? 1 : 0)
            .isGoogle(isGoogle != null && isGoogle ? 1 : 0)
            .isNaver(isNaver != null && isNaver ? 1 : 0)
            .handicap(handicap != null && handicap ? 1 : 0)
            .handicapAllow(handicapAllow != null && handicapAllow ? 1 : 0)
            .allergy(allergy != null && allergy ? 1 : 0)
            .allergyAllow(allergyAllow != null && allergyAllow ? 1 : 0)
            .interest(interest != null && interest ? 1 : 0)
            .interestAllow(interestAllow != null && interestAllow ? 1 : 0)
            .reported(reported)
            .isDeleteId(isDeleteId != null && isDeleteId ? 1 : 0)
            .deleteIdDate(deleteIdDate)
            .isActive(isActive != null && isActive ? 1 : 0)
            .updateDate(updateDate)
            .profileImage(profileImage)
            .introduce(introduce)
            .build();
    }

    public static UserDTO toDTO(Users users) {
        return UserDTO.builder()
            .email(users.getEmail())
            .password(users.getPassword())
            .name(users.getName())
            .nickname(users.getNickname())
            .birthDate(users.getBirthDate())
            .signInDate(users.getSignInDate())
            .gender(users.getGender() != null && users.getGender() == 1 ? true : false)
            .isKakao(users.getIsKakao() != null && users.getIsKakao() == 1 ? true : false)
            .isGoogle(users.getIsGoogle() != null && users.getIsGoogle() == 1 ? true : false)
            .isNaver(users.getIsNaver() != null && users.getIsNaver() == 1 ? true : false)
            .handicap(users.getHandicap() != null && users.getHandicap() == 1 ? true : false)
            .handicapAllow(users.getHandicapAllow() != null && users.getHandicapAllow() == 1 ? true : false)
            .allergy(users.getAllergy() != null && users.getAllergy() == 1 ? true : false)
            .allergyAllow(users.getAllergyAllow() != null && users.getAllergyAllow() == 1 ? true : false)
            .interest(users.getInterest() != null && users.getInterest() == 1 ? true : false)
            .interestAllow(users.getInterestAllow() != null && users.getInterestAllow() == 1 ? true : false)
            .reported(users.getReported())
            .isDeleteId(users.getIsDeleteId() != null && users.getIsDeleteId() == 1 ? true : false)
            .deleteIdDate(users.getDeleteIdDate())
            .isActive(users.getIsActive() != null && users.getIsActive() == 1 ? true : false)
            .updateDate(users.getUpdateDate())
            .profileImage(users.getProfileImage())
            .introduce(users.getIntroduce())
            .build();
    }
}
