package com.ict.traveljoy.pushalarm.service;

import java.time.LocalDateTime;

import com.ict.traveljoy.pushalarm.repository.PushAlarm;

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
public class PushAlarmDTO {
	
	private Long id;
	private String title;
	private String pushAlarmContent;
	private Boolean isActive;
	private Boolean isDelete;
	private LocalDateTime deleteDate;
	
	public PushAlarm toEntity() {
		return PushAlarm.builder()
				.id(id)
				.title(title)
				.pushAlarmContent(pushAlarmContent)
				.isActive(isActive!=null && isActive ? 1 : 0)
				.isDelete(isDelete!=null && isDelete ? 1 : 0)
				.deleteDate(deleteDate)
				.build();
	}
	
	public static PushAlarmDTO toDTO(PushAlarm pushAlarm) {
		return PushAlarmDTO.builder()
				.id(pushAlarm.getId())
				.title(pushAlarm.getTitle())
				.pushAlarmContent(pushAlarm.getPushAlarmContent())
				.isActive(pushAlarm.getIsActive()!=null &&pushAlarm.getIsActive() == 1 ? true : false)
				.isDelete(pushAlarm.getIsDelete()!=null &&pushAlarm.getIsDelete() == 1 ? true : false)
				.deleteDate(pushAlarm.getDeleteDate())
				.build();
	}
}
