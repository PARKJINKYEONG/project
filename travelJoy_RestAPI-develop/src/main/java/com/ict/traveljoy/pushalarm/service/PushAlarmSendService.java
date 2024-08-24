package com.ict.traveljoy.pushalarm.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ict.traveljoy.pushalarm.repository.PushAlarm;
import com.ict.traveljoy.pushalarm.repository.PushAlarmRepository;
import com.ict.traveljoy.pushalarm.repository.PushAlarmSend;
import com.ict.traveljoy.pushalarm.repository.PushAlarmSendRepository;
import com.ict.traveljoy.users.repository.UserRepository;
import com.ict.traveljoy.users.repository.Users;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class PushAlarmSendService {

	private final PushAlarmSendRepository pushAlarmSendRepository;
    private final PushAlarmRepository pushAlarmRepository;
    private final UserRepository userRepository;

    // 새로운 PushAlarmSend를 저장하는 메서드
    public PushAlarmSendDTO savePushAlarmSend(PushAlarmSendDTO dto) {
        PushAlarm pushAlarm = pushAlarmRepository.findById(dto.getPushAlarm().getId())
                .orElseThrow(() -> new IllegalArgumentException("해당 푸시 알림을 찾을 수 없습니다: " + dto.getPushAlarm().getId()));
        Users user = userRepository.findById(dto.getUser().getId())
                .orElseThrow(() -> new IllegalArgumentException("해당 유저를 찾을 수 없습니다: " + dto.getUser().getId()));

        PushAlarmSend pushAlarmSend = dto.toEntity();
        pushAlarmSend.setPushAlarm(pushAlarm);
        pushAlarmSend.setUser(user);

        PushAlarmSend savedPushAlarmSend = pushAlarmSendRepository.save(pushAlarmSend);
        return PushAlarmSendDTO.toDTO(savedPushAlarmSend);
    }

    // ID로 특정 PushAlarmSend를 조회하는 메서드
    public PushAlarmSendDTO findById(Long id) {
        Optional<PushAlarmSend> pushAlarmSends = pushAlarmSendRepository.findById(id);
        return pushAlarmSends.map(pushAlarmSend->PushAlarmSendDTO.toDTO(pushAlarmSend))
                .orElseThrow(() -> new IllegalArgumentException("해당 ID로 푸시 알림 전송을 찾을 수 없습니다: " + id));
    }

    // 모든 PushAlarmSend를 조회하는 메서드
    public List<PushAlarmSendDTO> findAll() {
        List<PushAlarmSend> pushAlarmSends = pushAlarmSendRepository.findAll();
        return pushAlarmSends.stream()
                .map(pushAlarmSend->PushAlarmSendDTO.toDTO(pushAlarmSend))
                .collect(Collectors.toList());
    }

    // 특정 PushAlarmSend를 삭제하는 메서드
    public void deleteById(Long id) {
        if (!pushAlarmSendRepository.existsById(id)) {
            throw new IllegalArgumentException("해당 ID로 푸시 알림 전송을 찾을 수 없습니다: " + id);
        }
        pushAlarmSendRepository.deleteById(id);
    }
}
