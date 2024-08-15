package com.ict.traveljoy.feedback.service;

import com.ict.traveljoy.feedback.repository.Feedback;
import com.ict.traveljoy.plan.repository.Plan;

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
public class FeedbackDTO {
    private Long id;
    private Plan plan; 
    private String owner;
    private Integer rate;
    
    public Feedback toEntity() {
    	
    	return Feedback.builder()
    			.id(id)
    			.plan(plan)
    			.owner(owner)
    			.rate(rate)
    			.build();
    }
    
    public static FeedbackDTO toDto(Feedback feedback) {
        return FeedbackDTO.builder()
        		.id(feedback.getId())
        		.plan(feedback.getPlan())
        		.owner(feedback.getOwner())
        		.rate(feedback.getRate())
        		.build();
    }
}
