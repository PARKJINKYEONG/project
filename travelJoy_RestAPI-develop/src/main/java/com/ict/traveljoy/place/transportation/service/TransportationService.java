package com.ict.traveljoy.place.transportation.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.ict.traveljoy.place.transportation.repository.Transportation;
import com.ict.traveljoy.place.transportation.repository.TransportationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class TransportationService {

    @Autowired
    private TransportationRepository transportationRepository;

    // 모든 교통수단 정보 검색
    public List<TransportationDTO> findAllTransportations() {
        return transportationRepository.findAll().stream()
                .map(TransportationDTO::toDto)
                .collect(Collectors.toList());
    }

    // ID로 교통수단 정보 검색
    public Optional<TransportationDTO> findTransportationById(Long id) {
        return transportationRepository.findById(id)
                .map(TransportationDTO::toDto);
    }

    // 교통수단 정보 저장
    public TransportationDTO saveTransportation(TransportationDTO transportationDto) {
        // 데이터 유효성 검증
        if (transportationDto.getStartDate() == null) {
            throw new IllegalArgumentException("출발 날짜는 비어있으면 안돼요");
        }
        // 다른 필수 필드 검증 추가 가능

        Transportation transportation = transportationDto.toEntity();
        transportation = transportationRepository.save(transportation);
        return TransportationDTO.toDto(transportation);
    }

    // 교통수단 정보 수정
    @Transactional
    public TransportationDTO updateTransportation(Long id, TransportationDTO transportationDTO) {
        Optional<Transportation> transportationOpt = transportationRepository.findById(id);

        if (transportationOpt.isPresent()) {
            Transportation transportation = transportationOpt.get();
            transportation.setStartAddress(transportationDTO.getStartAddress());
            transportation.setEndAddress(transportationDTO.getEndAddress());
            transportation.setStartDate(transportationDTO.getStartDate());
            transportation.setEndDate(transportationDTO.getEndDate());
            transportation.setStartLat(transportationDTO.getStartLat());
            transportation.setStartLng(transportationDTO.getStartLng());
            transportation.setEndLat(transportationDTO.getEndLat());
            transportation.setEndLng(transportationDTO.getEndLng());
            transportation.setIsAirplane(transportationDTO.getIsAirplane());
            transportation.setIsBus(transportationDTO.getIsBus());
            transportation.setIsDrive(transportationDTO.getIsDrive());
            transportation.setIsTrain(transportationDTO.getIsTrain());
            transportation.setIsWalk(transportationDTO.getIsWalk());
            transportation.setPrice(transportationDTO.getPrice());

            Transportation updatedTransportation = transportationRepository.save(transportation);
            return TransportationDTO.toDto(updatedTransportation);
        } else {
            throw new IllegalArgumentException("주어진 번호의 교통수단 정보를 찾을 수 없어요");
        }
    }

    // ID로 교통수단 정보 삭제
    public void deleteTransportation(Long id) {
        if (transportationRepository.existsById(id)) {
            transportationRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("주어진 번호의 교통수단 정보를 찾을 수 없어요");
        }
    }

    // 이동 유형에 따른 검색
    public List<TransportationDTO> findTransportationsByIsBus(boolean isBus) {
        return transportationRepository.findByIsBus(isBus).stream()
                .map(TransportationDTO::toDto)
                .collect(Collectors.toList());
    }

    public List<TransportationDTO> findTransportationsByIsTrain(boolean isTrain) {
        return transportationRepository.findByIsTrain(isTrain).stream()
                .map(TransportationDTO::toDto)
                .collect(Collectors.toList());
    }

    public List<TransportationDTO> findTransportationsByIsAirplane(boolean isAirplane) {
        return transportationRepository.findByIsAirplane(isAirplane).stream()
                .map(TransportationDTO::toDto)
                .collect(Collectors.toList());
    }

    public List<TransportationDTO> findTransportationsByIsDrive(boolean isDrive) {
        return transportationRepository.findByIsDrive(isDrive).stream()
                .map(TransportationDTO::toDto)
                .collect(Collectors.toList());
    }

    // 특정 기간 내의 교통수단 검색
    public List<TransportationDTO> findTransportationsByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return transportationRepository.findByStartDateBetween(startDate, endDate).stream()
                .map(TransportationDTO::toDto)
                .collect(Collectors.toList());
    }

    // 가격 범위 내의 교통수단 검색
    public List<TransportationDTO> findTransportationsByPrice(float minPrice, float maxPrice) {
        return transportationRepository.findByPriceBetween(minPrice, maxPrice).stream()
                .map(TransportationDTO::toDto)
                .collect(Collectors.toList());
    }
}