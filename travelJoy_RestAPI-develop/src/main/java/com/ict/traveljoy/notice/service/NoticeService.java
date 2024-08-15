package com.ict.traveljoy.notice.service;


import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.ict.traveljoy.notice.repository.Notice;
import com.ict.traveljoy.notice.repository.NoticeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NoticeService {
	

	private final NoticeRepository noticeRepository;
	
	@Transactional
	public NoticeDto createNotice(NoticeDto noticeDto) {
		Notice notice = noticeDto.toEntity();
        Notice savedNotice = noticeRepository.save(notice);
        return NoticeDto.toDto(savedNotice);
	}
	
	@Transactional
	public List<NoticeDto> findAll() {
		List<Notice> notices = noticeRepository.findAll();
        return notices.stream()
                      .map(NoticeDto::toDto)
                      .collect(Collectors.toList());
	}
	
	@Transactional
	public NoticeDto noticeUpdate(NoticeDto noticeDto) {
		Notice notice = noticeDto.toEntity();
        Notice updatedNotice = noticeRepository.save(notice);
        return NoticeDto.toDto(updatedNotice);
	}

	@Transactional
	public NoticeDto noticeDelete(Long id) {
		Notice notice = noticeRepository.findById(id).orElseThrow(() -> new RuntimeException("Notice not found"));
        noticeRepository.delete(notice);
        return NoticeDto.toDto(notice);
	}

	@Transactional
	public List<NoticeDto> findByTitle(String title) {
		List<Notice> notices = noticeRepository.findByTitleContaining(title);
        return notices.stream()
                      .map(NoticeDto::toDto)
                      .collect(Collectors.toList());
	}

	
}
