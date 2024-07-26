package com.ict.traveljoy.repository.plan;

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
    @SequenceGenerator(name = "seq_plan",sequenceName = "seq_plan",allocationSize = 1,initialValue = 1)
    @GeneratedValue(generator = "seq_plan",strategy = GenerationType.SEQUENCE)
    @Column(name = "PLAN_ID", nullable = false)
    private Long planId;

    @Column(name = "PLAN_NAME", length = 50)
    private String planName;

    @Column(name = "PLAN_DESCRIPTIONS", length = 300)
    private String planDescriptions;

    @Column(name = "CREATE_DATE", nullable = false)
    @ColumnDefault("SYSDATE")
    @CreationTimestamp
    private LocalDateTime createDate;

    @Column(name = "IS_ACTIVE", length = 1, nullable = false)
    @ColumnDefault("true")
    private String isActive;

    @Column(name = "IS_DELETE", length = 1, nullable = false)
    @ColumnDefault("false")
    private String isDelete;

    @Column(name = "DELETE_DATE")
    private LocalDateTime deleteDate;

    @Column(name = "PROGRESS", nullable = false)
    private Integer progress;

}
