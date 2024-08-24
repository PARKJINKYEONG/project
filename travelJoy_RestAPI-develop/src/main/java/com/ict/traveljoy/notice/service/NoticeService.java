package com.ict.traveljoy.notice.service;


import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ict.traveljoy.notice.repository.Notice;
import com.ict.traveljoy.notice.repository.NoticeRepository;
import com.ict.traveljoy.notice.repository.NoticeViewRepository;
import com.ict.traveljoy.users.repository.UserRepository;
import com.ict.traveljoy.users.repository.Users;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NoticeService {
	
	private final ViewCountService viewCountService;
	private final NoticeViewService noticeViewService;
	private final UserRepository userRepository;
	private final NoticeRepository noticeRepository;
	private final NoticeViewRepository noticeViewRepository;
	
	private final ObjectMapper objectMapper;
	
	@Transactional
	public NoticeDTO createNotice(String useremail, NoticeDTO noticeDTO) {
		
		Notice notice = noticeDTO.toEntity();
		
		// user 정하기
		Users user = userRepository.findByEmail(useremail).get();
		notice.setUser(user);
		Notice afterSave = noticeRepository.save(notice);
		
		// 조회수 만들기
		viewCountService.createByNotice(afterSave);
		
        return NoticeDTO.toDTO(afterSave);
	}
	
//	@Transactional(readOnly = true) //검색
//	public List<NoticeDTO> findByTitle(String title) {
//		List<Notice> noticeList = noticeRepository.findByTitleContaining(title);
//        return noticeList.stream()
//                      .map(NoticeDTO::toDTO)
//                      .collect(Collectors.toList());
//	}

	public NoticeDTO findById(long notice_id) { // 특정 공지 조회
		if(noticeRepository.existsById(notice_id)) {
			Notice notice = noticeRepository.findById(notice_id).get();
			NoticeDTO noticeDTO = NoticeDTO.toDTO(notice);
			//조회수 증가
			ViewCountDTO viewcountDTO = viewCountService.updateViewCount(notice_id);
			noticeDTO.setViewCount(viewcountDTO.getCount());
			return noticeDTO;
		}
		else throw new IllegalArgumentException("오류");
	}
	
	@Transactional(readOnly = true)
	public List<NoticeDTO> findAll() { //모든 공지 조회
		
		List<Notice> noticeList = noticeRepository.findAll();
		List<NoticeDTO> noticeDTOList = noticeList.stream().map(NoticeDTO::toDTO).collect(Collectors.toList());
		long count = 0l;
		for(int i=0;i<noticeList.size();i++) {
			// viewcount받아오기
			count = viewCountService.findbyNoticeId(noticeList.get(i).getId()).getCount();
			//방문횟수 dto에 추가
			noticeDTOList.get(i).setViewCount(count);
		}
        return noticeDTOList;
	}
	
	@Transactional
	public NoticeDTO updateNotice(Long notice_id,NoticeDTO updateNoticeDTO) {
		if(noticeRepository.existsById(notice_id)) {
			Notice beforeNotice = noticeRepository.findById(notice_id).orElseThrow(() -> new RuntimeException("Notice not found"));
			beforeNotice.setTitle(updateNoticeDTO.getTitle());
			beforeNotice.setContent(updateNoticeDTO.getContent());
			beforeNotice.setUser(updateNoticeDTO.getUser());
			//제목, 내용만 변경
//			Notice afterNotice = noticeDTO.toEntity();
	        Notice updatedNotice = noticeRepository.save(beforeNotice);
	        return NoticeDTO.toDTO(updatedNotice);
		}
		else throw new IllegalArgumentException("오류");
		


	}

	@Transactional
	public NoticeDTO deleteNotice(String useremail,Long notice_id) {
		Users user = userRepository.findByEmail(useremail).get();
		if(user.getPermission()!="0") {//권한있으면 수정가능
			if(noticeRepository.existsById(notice_id)) {
				Notice notice = noticeRepository.findById(notice_id).orElseThrow(() -> new RuntimeException("Notice not found"));
				NoticeDTO noticeDTO = NoticeDTO.toDTO(notice);
				noticeDTO.setIsActive(false);
				noticeDTO.setIsDelete(true);
				// front에서는 setisActive만 보여주기, 관리자에서는 나눠서 볼 수 있게
				
				Notice deletedNotice = noticeDTO.toEntity();
				deletedNotice = noticeRepository.save(deletedNotice);
//				noticeRepository.delete(notice);
				
				return NoticeDTO.toDTO(deletedNotice);
			}
			else return NoticeDTO.builder().title("수정불가").content("권한없음").build();
		}

		else throw new IllegalArgumentException("오류");
		
	}



	
}
