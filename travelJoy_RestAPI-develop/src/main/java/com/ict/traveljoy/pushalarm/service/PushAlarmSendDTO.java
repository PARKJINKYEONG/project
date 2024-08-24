package com.ict.traveljoy.pushalarm.service;

import java.time.LocalDateTime;

import com.ict.traveljoy.pushalarm.repository.PushAlarm;
import com.ict.traveljoy.pushalarm.repository.PushAlarmSend;
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
public class PushAlarmSendDTO {

	private Long id;
	private PushAlarm pushAlarm;
	private Users user;
	private LocalDateTime pushAlarmSendDate;
	
	public PushAlarmSend toEntity() {
		return PushAlarmSend.builder()
				.id(id)
				.pushAlarm(pushAlarm)
				.user(user)
				.pushAlarmSendDate(pushAlarmSendDate)
				.build();
	}
	
	public static PushAlarmSendDTO toDTO(PushAlarmSend pushAlarmSend) {
		return PushAlarmSendDTO.builder()
				.id(pushAlarmSend.getId())
				.pushAlarm(pushAlarmSend.getPushAlarm())
				.user(pushAlarmSend.getUser())
				.pushAlarmSendDate(pushAlarmSend.getPushAlarmSendDate())
				.build();
	}
}
