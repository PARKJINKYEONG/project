package com.ict.traveljoy.pushalarm.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ict.traveljoy.pushalarm.service.PushAlarmSendDTO;
import com.ict.traveljoy.pushalarm.service.PushAlarmSendService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/pushalarm/send")
@RequiredArgsConstructor
public class PushAlarmSendController {

    private PushAlarmSendService pushAlarmSendService;

    @PostMapping
    public PushAlarmSendDTO createPushAlarmSend(@RequestBody PushAlarmSendDTO dto) {
        return pushAlarmSendService.savePushAlarmSend(dto);
    }

    @GetMapping("/{id}")
    public PushAlarmSendDTO getPushAlarmSendById(@PathVariable Long id) {
        return pushAlarmSendService.findById(id);
    }

    @GetMapping
    public List<PushAlarmSendDTO> getAllPushAlarmSends() {
        return pushAlarmSendService.findAll();
    }

    @DeleteMapping("/{id}")
    public void deletePushAlarmSend(@PathVariable Long id) {
        pushAlarmSendService.deleteById(id);
    }
}
