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
	private Long userId;
	private Long reportCategoryId;
	private Long targetId;
	private LocalDateTime reportDate;
	private String reportContent;
	private Long reportHandlerId;
	private String reportHandlerName;
	private String reportResult;
	private LocalDateTime reportResultDate;
	
	public Report toEntity() {
		Users user = new Users();
		ReportCategory reportCategory = new ReportCategory();
		
		user.setId(userId);
		reportCategory.setId(reportCategoryId);
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
				.userId(report.getUser()!=null?report.getUser().getId():null)
				.reportCategoryId(report.getReportCategory()!=null?report.getReportCategory().getId():null)
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
