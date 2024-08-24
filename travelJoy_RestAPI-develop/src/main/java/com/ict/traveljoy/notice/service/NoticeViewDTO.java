package com.ict.traveljoy.notice.service;

import java.time.LocalDateTime;

import com.ict.traveljoy.notice.repository.Notice;
import com.ict.traveljoy.notice.repository.NoticeView;
import com.ict.traveljoy.notice.repository.ViewCount;
import com.ict.traveljoy.users.repository.Users;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NoticeViewDTO {

	private Long id;
	private Notice notice;
	private Users user;
	private ViewCount viewCount;
	private LocalDateTime viewDate;
	
	public NoticeView toEntity() {
		return NoticeView.builder()
				.id(id)
				.notice(notice)
				.user(user)
				.viewcount(viewCount)
				.viewDate(viewDate)
				.build();
	}
	
	public static NoticeViewDTO toDTO(NoticeView noticeView) {
		return NoticeViewDTO.builder()
				.id(noticeView.getId())
				.notice(noticeView.getNotice())
				.user(noticeView.getUser())
				.viewCount(noticeView.getViewcount())
				.viewDate(noticeView.getViewDate())
				.build();
	}
}
