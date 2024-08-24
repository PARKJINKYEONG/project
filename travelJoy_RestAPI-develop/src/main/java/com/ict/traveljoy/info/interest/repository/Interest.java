package com.ict.traveljoy.info.interest.repository;

import java.util.List;

import org.hibernate.annotations.ColumnDefault;

import com.ict.traveljoy.info.userinterest.repository.UserInterest;

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
@Table(name="interest")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Interest {
	@Id
	@SequenceGenerator(name = "seq_interest",sequenceName = "seq_interest",allocationSize = 1,initialValue = 1)
	@GeneratedValue(generator = "seq_interest",strategy = GenerationType.SEQUENCE)
	@Column(name = "interest_id")
	private Long id;
	
	@Column(length = 50,nullable = false,name="INTEREST_TOPIC")
	private String interestTopic;
	
	@Column(columnDefinition = "NUMBER(1, 0)", name="ACTIVITY_PLACE")
	private Integer activityPlace;
	
	@Column(length = 50,name="CLASSIFICATION")
	private String classification;
	
	@OneToMany(mappedBy = "interest", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserInterest> userInterest;
}
