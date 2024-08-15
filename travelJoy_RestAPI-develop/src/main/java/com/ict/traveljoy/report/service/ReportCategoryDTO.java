package com.ict.traveljoy.report.service;

import com.ict.traveljoy.report.repository.ReportCategory;

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
public class ReportCategoryDTO {

	private Long id;
	private String reportCategoryName;
	
	public ReportCategory toEntity() {
		return ReportCategory.builder()
				.id(id)
				.reportCategoryName(reportCategoryName)
				.build();
	}
	public static ReportCategoryDTO toDTO(ReportCategory reportCategory) {
		return ReportCategoryDTO.builder()
				.id(reportCategory.getId())
				.reportCategoryName(reportCategory.getReportCategoryName())
				.build();
	}
}

// 왜 나눴었지...