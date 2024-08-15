package com.ict.traveljoy.plan.repository;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

import org.hibernate.annotations.ColumnDefault;
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
    private Long id;

    @Column(name = "PLAN_NAME", length = 50)
    private String planName;

    @Column(name = "PLAN_DESCRIPTIONS", length = 300)
    private String planDescriptions;

    @Column(name = "CREATE_DATE", nullable = false, updatable = false)
    @CreationTimestamp
    private LocalDateTime createDate;

    @Column(name = "IS_ACTIVE", nullable = false,columnDefinition = "NUMBER(1, 0)")
    @ColumnDefault("1")
    private Integer isActive;

    @Column(name = "IS_DELETE", nullable = false,columnDefinition = "NUMBER(1, 0)")
    @ColumnDefault("0")
    private Integer isDelete;

    @Column(name = "DELETE_DATE")
    private LocalDateTime deleteDate;

    @Column(name = "PROGRESS", nullable = false)
    private Integer progress;
}
