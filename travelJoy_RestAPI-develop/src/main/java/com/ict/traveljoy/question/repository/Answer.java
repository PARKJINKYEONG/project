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
@Table(name = "answer")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Answer {

	@Id
	@SequenceGenerator(name = "seq_answer",sequenceName = "seq_answer",allocationSize = 1,initialValue = 1)
	@GeneratedValue(generator = "seq_answer",strategy = GenerationType.SEQUENCE)
	@Column(name="answer_id")
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "question_id", nullable = false)
	private Question question;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private Users user; //답변자

	@Column(length = 50,name="ANSWER_HANDLER_NAME")
	private String answerHandlerName;

	@Column(nullable = false,name="ANSWER_DATE")
	@ColumnDefault("SYSDATE")
	@CreationTimestamp
	private LocalDateTime answerDate;

	@Column(length = 2000,name="ANSWER_CONTENT")
	private String answerContent;
}
