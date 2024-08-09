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
    private Long tripReviewPhotoId;
    private Long tripReviewId;
    private Long imageId;
    private String imageUrl;

    // TripReviewPhoto 엔티티를 TripReviewPhotoDto로 변환
    public static TripReviewPhotoDto toDto(TripReviewPhoto tripReviewPhoto) {
        if (tripReviewPhoto == null) {
            return null;
        }
        TripReviewPhotoDto dto = new TripReviewPhotoDto();
        dto.setTripReviewPhotoId(tripReviewPhoto.getTripReviewPhotoId());
        dto.setTripReviewId(tripReviewPhoto.getTripReview().getTripReviewId());
        dto.setImageId(tripReviewPhoto.getImage().getId()); 
        dto.setImageUrl(tripReviewPhoto.getImage().getImageUrl()); 
        return dto;
    }

    // TripReviewPhotoDto를 TripReviewPhoto 엔티티로 변환
    public TripReviewPhoto toEntity() {
        TripReview tripReview = TripReview.builder()
                .tripReviewId(tripReviewId)
                .build();

        Image image = Image.builder()
                .id(imageId)
                .build();

        return TripReviewPhoto.builder()
                .tripReviewPhotoId(tripReviewPhotoId)
                .tripReview(tripReview)
                .image(image)
                .build();
    }
}
