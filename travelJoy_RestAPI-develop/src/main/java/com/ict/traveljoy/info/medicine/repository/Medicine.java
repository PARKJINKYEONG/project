package com.ict.traveljoy.info.medicine.repository;

import java.util.List;

import com.ict.traveljoy.info.allergy.repository.Allergy;
import com.ict.traveljoy.info.userallergy.repository.UserAllergy;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="medicine")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Medicine {

	@Id
	@SequenceGenerator(name = "seq_medicine",sequenceName = "seq_medicine",allocationSize = 1,initialValue = 1)
	@GeneratedValue(generator = "seq_medicine",strategy = GenerationType.SEQUENCE)
	@Column(name="medicine_id")
	private Long id;
	
	@Column(length = 2000)
	private String description;
	
	@Column(length = 100)
	private String medicineName;
	
}
