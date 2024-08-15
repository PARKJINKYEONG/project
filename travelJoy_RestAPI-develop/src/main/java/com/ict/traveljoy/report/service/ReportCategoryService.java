package com.ict.traveljoy.report.service;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ict.traveljoy.report.repository.ReportCategoryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReportCategoryService {

	private final ReportCategoryRepository reportCategoryRepository;
	private final ObjectMapper objectMapper;
}
