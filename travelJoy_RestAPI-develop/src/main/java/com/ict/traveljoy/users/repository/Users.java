package com.ict.traveljoy.users.repository;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import com.ict.traveljoy.converter.PermissionToNumberConverter;
import com.ict.traveljoy.info.userallergy.repository.UserAllergy;
import com.ict.traveljoy.info.userhandicap.repository.UserHandicap;
import com.ict.traveljoy.info.userinterest.repository.UserInterest;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Users {
	
	@Id
	@SequenceGenerator(name = "seq_users",sequenceName = "seq_users",allocationSize = 1,initialValue = 1)
	@GeneratedValue(generator = "seq_users",strategy = GenerationType.SEQUENCE)
	@Column(name="user_id")
	private Long id;
	
	@Column(length = 320, unique = true, nullable = false)
	private String email;
	
	@Column(length = 64,nullable = false)
	private String password;
	
	@Column(length = 30)
	private String name;
	
	@Column(length = 30,nullable = false)
	private String nickname;
	
	@Column
	private Date birthDate;
	
	@Column(nullable = false)
	@ColumnDefault("SYSDATE")
	@CreationTimestamp
	private LocalDateTime signInDate;
	
	@Column(columnDefinition = "NUMBER(1, 0)")
    private Integer gender;
	
	@Column(nullable = false,columnDefinition = "NUMBER(1, 0)")
    @ColumnDefault("0")
    private Integer isKakao;
	
	@Column(nullable = false,columnDefinition = "NUMBER(1, 0)")
    @ColumnDefault("0")
    private Integer isGoogle;
	
	@Column(nullable = false,columnDefinition = "NUMBER(1, 0)")
    @ColumnDefault("0")
    private Integer isNaver;
	
	@Convert(converter = PermissionToNumberConverter.class)
	@Column
	@ColumnDefault("0")
	private String permission;
	
	@Column(columnDefinition = "NUMBER(1, 0)")
    private Integer handicap;
	
	@Column(nullable = false,columnDefinition = "NUMBER(1, 0)")
    @ColumnDefault("0")
    private Integer handicapAllow;
	
	@Column(columnDefinition = "NUMBER(1, 0)")
    private Integer allergy;
	
	@Column(nullable = false,columnDefinition = "NUMBER(1, 0)")
    @ColumnDefault("0")
    private Integer allergyAllow;
	
	@Column(columnDefinition = "NUMBER(1, 0)")
    private Integer interest;
	
	@Column(nullable = false,columnDefinition = "NUMBER(1, 0)")
    @ColumnDefault("0")
    private Integer interestAllow;
	
	@Column
	private Long reported;
	
	@Column(nullable = false,columnDefinition = "NUMBER(1, 0)")
    @ColumnDefault("0")
    private Integer isDeleteId;
	
	@Column
	private LocalDateTime deleteIdDate;
	
	@Column(nullable = false,columnDefinition = "NUMBER(1, 0)")
    @ColumnDefault("1")
    private Integer isActive;
	
	@Column
	@ColumnDefault("SYSDATE")
	@CreationTimestamp
	private LocalDateTime updateDate;
	
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserInterest> userInterest;
	
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserAllergy> userAllergy;
	
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserHandicap> userHandicap;
}
