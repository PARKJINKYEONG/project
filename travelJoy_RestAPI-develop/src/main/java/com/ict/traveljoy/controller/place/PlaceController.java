package com.ict.traveljoy.controller.place;

import com.ict.traveljoy.place.event.service.EventService;
import com.ict.traveljoy.place.event.service.EventDTO;
import com.ict.traveljoy.place.food.service.FoodService;
import com.ict.traveljoy.place.food.service.FoodDTO;
import com.ict.traveljoy.place.hotel.service.HotelService;
import com.ict.traveljoy.place.hotel.service.HotelDTO;
import com.ict.traveljoy.place.placeInterest.service.PlaceInterestDTO;
import com.ict.traveljoy.place.placeInterest.service.PlaceInterestService;
import com.ict.traveljoy.place.region.service.RegionDTO;
import com.ict.traveljoy.place.region.service.RegionService;
import com.ict.traveljoy.place.regionWeather.service.RegionWeatherDTO;
import com.ict.traveljoy.place.regionWeather.service.RegionWeatherService;
import com.ict.traveljoy.place.sight.service.SightService;
import com.ict.traveljoy.place.sight.service.SightDTO;
import com.ict.traveljoy.place.transportation.service.TransportationService;
import com.ict.traveljoy.place.transportation.service.TransportationDTO;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity; 
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name="Place 관리", description = "이벤트, 식당, 숙박, 명소, 교통수단, 지역에 대한 CRUD.")
@RestController
@RequestMapping("/api/places")
public class PlaceController {

    @Autowired
    private EventService eventService;

    @Autowired
    private FoodService foodService;

    @Autowired
    private HotelService hotelService;

    @Autowired
    private SightService sightService;

    @Autowired
    private TransportationService transportationService;

    @Autowired
    private PlaceInterestService placeInterestService;

    @Autowired
    private RegionService regionService;

    @Autowired
    private RegionWeatherService regionWeatherService;

