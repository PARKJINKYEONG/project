package com.ict.traveljoy.report.repository;

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

@Entity
@Table(name="report_category")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReportCategory {

	@Id
	@SequenceGenerator(name = "seq_report_category",sequenceName = "seq_report_category",allocationSize = 1,initialValue = 1)
	@GeneratedValue(generator = "seq_report_category",strategy = GenerationType.SEQUENCE)
	@Column(name = "report_category_id")
	private Long id;
	
	@Column(length=50,nullable=false)
	private String reportCategoryName;
}
