package com.ict.traveljoy.info.allergy.repository;

import java.time.LocalDateTime;
import java.util.List;

import com.ict.traveljoy.info.userallergy.repository.UserAllergy;
import com.ict.traveljoy.info.userhandicap.repository.UserHandicap;
import com.ict.traveljoy.info.userinterest.repository.UserInterest;
import com.ict.traveljoy.users.repository.Users;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
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
@Table(name="allergy")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Allergy {
	@Id
	@SequenceGenerator(name = "seq_allergy",sequenceName = "seq_allergy",allocationSize = 1,initialValue = 1)
	@GeneratedValue(generator = "seq_allergy",strategy = GenerationType.SEQUENCE)
	@Column(name="allergy_id")
	private Long id;
	
	@Column(length = 50,nullable = false)
	private String interestTopic;
	
	@Column(columnDefinition = "NUMBER(1, 0)")
	private Integer activityPlace;
	
	@Column(length = 50)
	private String classification;
	
	@OneToMany(mappedBy = "allergy", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserAllergy> userAllergy;
}
