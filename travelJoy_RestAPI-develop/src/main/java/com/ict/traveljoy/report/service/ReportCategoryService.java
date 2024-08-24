package com.ict.traveljoy.report.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ict.traveljoy.question.service.QuestionCategoryDTO;
import com.ict.traveljoy.report.repository.ReportCategory;
import com.ict.traveljoy.report.repository.ReportCategoryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReportCategoryService {

	private final ReportCategoryRepository reportCategoryRepository;
	private final ObjectMapper objectMapper;
	
	public List<ReportCategoryDTO> getAllCategory() {
		List<ReportCategory> reportCategories = reportCategoryRepository.findAll();
		return reportCategories.stream().map(rCategory->ReportCategoryDTO.toDTO(rCategory)).collect(Collectors.toList());
	}
}
