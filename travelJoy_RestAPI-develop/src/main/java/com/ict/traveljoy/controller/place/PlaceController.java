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
@RequestMapping("/places")
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
    @PostMapping("/events")
    public ResponseEntity<EventDTO> createEvent(@RequestBody EventDTO eventDto) {
        try {
            EventDTO savedEvent = eventService.saveEvent(eventDto);
            return new ResponseEntity<>(savedEvent, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/events")
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
    public ResponseEntity<EventDTO> getEventById(@PathVariable Long id) {
        try {
            return eventService.findEventById(id)
                    .map(event -> new ResponseEntity<>(event, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/events/{id}")
    public ResponseEntity<EventDTO> updateEvent(@PathVariable Long id, @RequestBody EventDTO eventDto) {
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
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
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
    @PostMapping("/foods")
    public ResponseEntity<FoodDTO> createFood(@RequestBody FoodDTO foodDto) {
        try {
            FoodDTO savedFood = foodService.saveFood(foodDto);
            return new ResponseEntity<>(savedFood, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/foods")
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
    public ResponseEntity<FoodDTO> getFoodById(@PathVariable Long id) {
        try {
            return foodService.findFoodById(id)
                    .map(food -> new ResponseEntity<>(food, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/foods/{id}")
    public ResponseEntity<FoodDTO> updateFood(@PathVariable Long id, @RequestBody FoodDTO foodDto) {
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
    public ResponseEntity<Void> deleteFood(@PathVariable Long id) {
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
    @PostMapping("/hotels")
    public ResponseEntity<HotelDTO> createHotel(@RequestBody HotelDTO hotelDto) {
        try {
            HotelDTO savedHotel = hotelService.saveHotel(hotelDto);
            return new ResponseEntity<>(savedHotel, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/hotels")
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
    public ResponseEntity<HotelDTO> getHotelById(@PathVariable Long id) {
        try {
            return hotelService.findHotelById(id)
                    .map(hotel -> new ResponseEntity<>(hotel, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/hotels/{id}")
    public ResponseEntity<HotelDTO> updateHotel(@PathVariable Long id, @RequestBody HotelDTO hotelDto) {
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
    public ResponseEntity<Void> deleteHotel(@PathVariable Long id) {
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
    @PostMapping("/sights")
    public ResponseEntity<SightDTO> createSight(@RequestBody SightDTO sightDto) {
        try {
            SightDTO savedSight = sightService.saveSight(sightDto);
            return new ResponseEntity<>(savedSight, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/sights")
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
    public ResponseEntity<SightDTO> getSightById(@PathVariable Long id) {
        try {
            return sightService.findSightById(id)
                    .map(sight -> new ResponseEntity<>(sight, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/sights/{id}")
    public ResponseEntity<SightDTO> updateSight(@PathVariable Long id, @RequestBody SightDTO sightDto) {
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
    public ResponseEntity<Void> deleteSight(@PathVariable Long id) {
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
    @PostMapping("/transportations")
    public ResponseEntity<TransportationDTO> createTransportation(@RequestBody TransportationDTO transportationDto) {
        try {
            TransportationDTO savedTransportation = transportationService.saveTransportation(transportationDto);
            return new ResponseEntity<>(savedTransportation, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/transportations")
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
    public ResponseEntity<TransportationDTO> getTransportationById(@PathVariable Long id) {
        try {
            return transportationService.findTransportationById(id)
                    .map(transportation -> new ResponseEntity<>(transportation, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/transportations/{id}")
    public ResponseEntity<TransportationDTO> updateTransportation(@PathVariable Long id, @RequestBody TransportationDTO transportationDto) {
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
    public ResponseEntity<Void> deleteTransportation(@PathVariable Long id) {
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
    @PostMapping("/placeInterests")
    public ResponseEntity<PlaceInterestDTO> createPlaceInterest(@RequestBody PlaceInterestDTO placeInterestDto) {
        try {
            PlaceInterestDTO savedPlaceInterest = placeInterestService.savePlaceInterest(placeInterestDto);
            return new ResponseEntity<>(savedPlaceInterest, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/placeInterests")
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
    public ResponseEntity<PlaceInterestDTO> getPlaceInterestById(@PathVariable Long id) {
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
    public ResponseEntity<PlaceInterestDTO> updatePlaceInterest(@PathVariable Long id, @RequestBody PlaceInterestDTO placeInterestDto) {
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
    public ResponseEntity<Void> deletePlaceInterest(@PathVariable Long id) {
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
    @PostMapping("/regions")
    public ResponseEntity<RegionDTO> createRegion(@RequestBody RegionDTO regionDto) {
        try {
            RegionDTO savedRegion = regionService.saveRegion(regionDto);
            return new ResponseEntity<>(savedRegion, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/regions")
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
    public ResponseEntity<RegionDTO> getRegionById(@PathVariable Long id) {
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
    public ResponseEntity<RegionDTO> updateRegion(@PathVariable Long id, @RequestBody RegionDTO regionDto) {
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
    public ResponseEntity<Void> deleteRegion(@PathVariable Long id) {
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

    @PostMapping("/regionWeathers")
    public ResponseEntity<RegionWeatherDTO> createRegionWeather(@RequestBody RegionWeatherDTO regionWeatherDto) {
        try {
            RegionWeatherDTO savedRegionWeather = regionWeatherService.saveRegionWeather(regionWeatherDto);
            return new ResponseEntity<>(savedRegionWeather, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/regionWeathers")
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
    public ResponseEntity<RegionWeatherDTO> getRegionWeatherById(@PathVariable Long id) {
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
    public ResponseEntity<RegionWeatherDTO> updateRegionWeather(@PathVariable Long id, @RequestBody RegionWeatherDTO regionWeatherDto) {
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
    public ResponseEntity<Void> deleteRegionWeather(@PathVariable Long id) {
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