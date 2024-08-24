package com.ict.traveljoy.notice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ViewCountRepository extends JpaRepository<ViewCount, Long>{

	boolean existsByNotice_Id(long noticeId);

	ViewCount findByNotice_Id(long noticeId);

}
