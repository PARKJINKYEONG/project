package com.ict.traveljoy.place.hotel.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.ict.traveljoy.place.hotel.repository.Hotel;
import com.ict.traveljoy.place.hotel.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



import jakarta.transaction.Transactional;

@Service
@Transactional
public class HotelService {

    @Autowired
    private HotelRepository hotelRepository;

    //모든 숙소 검색
    public List<HotelDTO> findAllHotels() {
        return hotelRepository.findAll().stream()
                .map(HotelDTO::toDto)
                .collect(Collectors.toList());
    }

	//ID로 숙소 검색
    public Optional<HotelDTO> findHotelById(Long id) {
        return hotelRepository.findById(id)
                .map(HotelDTO::toDto);
    }

    //숙소 저장
    @Transactional
    public HotelDTO saveHotel(HotelDTO hotelDTO) {
        if (hotelDTO.getHotelname().isEmpty()) {
            throw new IllegalArgumentException("숙소 이름이 비어있어요");
        }
        Hotel hotel = hotelDTO.toEntity();
        hotel = hotelRepository.save(hotel);
        return HotelDTO.toDto(hotel);
    }
    
    //숙소 수정
    @Transactional
    public HotelDTO updateHotel(Long id, HotelDTO hotelDTO) {
        Optional<Hotel> hotelOpt = hotelRepository.findById(id);

        if (hotelOpt.isPresent()) {
        	Hotel hotel = hotelOpt.get();
        	hotel.setHotelName(hotelDTO.getHotelname());
            hotel.setDescriptions(hotelDTO.getDescriptions());
            hotel.setAddress(hotelDTO.getAddress());
            hotel.setRegion(hotelDTO.getRegion());
            hotel.setAveragePrice(hotelDTO.getAveragePrice());
            hotel.setTotalReviewCount(hotelDTO.getTotalReviewCount());
            hotel.setAverageReviewRate(hotelDTO.getAverageReviewRate());
            
            Hotel updatedHotel = hotelRepository.save(hotel);
            return HotelDTO.toDto(updatedHotel);
        } else {
            throw new IllegalArgumentException("주어진 번호의 숙소를 찾을 수 없어요");
        }
    }

    //숙소 삭제
    @Transactional
    public void deleteHotel(Long id) {
    	if(hotelRepository.existsById(id)) {
        hotelRepository.deleteById(id);
    } else {
    		throw new IllegalArgumentException("주어진 번호의 숙소를 찾을 수 없어요");
    	}
    }
    
    //특정 지역의 숙소 검색
    public List<HotelDTO> findHotelsByRegionId(Long regionId) {
        return hotelRepository.findByRegion_Id(regionId).stream()
                .map(HotelDTO::toDto)
                .collect(Collectors.toList());
    }
    
    // 숙소 이름으로 검색
    public List<HotelDTO> findHotelsByName(String hotelName) {
        return hotelRepository.findByHotelName(hotelName).stream()
                .map(HotelDTO::toDto)
                .collect(Collectors.toList());
    }

    //특정 가격대의 숙소 검색
    public List<HotelDTO> findHotelsByPriceRange(float minPrice, float maxPrice) {
        return hotelRepository.findByAveragePriceBetween(minPrice, maxPrice).stream()
                .map(HotelDTO::toDto)
                .collect(Collectors.toList());
    }

    
    //리뷰 많은순으로 검색
    public List<HotelDTO> findHotelsByReviewCount(Long reviewCount) {
        return hotelRepository.findByTotalReviewCountGreaterThanEqual(reviewCount).stream()
                .map(HotelDTO::toDto)
                .collect(Collectors.toList());
    }

    //리뷰 평점 이상의 숙소 검색
    public List<HotelDTO> findHotelsByReviewRate(float reviewRate) {
        return hotelRepository.findByAverageReviewRateGreaterThanEqual(reviewRate).stream()
                .map(HotelDTO::toDto)
                .collect(Collectors.toList());
    }
}