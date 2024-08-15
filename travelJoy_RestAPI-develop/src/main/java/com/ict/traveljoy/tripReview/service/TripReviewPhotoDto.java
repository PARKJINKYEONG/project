package com.ict.traveljoy.tripReview.service;

import com.ict.traveljoy.image.repository.Image;
import com.ict.traveljoy.tripReview.repository.TripReview;
import com.ict.traveljoy.tripReview.repository.TripReviewPhoto;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TripReviewPhotoDto {
    private Long id;
    private TripReview tripReview;
    private Image image;

    public TripReviewPhoto toEntity() {

        return TripReviewPhoto.builder()
                .id(id)
                .tripReview(tripReview)
                .image(image)
                .build();
    }

    public static TripReviewPhotoDto toDto(TripReviewPhoto tripReviewPhoto) {

        return TripReviewPhotoDto.builder()
        		.id(tripReviewPhoto.getId())
        		.tripReview(tripReviewPhoto.getTripReview())
        		.image(tripReviewPhoto.getImage())
        		.build();
    }

    
}
