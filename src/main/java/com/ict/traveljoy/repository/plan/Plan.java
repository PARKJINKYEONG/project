package com.ict.traveljoy.repository.plan;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "plan")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Plan {

    @Id
    @SequenceGenerator(name = "seq_plan", sequenceName = "seq_plan", allocationSize = 1, initialValue = 1)
    @GeneratedValue(generator = "seq_plan", strategy = GenerationType.SEQUENCE)
    @Column(name = "PLAN_ID", nullable = false)
    private Long planId;

    @Column(name = "PLAN_NAME", length = 50)
    private String planName;

    @Column(name = "PLAN_DESCRIPTIONS", length = 300)
    private String planDescriptions;

    @Column(name = "CREATE_DATE", nullable = false, updatable = false)
    @CreationTimestamp
    private LocalDateTime createDate;

    @Column(name = "IS_ACTIVE", nullable = false)
    private Boolean isActive = true;

    @Column(name = "IS_DELETE", nullable = false)
    private Boolean isDelete = false;

    @Column(name = "DELETE_DATE")
    private LocalDateTime deleteDate;

    @Column(name = "PROGRESS", nullable = false)
    private Integer progress;
}
