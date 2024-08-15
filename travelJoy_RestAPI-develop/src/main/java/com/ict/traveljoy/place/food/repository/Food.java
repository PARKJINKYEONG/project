package com.ict.traveljoy.place.food.repository;

import org.hibernate.annotations.ColumnDefault;

import com.ict.traveljoy.place.region.repository.Region;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Builder
public class Food {
	@Id
	@SequenceGenerator(name = "seq_foods" ,sequenceName = "seq_foods", allocationSize = 1, initialValue = 1)
	@GeneratedValue(generator = "seq_foods", strategy = GenerationType.SEQUENCE )
	@Column(name = "food_id")
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "region_id",nullable = false)
	private Region region;
	
	@Column(name = "food_type", length = 50)
	private String foodType;
	
	@Column(name = "is_has_image",nullable = false,columnDefinition = "NUMBER(1, 0)")
    @ColumnDefault("0")
    private Integer isHasImage;
	
	@Column(name="average_price")
	private Float averagePrice;
	
	@Column(name="food_name",length = 50)
	private String foodName;
	
	@Column(length = 2000)
	private String descriptions;
	
	@Column(length = 200)
	private String address;
	
	@Column
	private Float lat;
	
	@Column
	private Float lng;
	
	@Column(name = "total_review_count")
	private Long totalReviewCount;
	
	@Column(name = "average_review_rate")
	private Float averageReviewRate;
}