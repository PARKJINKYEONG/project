package com.ict.traveljoy.pushalarm.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ict.traveljoy.pushalarm.repository.PushAlarm;
import com.ict.traveljoy.pushalarm.repository.PushAlarmRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class PushAlarmService {

	 private final PushAlarmRepository pushAlarmRepository;

	    // 새로운 PushAlarm을 저장하는 메서드
	    public PushAlarmDTO savePushAlarm(PushAlarmDTO dto) {
	        PushAlarm pushAlarm = dto.toEntity();
	        PushAlarm savedPushAlarm = pushAlarmRepository.save(pushAlarm);
	        return PushAlarmDTO.toDTO(savedPushAlarm);
	    }

	    // ID로 특정 PushAlarm을 조회하는 메서드
	    public PushAlarmDTO findById(Long id) {
	        Optional<PushAlarm> pushAlarms = pushAlarmRepository.findById(id);
	        return pushAlarms.map(pushAlarm->PushAlarmDTO.toDTO(pushAlarm))
	                .orElseThrow(() -> new IllegalArgumentException("해당 ID로 푸시 알림을 찾을 수 없습니다: " + id));
	    }

	    // 모든 PushAlarm을 조회하는 메서드
	    public List<PushAlarmDTO> findAll() {
	        List<PushAlarm> pushAlarms = pushAlarmRepository.findAll();
	        return pushAlarms.stream()
	                .map(pushAlarm->PushAlarmDTO.toDTO(pushAlarm))
	                .collect(Collectors.toList());
	    }

	    // 특정 PushAlarm을 삭제하는 메서드
	    public void deleteById(Long id) {
	        if (!pushAlarmRepository.existsById(id)) {
	            throw new IllegalArgumentException("해당 ID로 푸시 알림을 찾을 수 없습니다: " + id);
	        }
	        pushAlarmRepository.deleteById(id);
	    }

	    // 특정 PushAlarm을 업데이트하는 메서드
	    public PushAlarmDTO updatePushAlarm(Long id, PushAlarmDTO dto) {
	        PushAlarm existingEntity = pushAlarmRepository.findById(id)
	                .orElseThrow(() -> new IllegalArgumentException("해당 ID로 푸시 알림을 찾을 수 없습니다: " + id));

	        existingEntity.setTitle(dto.getTitle());
	        existingEntity.setPushAlarmContent(dto.getPushAlarmContent());
	        existingEntity.setIsActive(dto.getIsActive() != null && dto.getIsActive() ? 1 : 0);
	        existingEntity.setIsDelete(dto.getIsDelete() != null && dto.getIsDelete() ? 1 : 0);

	        PushAlarm updatedEntity = pushAlarmRepository.save(existingEntity);
	        return PushAlarmDTO.toDTO(updatedEntity);
	    }
}
