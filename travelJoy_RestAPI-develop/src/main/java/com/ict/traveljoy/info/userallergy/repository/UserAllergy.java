package com.ict.traveljoy.info.userallergy.repository;

import com.ict.traveljoy.info.allergy.repository.Allergy;
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
@Table(name="user_allergy")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserAllergy {
	@Id
	@SequenceGenerator(name = "seq_user_allergy",sequenceName = "seq_user_allergy",allocationSize = 1,initialValue = 1)
	@GeneratedValue(generator = "seq_user_allergy",strategy = GenerationType.SEQUENCE)
	@Column(name = "user_allergy_id")
	private Long id;
	
	@ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @ManyToOne
    @JoinColumn(name = "allergy_id", nullable = false)
    private Allergy allergy;
    
    @Column(name="ALLERGY_LEVEL")
    private Long allergyLevel;
}
