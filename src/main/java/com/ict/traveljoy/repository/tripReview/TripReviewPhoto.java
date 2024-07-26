package com.ict.traveljoy.repository.tripReview;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "trip_review_photo")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TripReviewPhoto {

    @Id
    @SequenceGenerator(name = "seq_trip_review_photo",sequenceName = "seq_trip_review_photo",allocationSize = 1,initialValue = 1)
    @GeneratedValue(generator = "seq_trip_review_photo", strategy = GenerationType.SEQUENCE)
    @Column(name = "TRIP_REVIEW_PHOTO_ID")
    private Long tripReviewPhotoId;

    @Column(name = "TRIP_REVIEW_ID")
    private Long tripReviewId;

    @Column(name = "IMAGE_ID")
    private Long imageId;
}
