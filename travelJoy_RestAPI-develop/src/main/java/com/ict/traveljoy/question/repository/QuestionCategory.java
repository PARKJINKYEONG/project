package com.ict.traveljoy.question.repository;

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
@Table(name = "question_category")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuestionCategory {

	@Id
	@SequenceGenerator(name = "seq_question_category",sequenceName = "seq_question_category",allocationSize = 1,initialValue = 1)
	@GeneratedValue(generator = "seq_question_category",strategy = GenerationType.SEQUENCE)
	@Column(name="question_category_id")
	private Long id;
	
	@Column(length = 50)
	private String questionCategoryName;
}
