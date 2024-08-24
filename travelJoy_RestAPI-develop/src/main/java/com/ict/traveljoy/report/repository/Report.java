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
	@Column(name="REPORT_ID")
	@SequenceGenerator(name = "seq_report",sequenceName = "seq_report",allocationSize = 1,initialValue = 1)
	@GeneratedValue(generator = "seq_report",strategy = GenerationType.SEQUENCE)
    private Long id;
    
	@ManyToOne
    @JoinColumn(name = "USER_ID")
	private Users user;
    
    //신고대상
	@ManyToOne
    @JoinColumn(name = "REPORT_CATEGORY_ID")
	private ReportCategory reportCategory;
    
	@Column(name="TARGET_ID",nullable=false)
    private Long targetId;
    
    //신고일자
	@Column(name="REPORT_DATE", nullable = false)
	@ColumnDefault("SYSDATE")
	@CreationTimestamp
    private LocalDateTime reportDate;
    
    //신고내용
	@Column(name="REPORT_CONTENT", nullable = false,length=2000)
    private String reportContent;
    
    
	@Column(name="REPORT_HANDLER_ID",nullable=false)
    private Long reportHandlerId;
    
	@Column(name="REPORT_HANDLER_NAME",length=50, nullable=false)
    private String reportHandlerName;
    
	//신고처리 결과
	@Column(name="REPORT_RESULT",length=2000,nullable=false)
    private String reportResult;
    
    //신고처리 일자
    @Column(name="REPORT_RESULT_DATE",nullable = false)
	@ColumnDefault("SYSDATE")
	@CreationTimestamp
    private LocalDateTime reportResultDate;
    
    
    
}