package com.ict.traveljoy.info.medicine.repository;


import java.util.List;

import com.ict.traveljoy.info.allergymedicine.repository.AllergyMedicine;

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
	
	@Column(length = 2000,name="DESCRIPTION")
	private String description;
	
	@Column(length = 100,name="MEDICINE_NAME")
	private String medicineName;
	
	@OneToMany(mappedBy = "medicine", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<AllergyMedicine> allergyMedicine;
}
