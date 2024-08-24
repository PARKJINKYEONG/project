package com.ict.traveljoy.report.service;


import java.time.LocalDateTime;

import com.ict.traveljoy.report.repository.Report;
import com.ict.traveljoy.report.repository.ReportCategory;
import com.ict.traveljoy.users.repository.Users;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReportDTO {

	private Long id;
	private Users user;
	private ReportCategory reportCategory;
	private Long targetId;
	private LocalDateTime reportDate;
	private String reportContent;
	private Long reportHandlerId;
	private String reportHandlerName;
	private String reportResult;
	private LocalDateTime reportResultDate;
	
	public Report toEntity() {
		return Report.builder()
				.id(id)
				.user(user)
				.reportCategory(reportCategory)
				.targetId(targetId)
				.reportDate(reportDate)
				.reportContent(reportContent)
				.reportHandlerId(reportHandlerId)
				.reportHandlerName(reportHandlerName)
				.reportResult(reportResult)
				.reportResultDate(reportResultDate)
				.build();
	}
	
	public static ReportDTO toDTO(Report report) {
		return ReportDTO.builder()
				.id(report.getId())
				.user(report.getUser())
				.reportCategory(report.getReportCategory())
				.targetId(report.getTargetId())
				.reportDate(report.getReportDate())
				.reportContent(report.getReportContent())
				.reportHandlerId(report.getReportHandlerId())
				.reportHandlerName(report.getReportHandlerName())
				.reportResult(report.getReportResult())
				.reportResultDate(report.getReportResultDate())
				.build();
	}
	
	
}
