package com.ict.traveljoy.tripReview.service;

import com.ict.traveljoy.plan.repository.Plan;
import com.ict.traveljoy.tripReview.repository.TripReview;
import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TripReviewDto {
    private Long id;
    private Plan plan;
    private String writer;
    private String title;
    private String reviewContent;
    private String url;
    private Timestamp postDate;
    private Boolean isActive;
    private Boolean isDelete;
    private Timestamp deleteDate;

    public TripReview toEntity() {

        return TripReview.builder()
        		.id(id)
                .plan(plan)
                .writer(writer)
                .title(title)
                .reviewContent(reviewContent)
                .url(url)
                .postDate(postDate)
                .isActive(isActive == null ? 0 : (isActive ? 1 : 0))
                .isDelete(isDelete == null ? 0 : (isDelete ? 1 : 0))
                .deleteDate(deleteDate)
                .build();
    }

    public static TripReviewDto toDto(TripReview tripReview) {
        return TripReviewDto.builder()
        		.id(tripReview.getId())
                .plan(tripReview.getPlan())
                .writer(tripReview.getWriter())
                .title(tripReview.getTitle())
                .reviewContent(tripReview.getReviewContent())
                .url(tripReview.getUrl())
                .postDate(tripReview.getPostDate())
                .isActive(tripReview.getIsActive() == 1 ? true : false)
                .isDelete(tripReview.getIsDelete() == 1 ? true : false)
                .deleteDate(tripReview.getDeleteDate())
                .build();
    }
}
