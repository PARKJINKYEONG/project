package com.ict.traveljoy.info.userhandicap.repository;

import com.ict.traveljoy.info.handicap.repository.Handicap;
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
@Table(name="user_handicap")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserHandicap {
	@Id
	@SequenceGenerator(name = "seq_user_handicap",sequenceName = "seq_user_handicap",allocationSize = 1,initialValue = 1)
	@GeneratedValue(generator = "seq_user_handicap",strategy = GenerationType.SEQUENCE)
	@Column(name="user_handicap_id")
	private Long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "handicap_id", nullable = false)
    private Handicap handicap;
    
    @Column
    private Long handicapLevel;
}
