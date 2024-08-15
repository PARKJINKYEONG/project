package com.ict.traveljoy.info.userinterest.repository;

import com.ict.traveljoy.info.interest.repository.Interest;
import com.ict.traveljoy.info.userhandicap.service.UserHandicapDto;
import com.ict.traveljoy.users.repository.Users;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="user_interest")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserInterest {
	@Id
	@SequenceGenerator(name = "seq_user_interest",sequenceName = "seq_user_interest",allocationSize = 1,initialValue = 1)
	@GeneratedValue(generator = "seq_user_interest",strategy = GenerationType.SEQUENCE)
	@Column(name="user_interest_id")
	private Long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "interest_id", nullable = false)
    private Interest interest;
}