    // 이벤트 CRUD
    @PostMapping("/events/create")
    public ResponseEntity<EventDTO> createEvent(@RequestBody EventDTO eventDto) {
        try {
            EventDTO savedEvent = eventService.saveEvent(eventDto);
            return new ResponseEntity<>(savedEvent, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/events/all")
    public ResponseEntity<List<EventDTO>> getAllEvents() {
        try {
            List<EventDTO> events = eventService.findAllEvents();
            return new ResponseEntity<>(events, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/events/{id}")
    public ResponseEntity<EventDTO> getEventById(@PathVariable("id") Long id) {
        try {
            return eventService.findEventById(id)
                    .map(event -> new ResponseEntity<>(event, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 특정 지역의 이벤트 검색
    @GetMapping("/events/region/{regionId}")
    public ResponseEntity<List<EventDTO>> getEventsByRegionId(@PathVariable("regionId") Long regionId) {
        try {
            List<EventDTO> events = eventService.findEventsByRegionId(regionId);
            return new ResponseEntity<>(events, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 특정 리뷰 평점 이상의 이벤트 검색
    @GetMapping("/events/reviewRate/{rate}")
    public ResponseEntity<List<EventDTO>> getEventsByReviewRate(@PathVariable("rate") float reviewRate) {
        try {
            List<EventDTO> events = eventService.findEventsByReviewRate(reviewRate);
            return new ResponseEntity<>(events, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/events/{id}")
    public ResponseEntity<EventDTO> updateEvent(@PathVariable("id") Long id, @RequestBody EventDTO eventDto) {
        try {
            EventDTO updatedEvent = eventService.updateEvent(id, eventDto);
            return new ResponseEntity<>(updatedEvent, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/events/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable("id") Long id) {
        try {
            eventService.deleteEvent(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 음식 CRUD
    @PostMapping("/foods/create")
    public ResponseEntity<FoodDTO> createFood(@RequestBody FoodDTO foodDto) {
        try {
            FoodDTO savedFood = foodService.saveFood(foodDto);
            return new ResponseEntity<>(savedFood, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/foods/all")
    public ResponseEntity<List<FoodDTO>> getAllFoods() {
        try {
            List<FoodDTO> foods = foodService.findAllFoods();
            return new ResponseEntity<>(foods, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/foods/{id}")
    public ResponseEntity<FoodDTO> getFoodById(@PathVariable("id") Long id) {
        try {
            return foodService.findFoodById(id)
                    .map(food -> new ResponseEntity<>(food, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 특정 지역의 음식 검색
    @GetMapping("/foods/region/{regionId}")
    public ResponseEntity<List<FoodDTO>> getFoodsByRegionId(@PathVariable Long regionId) {
        List<FoodDTO> foods = foodService.findFoodsByRegionId(regionId);
        return ResponseEntity.ok(foods);
    }

    // 음식 이름으로 검색
    @GetMapping("/foods/name/{foodName}")
    public ResponseEntity<List<FoodDTO>> getFoodsByName(@PathVariable String foodName) {
        try {
            List<FoodDTO> foods = foodService.findFoodsByName(foodName);
            return new ResponseEntity<>(foods, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 특정 가격 이하의 음식 검색
    @GetMapping("/foods/price/{maxPrice}")
    public ResponseEntity<List<FoodDTO>> getFoodsByPrice(@PathVariable float maxPrice) {
        try {
            List<FoodDTO> foods = foodService.findFoodsByPrice(maxPrice);
            return new ResponseEntity<>(foods, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 특정 리뷰 평점 이상의 음식 검색
    @GetMapping("/foods/reviewRate/{rate}")
    public ResponseEntity<List<FoodDTO>> getFoodsByReviewRate(@PathVariable("rate") float reviewRate) {
        try {
            List<FoodDTO> foods = foodService.findFoodsByReviewRate(reviewRate);
            return new ResponseEntity<>(foods, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/foods/{id}")
    public ResponseEntity<FoodDTO> updateFood(@PathVariable("id") Long id, @RequestBody FoodDTO foodDto) {
        try {
            FoodDTO updatedFood = foodService.updateFood(id, foodDto);
            return new ResponseEntity<>(updatedFood, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/foods/{id}")
    public ResponseEntity<Void> deleteFood(@PathVariable("id") Long id) {
        try {
            foodService.deleteFood(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 숙소 CRUD
    @PostMapping("/hotels/create")
    public ResponseEntity<HotelDTO> createHotel(@RequestBody HotelDTO hotelDto) {
        try {
            HotelDTO savedHotel = hotelService.saveHotel(hotelDto);
            return new ResponseEntity<>(savedHotel, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/hotels/all")
    public ResponseEntity<List<HotelDTO>> getAllHotels() {
        try {
            List<HotelDTO> hotels = hotelService.findAllHotels();
            return new ResponseEntity<>(hotels, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/hotels/{id}")
    public ResponseEntity<HotelDTO> getHotelById(@PathVariable("id") Long id) {
        try {
            return hotelService.findHotelById(id)
                    .map(hotel -> new ResponseEntity<>(hotel, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 특정 지역의 숙소 검색
    @GetMapping("/hotels/region/{regionId}")
    public ResponseEntity<List<HotelDTO>> getHotelsByRegionId(@PathVariable("regionId") Long regionId) {
        try {
            List<HotelDTO> hotels = hotelService.findHotelsByRegionId(regionId);
            return new ResponseEntity<>(hotels, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 숙소 이름으로 검색
    @GetMapping("/hotels/name/{hotelName}")
    public ResponseEntity<List<HotelDTO>> getHotelsByName(@PathVariable("hotelName") String hotelName) {
        try {
            List<HotelDTO> hotels = hotelService.findHotelsByName(hotelName);
            return new ResponseEntity<>(hotels, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 리뷰 많은순으로 검색
    @GetMapping("/hotels/reviewCount/{reviewCount}")
    public ResponseEntity<List<HotelDTO>> getHotelsByReviewCount(@PathVariable("reviewCount") Long reviewCount) {
        try {
            List<HotelDTO> hotels = hotelService.findHotelsByReviewCount(reviewCount);
            return new ResponseEntity<>(hotels, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 리뷰 평점 이상의 숙소 검색
    @GetMapping("/hotels/reviewRate/{reviewRate}")
    public ResponseEntity<List<HotelDTO>> getHotelsByReviewRate(@PathVariable("reviewRate") float reviewRate) {
        try {
            List<HotelDTO> hotels = hotelService.findHotelsByReviewRate(reviewRate);
            return new ResponseEntity<>(hotels, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/hotels/{id}")
    public ResponseEntity<HotelDTO> updateHotel(@PathVariable("id") Long id, @RequestBody HotelDTO hotelDto) {
        try {
            HotelDTO updatedHotel = hotelService.updateHotel(id, hotelDto);
            return new ResponseEntity<>(updatedHotel, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/hotels/{id}")
    public ResponseEntity<Void> deleteHotel(@PathVariable("id") Long id) {
        try {
            hotelService.deleteHotel(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 명소 CRUD
    @PostMapping("/sights/create")
    public ResponseEntity<SightDTO> createSight(@RequestBody SightDTO sightDto) {
        try {
            SightDTO savedSight = sightService.saveSight(sightDto);
            return new ResponseEntity<>(savedSight, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/sights/all")
    public ResponseEntity<List<SightDTO>> getAllSights() {
        try {
            List<SightDTO> sights = sightService.findAllSights();
            return new ResponseEntity<>(sights, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/sights/{id}")
    public ResponseEntity<SightDTO> getSightById(@PathVariable("id") Long id) {
        try {
            return sightService.findSightById(id)
                    .map(sight -> new ResponseEntity<>(sight, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 특정 지역의 명소 검색
    @GetMapping("/sights/region/{regionId}")
    public ResponseEntity<List<SightDTO>> getSightsByRegionId(@PathVariable("regionId") Long regionId) {
        try {
            List<SightDTO> sights = sightService.findSightsByRegionId(regionId);
            return new ResponseEntity<>(sights, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 명소 이름으로 검색
    @GetMapping("/sights/name/{sightName}")
    public ResponseEntity<List<SightDTO>> getSightsByName(@PathVariable("sightName") String sightName) {
        try {
            List<SightDTO> sights = sightService.findSightsByName(sightName);
            return new ResponseEntity<>(sights, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 특정 리뷰 평점 이상의 명소 검색
    @GetMapping("/sights/reviewRate/{rate}")
    public ResponseEntity<List<SightDTO>> getSightsByReviewRate(@PathVariable("rate") float reviewRate) {
        try {
            List<SightDTO> sights = sightService.findSightsByReviewRate(reviewRate);
            return new ResponseEntity<>(sights, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/sights/{id}")
    public ResponseEntity<SightDTO> updateSight(@PathVariable("id") Long id, @RequestBody SightDTO sightDto) {
        try {
            SightDTO updatedSight = sightService.updateSight(id, sightDto);
            return new ResponseEntity<>(updatedSight, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/sights/{id}")
    public ResponseEntity<Void> deleteSight(@PathVariable("id") Long id) {
        try {
            sightService.deleteSight(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 교통수단 CRUD
    @PostMapping("/transportations/create")
    public ResponseEntity<TransportationDTO> createTransportation(@RequestBody TransportationDTO transportationDto) {
        try {
            TransportationDTO savedTransportation = transportationService.saveTransportation(transportationDto);
            return new ResponseEntity<>(savedTransportation, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/transportations/all")
    public ResponseEntity<List<TransportationDTO>> getAllTransportations() {
        try {
            List<TransportationDTO> transportations = transportationService.findAllTransportations();
            return new ResponseEntity<>(transportations, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/transportations/{id}")
    public ResponseEntity<TransportationDTO> getTransportationById(@PathVariable("id") Long id) {
        try {
            return transportationService.findTransportationById(id)
                    .map(transportation -> new ResponseEntity<>(transportation, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 교통수단 검색 - 버스
    @GetMapping("/transportations/bus/{isBus}")
    public ResponseEntity<List<TransportationDTO>> getTransportationsByIsBus(@PathVariable("isBus") boolean isBus) {
        try {
            List<TransportationDTO> transportations = transportationService.findTransportationsByIsBus(isBus);
            return new ResponseEntity<>(transportations, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 교통수단 검색 - 기차
    @GetMapping("/transportations/train/{isTrain}")
    public ResponseEntity<List<TransportationDTO>> getTransportationsByIsTrain(@PathVariable("isTrain") boolean isTrain) {
        try {
            List<TransportationDTO> transportations = transportationService.findTransportationsByIsTrain(isTrain);
            return new ResponseEntity<>(transportations, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 교통수단 검색 - 비행기
    @GetMapping("/transportations/airplane/{isAirplane}")
    public ResponseEntity<List<TransportationDTO>> getTransportationsByIsAirplane(@PathVariable("isAirplane") boolean isAirplane) {
        try {
            List<TransportationDTO> transportations = transportationService.findTransportationsByIsAirplane(isAirplane);
            return new ResponseEntity<>(transportations, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 교통수단 검색 - 운전
    @GetMapping("/transportations/drive/{isDrive}")
    public ResponseEntity<List<TransportationDTO>> getTransportationsByIsDrive(@PathVariable("isDrive") boolean isDrive) {
        try {
            List<TransportationDTO> transportations = transportationService.findTransportationsByIsDrive(isDrive);
            return new ResponseEntity<>(transportations, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    // 특정 기간 내의 교통수단 검색
//    @GetMapping("/transportations/dateRange")
//    public ResponseEntity<List<TransportationDTO>> getTransportationsByDateRange(
//            @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
//            @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
//        try {
//            List<TransportationDTO> transportations = transportationService.findTransportationsByDateRange(startDate, endDate);
//            return new ResponseEntity<>(transportations, HttpStatus.OK);
//        } catch (Exception e) {
//            e.printStackTrace();
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

//    // 가격 범위 내의 교통수단 검색
//    @GetMapping("/transportations/priceRange")
//    public ResponseEntity<List<TransportationDTO>> getTransportationsByPriceRange(
//            @RequestParam("minPrice") float minPrice,
//            @RequestParam("maxPrice") float maxPrice) {
//        try {
//            List<TransportationDTO> transportations = transportationService.findTransportationsByPrice(minPrice, maxPrice);
//            return new ResponseEntity<>(transportations, HttpStatus.OK);
//        } catch (Exception e) {
//            e.printStackTrace();
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

    @PutMapping("/transportations/{id}")
    public ResponseEntity<TransportationDTO> updateTransportation(@PathVariable("id") Long id, @RequestBody TransportationDTO transportationDto) {
        try {
            TransportationDTO updatedTransportation = transportationService.updateTransportation(id, transportationDto);
            return new ResponseEntity<>(updatedTransportation, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/transportations/{id}")
    public ResponseEntity<Void> deleteTransportation(@PathVariable("id") Long id) {
        try {
            transportationService.deleteTransportation(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    // PlaceInterest CRUD
    @PostMapping("/placeInterests/create")
    public ResponseEntity<PlaceInterestDTO> createPlaceInterest(@RequestBody PlaceInterestDTO placeInterestDto) {
        try {
            PlaceInterestDTO savedPlaceInterest = placeInterestService.savePlaceInterest(placeInterestDto);
            return new ResponseEntity<>(savedPlaceInterest, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/placeInterests/all")
    public ResponseEntity<List<PlaceInterestDTO>> getAllPlaceInterests() {
        try {
            List<PlaceInterestDTO> placeInterests = placeInterestService.getAllPlaceInterests();
            return new ResponseEntity<>(placeInterests, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/placeInterests/{id}")
    public ResponseEntity<PlaceInterestDTO> getPlaceInterestById(@PathVariable("id") Long id) {
        try {
            return placeInterestService.getPlaceInterestById(id)
                    .map(placeInterest -> new ResponseEntity<>(placeInterest, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/placeInterests/{id}")
    public ResponseEntity<PlaceInterestDTO> updatePlaceInterest(@PathVariable("id") Long id, @RequestBody PlaceInterestDTO placeInterestDto) {
        try {
            PlaceInterestDTO updatedPlaceInterest = placeInterestService.savePlaceInterest(placeInterestDto);
            return new ResponseEntity<>(updatedPlaceInterest, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/placeInterests/{id}")
    public ResponseEntity<Void> deletePlaceInterest(@PathVariable("id") Long id) {
        try {
            placeInterestService.deletePlaceInterestById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    // Region CRUD
    @PostMapping("/regions/create")
    public ResponseEntity<RegionDTO> createRegion(@RequestBody RegionDTO regionDto) {
        try {
            RegionDTO savedRegion = regionService.saveRegion(regionDto);
            return new ResponseEntity<>(savedRegion, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/regions/all")
    public ResponseEntity<List<RegionDTO>> getAllRegions() {
        try {
            List<RegionDTO> regions = regionService.getAllRegion();
            return new ResponseEntity<>(regions, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/regions/{id}")
    public ResponseEntity<RegionDTO> getRegionById(@PathVariable("id") Long id) {
        try {
            return regionService.getRegionById(id)
                    .map(region -> new ResponseEntity<>(region, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/regions/{id}")
    public ResponseEntity<RegionDTO> updateRegion(@PathVariable("id") Long id, @RequestBody RegionDTO regionDto) {
        try {
            RegionDTO updatedRegion = regionService.updateRegion(id, regionDto);
            return new ResponseEntity<>(updatedRegion, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/regions/{id}")
    public ResponseEntity<Void> deleteRegion(@PathVariable("id") Long id) {
        try {
            regionService.deleteRegion(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/regionWeathers/create")
    public ResponseEntity<RegionWeatherDTO> createRegionWeather(@RequestBody RegionWeatherDTO regionWeatherDto) {
        try {
            RegionWeatherDTO savedRegionWeather = regionWeatherService.saveRegionWeather(regionWeatherDto);
            return new ResponseEntity<>(savedRegionWeather, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/regionWeathers/all")
    public ResponseEntity<List<RegionWeatherDTO>> getAllRegionWeathers() {
        try {
            List<RegionWeatherDTO> regionWeathers = regionWeatherService.findAllRegionWeathers();
            return new ResponseEntity<>(regionWeathers, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/regionWeathers/{id}")
    public ResponseEntity<RegionWeatherDTO> getRegionWeatherById(@PathVariable("id") Long id) {
        try {
            return regionWeatherService.findRegionWeatherById(id)
                    .map(regionWeather -> new ResponseEntity<>(regionWeather, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/regionWeathers/{id}")
    public ResponseEntity<RegionWeatherDTO> updateRegionWeather(@PathVariable("id") Long id, @RequestBody RegionWeatherDTO regionWeatherDto) {
        try {
            RegionWeatherDTO updatedRegionWeather = regionWeatherService.saveRegionWeather(regionWeatherDto);
            return new ResponseEntity<>(updatedRegionWeather, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/regionWeathers/{id}")
    public ResponseEntity<Void> deleteRegionWeather(@PathVariable("id") Long id) {
        try {
            regionWeatherService.deleteRegionWeather(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}