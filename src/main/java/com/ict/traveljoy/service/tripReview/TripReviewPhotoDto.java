package com.ict.traveljoy.repository.tripReview;

import com.ict.traveljoy.repository.image.Image;

import com.ict.traveljoy.repository.tripReview.TripReview;
import com.ict.traveljoy.repository.tripReview.TripReviewPhoto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TripReviewPhotoDto {
    private Long tripReviewPhotoId;
    private Long tripReviewId;
    private Long imageId;

    public TripReviewPhoto toEntity() {
        TripReviewPhoto tripReviewPhoto = new TripReviewPhoto();
        tripReviewPhoto.setTripReviewPhotoId(tripReviewPhotoId);

        TripReview tripReview = new TripReview();
        tripReview.setTripReviewId(tripReviewId);
        tripReviewPhoto.setTripReview(tripReview);

        Image image = new Image();
        image.setImageId(imageId);
        tripReviewPhoto.setImage(image);

        return tripReviewPhoto;
    }

    public static TripReviewPhotoDto toDto(TripReviewPhoto tripReviewPhoto) {
        return TripReviewPhotoDto.builder()
                .tripReviewPhotoId(tripReviewPhoto.getTripReviewPhotoId())
                .tripReviewId(tripReviewPhoto.getTripReview().getTripReviewId())
                .imageId(tripReviewPhoto.getImage().getImageId())
                .build();
    }
}
