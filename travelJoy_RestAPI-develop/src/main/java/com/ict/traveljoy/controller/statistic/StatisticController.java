package com.ict.traveljoy.controller.statistic;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.HashMap;
import java.util.Map;
import java.util.Arrays;
import java.util.List;

@Tag(name = "통계 관리", description = "통계 Rest Api 컨트롤러입니다")
@RestController
@RequestMapping("/statistics")
public class StatisticController {

    private List<Long> dailyCounts = Arrays.asList(30L, 50L, 30L, 60L, 70L, 90L, 100L);

    @CrossOrigin
    @GetMapping("/dailyVisitor")
    @Operation(summary = "유저 수 조회하기", description = "유저 수 조회 컨트롤러입니다")
    public ResponseEntity<Map<String, Object>> getUserCount() {
        try {
            Long todayCount = dailyCounts.get(dailyCounts.size() - 1);  // 오늘의 방문자 수
            Map<String, Object> response = new HashMap<>();
            response.put("todayCount", todayCount);
            response.put("dailyCount", dailyCounts);
            System.out.println("Response data: " + response); // 데이터를 반환하기 전에 로그 확인
            return ResponseEntity.ok(response);
        } 
        catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    private List<Long> monthlyCounts = Arrays.asList(900L, 1500L, 900L, 1800L, 2100L, 2700L, 3000L, 3000L, 2700L, 2300L, 1900L, 1200L);

    @CrossOrigin 
    @GetMapping("/monthlyVisitor")
    @Operation(summary = "월간 유저 수 조회하기", description = "월간 유저 수 조회 컨트롤러입니다")
    public ResponseEntity<Map<String, Object>> getMonthlyUserCount() {
        try {
            Map<String, Object> response = new HashMap<>();
            response.put("monthlyCount", monthlyCounts);
            return ResponseEntity.ok(response);
        } 
        catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    private List<Map<String, Object>> popularPackages = Arrays.asList(
            Map.of("id", 0, "value", 22, "label", "오키나와", "color", "cyan"),
            Map.of("id", 1, "value", 31, "label", "하와이", "color", "blue"),
            Map.of("id", 2, "value", 23, "label", "로마", "color", "black"),
            Map.of("id", 3, "value", 45, "label", "파리", "color", "yellow"),
            Map.of("id", 4, "value", 32, "label", "뉴욕", "color", "lightblue"),
            Map.of("id", 5, "value", 40, "label", "런던", "color", "green"),
            Map.of("id", 6, "value", 60, "label", "기타", "color", "red")
    );

    @CrossOrigin  // 모든 도메인에서 오는 요청을 허용
    @GetMapping("/popularPackages")
    @Operation(summary = "인기 패키지 조회하기", description = "인기 패키지 조회 컨트롤러입니다")
    public ResponseEntity<List<Map<String, Object>>> getPopularPackages() {
        try {
            return ResponseEntity.ok(popularPackages);
        } 
        catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    private List<Map<String, Object>> searchKeywords = Arrays.asList(
            Map.of("id", 0, "value", 22, "label", "레저", "color", "cyan"),
            Map.of("id", 1, "value", 31, "label", "일본", "color", "blue"),
            Map.of("id", 2, "value", 23, "label", "호텔", "color", "black"),
            Map.of("id", 3, "value", 45, "label", "이탈리아", "color", "yellow"),
            Map.of("id", 4, "value", 32, "label", "미국", "color", "lightblue"),
            Map.of("id", 5, "value", 40, "label", "영국", "color", "green"),
            Map.of("id", 6, "value", 60, "label", "기타", "color", "red")
    );

    @CrossOrigin  // 모든 도메인에서 오는 요청을 허용
    @GetMapping("/searchKeywords")
    @Operation(summary = "검색어 조회하기", description = "검색어 조회 컨트롤러입니다")
    public ResponseEntity<List<Map<String, Object>>> getSearchKeywords() {
        try {
            return ResponseEntity.ok(searchKeywords);
        } 
        catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    private List<Map<String, Object>> alertTimes = Arrays.asList(
            Map.of("id", 0, "value", 22, "label", "10분", "color", "cyan"),
            Map.of("id", 1, "value", 31, "label", "1시간", "color", "blue"),
            Map.of("id", 2, "value", 23, "label", "2시간", "color", "black"),
            Map.of("id", 3, "value", 45, "label", "1주일", "color", "yellow"),
            Map.of("id", 4, "value", 32, "label", "3일", "color", "lightblue"),
            Map.of("id", 5, "value", 40, "label", "1주일", "color", "green"),
            Map.of("id", 6, "value", 60, "label", "기타", "color", "red")
    );

    private List<Map<String, Object>> alertKeywords = Arrays.asList(
            Map.of("id", 0, "value", 18, "label", "18", "color", "cyan"),
            Map.of("id", 1, "value", 25, "label", "개새끼", "color", "blue"),
            Map.of("id", 2, "value", 15, "label", "소새끼", "color", "black"),
            Map.of("id", 3, "value", 10, "label", "말새끼", "color", "yellow"),
            Map.of("id", 4, "value", 5, "label", "기타", "color", "red")
    );

    @CrossOrigin
    @GetMapping("/alertTimes")
    @Operation(summary = "신고 처리시간 조회하기", description = "신고 처리시간 조회 컨트롤러입니다")
    public ResponseEntity<List<Map<String, Object>>> getAlertTimes() {
        try {
            return ResponseEntity.ok(alertTimes);
        } 
        catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @CrossOrigin
    @GetMapping("/alertKeywords")
    @Operation(summary = "신고 키워드 조회하기", description = "신고 키워드 조회 컨트롤러입니다")
    public ResponseEntity<List<Map<String, Object>>> getAlertKeywords() {
        try {
            return ResponseEntity.ok(alertKeywords);
        } 
        catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
