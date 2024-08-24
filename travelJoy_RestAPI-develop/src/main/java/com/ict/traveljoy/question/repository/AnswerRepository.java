package com.ict.traveljoy.question.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerRepository extends JpaRepository<Answer, Long>{

	boolean existsByQuestion_Id(long questionId);

	Answer findByQuestion_Id(long questionId);



}
