package com.ict.traveljoy.notice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


public interface NoticeRepository extends JpaRepository<Notice, Long>{
	
	List<Notice> findByTitleContaining(String title);
}
