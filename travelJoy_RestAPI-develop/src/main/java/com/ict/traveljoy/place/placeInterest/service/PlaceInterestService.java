package com.ict.traveljoy.place.placeInterest.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ict.traveljoy.place.placeInterest.repository.PlaceInterest;
import com.ict.traveljoy.place.placeInterest.repository.PlaceInterestRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class PlaceInterestService {

    @Autowired
    private PlaceInterestRepository placeInterestRepository;

    // PlaceInterest 생성 또는 업데이트
    public PlaceInterestDTO savePlaceInterest(PlaceInterestDTO placeInterestDTO) {
        PlaceInterest placeInterest = placeInterestDTO.toEntity();
        placeInterest = placeInterestRepository.save(placeInterest);
        return PlaceInterestDTO.toDto(placeInterest);
    }

    // ID로 PlaceInterest 조회
    public Optional<PlaceInterestDTO> getPlaceInterestById(Long id) {
        return placeInterestRepository.findById(id)
                .map(placeInterest -> PlaceInterestDTO.toDto(placeInterest));
    }

    // 모든 PlaceInterest 조회
    public List<PlaceInterestDTO> getAllPlaceInterests() {
        return placeInterestRepository.findAll().stream()
                .map(placeInterest -> PlaceInterestDTO.toDto(placeInterest))
                .collect(Collectors.toList());
    }

    // ID로 PlaceInterest 삭제
    public void deletePlaceInterestById(Long id) {
        if (placeInterestRepository.existsById(id)) {
            placeInterestRepository.deleteById(id);
        } 
        else {
            throw new IllegalArgumentException("해당 ID로 PlaceInterest를 찾을 수 없습니다: " + id);
        }
    }
}
