package com.ict.traveljoy.feedback.repository;

import com.ict.traveljoy.plan.repository.Plan;

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
@Table(name = "FEEDBACK")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Feedback {

    @Id
    @SequenceGenerator(name = "seq_feedback",sequenceName = "seq_feedback",allocationSize = 1,initialValue = 1)
	@GeneratedValue(generator = "seq_feedback",strategy = GenerationType.SEQUENCE)
    @Column(name = "FEEDBACK_ID", nullable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PLAN_ID")
    private Plan plan;

    @Column(name = "OWNER", length = 30)
    private String owner;

    @Column(name = "RATE")
    private Integer rate;
}
