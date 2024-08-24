package com.ict.traveljoy.info.handicaprecommend.repository;

import java.util.List;

import com.ict.traveljoy.info.handicap.repository.Handicap;
import com.ict.traveljoy.info.handicaprecommend.service.HandicapRecommendDTO;
import com.ict.traveljoy.info.interest.repository.Interest;
import com.ict.traveljoy.info.userhandicap.repository.UserHandicap;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="handicap_recommend")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HandicapRecommend {
	@Id
	@SequenceGenerator(name = "seq_handicap_recommend",sequenceName = "seq_handicap_recommend",allocationSize = 1,initialValue = 1)
	@GeneratedValue(generator = "seq_handicap_recommend",strategy = GenerationType.SEQUENCE)
	@Column(name="handicap_recommend_id")
	private Long id;
	
	@ManyToOne
	@JoinColumn(name="handicap_id")
	private Handicap handicap;
	
	@ManyToOne
	@JoinColumn(name="interest_id")
	private Interest interest;
}
