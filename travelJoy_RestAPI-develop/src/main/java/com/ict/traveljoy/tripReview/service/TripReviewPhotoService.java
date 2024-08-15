package com.ict.traveljoy.tripReview.service;

import com.ict.traveljoy.image.repository.Image;
import com.ict.traveljoy.image.repository.ImageRepository;
import com.ict.traveljoy.tripReview.repository.TripReviewPhoto;
import com.ict.traveljoy.tripReview.repository.TripReviewPhotoRepository;
import com.ict.traveljoy.tripReview.repository.TripReview;
import com.ict.traveljoy.tripReview.repository.TripReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TripReviewPhotoService {

    private final TripReviewPhotoRepository tripReviewPhotoRepository;
    private final ImageRepository imageRepository;
    private final TripReviewRepository tripReviewRepository;

    @Autowired
    public TripReviewPhotoService(TripReviewPhotoRepository tripReviewPhotoRepository, ImageRepository imageRepository, TripReviewRepository tripReviewRepository) {
        this.tripReviewPhotoRepository = tripReviewPhotoRepository;
        this.imageRepository = imageRepository;
        this.tripReviewRepository = tripReviewRepository;
    }

    public List<TripReviewPhotoDto> getPhotosByReviewId(Long tripReviewId) {
        List<TripReviewPhoto> tripReviewPhotos = tripReviewPhotoRepository.findByTripReviewId(tripReviewId);
        return tripReviewPhotos.stream()
                .map(TripReviewPhotoDto::toDto)
                .collect(Collectors.toList());
    }

    public List<TripReviewPhotoDto> getPhotosByImageId(Long imageId) {
        List<TripReviewPhoto> tripReviewPhotos = tripReviewPhotoRepository.findByImageId(imageId);
        return tripReviewPhotos.stream()
                .map(TripReviewPhotoDto::toDto)
                .collect(Collectors.toList());
    }

    public TripReviewPhotoDto getPhotoByTripReviewIdAndImageId(Long tripReviewId, Long imageId) {
        Optional<TripReviewPhoto> tripReviewPhotoOpt = tripReviewPhotoRepository.findByTripReviewIdAndImageId(tripReviewId, imageId);
        return tripReviewPhotoOpt.map(TripReviewPhotoDto::toDto).orElse(null);
    }

    public TripReviewPhotoDto getPhotoById(Long tripReviewPhotoId) {
        Optional<TripReviewPhoto> tripReviewPhotoOpt = tripReviewPhotoRepository.findById(tripReviewPhotoId);
        return tripReviewPhotoOpt.map(TripReviewPhotoDto::toDto).orElse(null);
    }

    public TripReviewPhotoDto addPhotoToReview(Long reviewId, TripReviewPhotoDto tripReviewPhotoDto) {
        TripReviewPhoto tripReviewPhoto = tripReviewPhotoDto.toEntity();

        TripReview tripReview = tripReviewRepository.findById(reviewId)
                .orElseThrow(() -> new IllegalArgumentException("TripReview with ID " + reviewId + " does not exist."));
        tripReviewPhoto.setTripReview(tripReview);

        Image image = imageRepository.findById(tripReviewPhotoDto.getImage().getId())
                .orElseThrow(() -> new IllegalArgumentException("Image with ID " + tripReviewPhotoDto.getImage().getId() + " does not exist."));
        tripReviewPhoto.setImage(image);

        TripReviewPhoto savedTripReviewPhoto = tripReviewPhotoRepository.save(tripReviewPhoto);
        return TripReviewPhotoDto.toDto(savedTripReviewPhoto);
    }

    public void deletePhoto(Long photoId) {
        tripReviewPhotoRepository.deleteById(photoId);
    }
}
