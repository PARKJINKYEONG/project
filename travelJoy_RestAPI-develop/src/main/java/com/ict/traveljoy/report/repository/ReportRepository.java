package com.ict.traveljoy.report.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report, Long>{

	List<Report> findAllByUser_Id(Long userId);

}
