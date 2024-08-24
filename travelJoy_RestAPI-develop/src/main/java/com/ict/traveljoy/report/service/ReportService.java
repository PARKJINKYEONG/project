package com.ict.traveljoy.report.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ict.traveljoy.report.repository.Report;
import com.ict.traveljoy.report.repository.ReportRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReportService {
	
	private final ReportRepository reportRepository;
	private final ObjectMapper objectMapper;
	
	
	public ReportDTO createReport(ReportDTO reportDTO) {
		Report report = reportDTO.toEntity();
		Report afterSave = reportRepository.save(report);
		return ReportDTO.toDTO(afterSave);
	}
	public List<ReportDTO> getAll() {
		List<Report> reportList = reportRepository.findAll();
		return reportList.stream().map(report->ReportDTO.toDTO(report)).collect(Collectors.toList());
	}
	public ReportDTO getReportById(long reportId) {
		if(reportRepository.existsById(reportId)) {
			Report report = reportRepository.findById(reportId).orElseThrow(() -> new RuntimeException("Question not found"));
			return ReportDTO.toDTO(report);
		}
		else throw new IllegalArgumentException("오류");
	}
//	public List<ReportDTO> getReportedAllByUserId(long userId) {
//		List<Report> reportedList = reportRepository.findAllByUser_Id(userId);
//		return reportedList.stream().map(report->ReportDTO.toDTO(report)).collect(Collectors.toList());
//	}
	//한 신고
	public List<ReportDTO> getReportAllByUserId(long userId) {
		List<Report> reportList = reportRepository.findAllByUser_Id(userId);
		return reportList.stream().map(report->ReportDTO.toDTO(report)).collect(Collectors.toList());
	}
	public ReportDTO deleteById(long reportId) {
		if(reportRepository.existsById(reportId)) {
			Report report = reportRepository.findById(reportId).orElseThrow(() -> new RuntimeException("Question not found"));
			reportRepository.delete(report);
			return ReportDTO.toDTO(report);
		}
		else throw new IllegalArgumentException("오류");
	}

}
