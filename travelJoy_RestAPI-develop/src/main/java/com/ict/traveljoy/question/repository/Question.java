package com.ict.traveljoy.question.repository;

import java.time.LocalDateTime;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

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
@Table(name = "question")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Question {

	@Id
	@SequenceGenerator(name = "seq_question",sequenceName = "seq_question",allocationSize = 1,initialValue = 1)
	@GeneratedValue(generator = "seq_question",strategy = GenerationType.SEQUENCE)
	@Column(name = "question_id")
	private Long id;


	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private Users user; //질문자

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "question_category_id", nullable = false)
	private QuestionCategory questionCategory;


	@Column(nullable = false)
	@ColumnDefault("SYSDATE")
	@CreationTimestamp
	private LocalDateTime questionDate;

	@Column(length = 2000)
	private String questionContent;

	@Column(nullable = false,columnDefinition = "NUMBER(1, 0)")
	@ColumnDefault("0")
	private Integer isHasAnswer;
}
