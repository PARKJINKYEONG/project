package com.ict.traveljoy.plan.details.repository;

import com.ict.traveljoy.info.allergy.repository.Allergy;
import com.ict.traveljoy.plan.repository.Plan;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "plan_allergy")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlanAllergy {
    @Id
    @SequenceGenerator(name = "seq_plan_allergy",sequenceName = "seq_plan_allergy",allocationSize = 1,initialValue = 1)
    @GeneratedValue(generator = "seq_plan_allergy",strategy = GenerationType.SEQUENCE)
    @Column(name = "PLAN_ALLERGY_ID", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "PLAN_ID")
    private Plan plan;

    @ManyToOne
    @JoinColumn(name = "ALLERGY_ID")
    private Allergy allergy;
}
