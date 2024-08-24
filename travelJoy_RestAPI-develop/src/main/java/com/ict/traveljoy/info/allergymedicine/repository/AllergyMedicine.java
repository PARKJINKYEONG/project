package com.ict.traveljoy.info.allergymedicine.repository;

import java.util.List;

import com.ict.traveljoy.info.allergy.repository.Allergy;

import com.ict.traveljoy.info.medicine.repository.Medicine;
import com.ict.traveljoy.info.userallergy.repository.UserAllergy;

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
@Table(name="ALLERGY_MEDICINE")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AllergyMedicine {
	@Id
	@SequenceGenerator(name = "seq_allergy_medicine",sequenceName = "seq_allergy_medicine",allocationSize = 1,initialValue = 1)
	@GeneratedValue(generator = "seq_allergy_medicine",strategy = GenerationType.SEQUENCE)
	@Column(name="allergy_medicine_id")
	private Long id;
	
	@ManyToOne
	@JoinColumn(name="allergy_id")
	private Allergy allergy;
	

	@ManyToOne
	@JoinColumn(name="medicine_id")
	private Medicine medicine;
	
}
