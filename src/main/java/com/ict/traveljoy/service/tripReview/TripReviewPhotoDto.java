package com.ict.traveljoy.service.tripReview;



import com.ict.traveljoy.repository.tripReview.TripReviewPhoto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TripReviewPhotoDto {
	private long tripReviewPhotoId;
	private long tripReviewId;
	private long imageId;
	
	public TripReviewPhoto toEntity() {
		return TripReviewPhoto.builder()
				.imageId(imageId)
				.tripReviewId(tripReviewId)
				.imageId(imageId)
				.build();
	}
	
	public static TripReviewPhotoDto toDto(TripReviewPhoto trp) {
		return TripReviewPhotoDto.builder()
				.imageId(trp.getImageId())
				.tripReviewId(trp.getTripReviewId())
				.imageId(trp.getImageId())
				.build();
	}
}
