package com.ict.traveljoy.report.repository;

import java.time.LocalDateTime;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import com.ict.traveljoy.question.repository.QuestionCategory;
import com.ict.traveljoy.users.repository.Users;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name="report")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Report {

    //기본키, 일련번호
	@Id
	@Column(name="report_id")
	@SequenceGenerator(name = "seq_report",sequenceName = "seq_report",allocationSize = 1,initialValue = 1)
	@GeneratedValue(generator = "seq_report",strategy = GenerationType.SEQUENCE)
    private Long id;
    
	@ManyToOne
    @JoinColumn(name = "user_id")
	private Users user;
    
    //신고대상
	@ManyToOne
    @JoinColumn(name = "report_category_id")
	private ReportCategory reportCategory;
    
	@Column(nullable=false)
    private Long targetId;
    
    //신고일자
	@Column(name="report_date", nullable = false)
	@ColumnDefault("SYSDATE")
	@CreationTimestamp
    private LocalDateTime reportDate;
    
    //신고내용
	@Column(length=2000)
    private String reportContent;
    
    //신고처리 결과
	@Column(nullable=false)
    private Long reportHandlerId;
    
	@Column(length=50, nullable=false)
    private String reportHandlerName;
    
	@Column(length=2000,nullable=false)
    private String reportResult;
    
    //신고처리 일자
    @Column(nullable = false)
	@ColumnDefault("SYSDATE")
	@CreationTimestamp
    private LocalDateTime reportResultDate;
    
    
    
}