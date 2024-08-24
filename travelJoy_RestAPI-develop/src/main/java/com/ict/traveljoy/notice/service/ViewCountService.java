package com.ict.traveljoy.notice.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ict.traveljoy.notice.repository.Notice;
import com.ict.traveljoy.notice.repository.NoticeRepository;
import com.ict.traveljoy.notice.repository.ViewCount;
import com.ict.traveljoy.notice.repository.ViewCountRepository;
import com.ict.traveljoy.users.repository.UserRepository;
import com.ict.traveljoy.users.repository.Users;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ViewCountService {

	private final ViewCountRepository viewCountRepository;
	private final NoticeRepository noticeRepository;
	private final UserRepository userRepository;
	private final ObjectMapper objectMapper;
	
	
	public ViewCountDTO createByNotice(Notice notice) {
		if(noticeRepository.existsById(notice.getId())) {
			
			ViewCount viewCountEntity = new ViewCount();
			viewCountEntity.setNotice(notice);
			viewCountEntity.setCount((long)0);
			
			return ViewCountDTO.toDTO(viewCountRepository.save(viewCountEntity));
		}
		else throw new IllegalArgumentException("오류");
	}
	
	// 단순 횟수 받아오기
	@Transactional(readOnly = true) //notice id별 sum(count), datetime에 따라 증가
	public ViewCountDTO findbyNoticeId(long noticeId) {
		if(noticeRepository.existsById(noticeId) && viewCountRepository.existsByNotice_Id(noticeId)) {
			ViewCount viewCountEntity = viewCountRepository.findByNotice_Id(noticeId);
			return ViewCountDTO.toDTO(viewCountEntity);
	
		}
		else throw new IllegalArgumentException("오류");
	}
	
	// 횟수 증가
//	 //notice id별, user id별 방문횟수 증가
//	public long findbyNoticeId(long noticeId,long userId) {
//		if(noticeRepository.existsById(noticeId)) {
//			
//		}
//
//		return 4;
//	}
	
	
	
	public ViewCountDTO updateViewCount(long noticeId) {
		if(viewCountRepository.existsByNotice_Id(noticeId)) {
			
			// 추가적으로 check NoticeView
			ViewCount viewCount = viewCountRepository.findByNotice_Id(noticeId);
			viewCount.setCount(viewCount.getCount()+1);
			ViewCount updatedViewCount = viewCountRepository.save(viewCount);
			return ViewCountDTO.toDTO(updatedViewCount);
		}
		else throw new NullPointerException("오류");
	}
	
}
