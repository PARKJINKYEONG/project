package com.ict.traveljoy.pushalarm.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ict.traveljoy.pushalarm.service.PushAlarmDTO;
import com.ict.traveljoy.pushalarm.service.PushAlarmService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/pushalarm")
@RequiredArgsConstructor
public class PushAlarmController {

    private PushAlarmService pushAlarmService;

    @PostMapping
    public PushAlarmDTO createPushAlarm(@RequestBody PushAlarmDTO dto) {
        return pushAlarmService.savePushAlarm(dto);
    }

    @GetMapping("/{id}")
    public PushAlarmDTO getPushAlarmById(@PathVariable Long id) {
        return pushAlarmService.findById(id);
    }

    @GetMapping
    public List<PushAlarmDTO> getAllPushAlarms() {
        return pushAlarmService.findAll();
    }

    @PutMapping("/{id}")
    public PushAlarmDTO updatePushAlarm(@PathVariable Long id, @RequestBody PushAlarmDTO dto) {
        return pushAlarmService.updatePushAlarm(id, dto);
    }

    @DeleteMapping("/{id}")
    public void deletePushAlarm(@PathVariable Long id) {
        pushAlarmService.deleteById(id);
    }
}