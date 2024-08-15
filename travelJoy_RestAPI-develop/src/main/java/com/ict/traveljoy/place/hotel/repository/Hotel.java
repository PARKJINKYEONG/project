package com.ict.traveljoy.place.hotel.repository;

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
@Getter
@Setter
@Builder
public class Hotel {
	@Id
	@SequenceGenerator(name = "seq_hotels",sequenceName = "seq_hotels",allocationSize = 1,initialValue = 1)
	@GeneratedValue(generator = "seq_hotels",strategy = GenerationType.SEQUENCE)
	@Column(name="hotel_id")
	private Long id;
	
	@ManyToOne
	@JoinColumn(name ="region_id", nullable = false)
	private Region region;
	
	@Column(name="is_has_image",nullable = false,columnDefinition = "NUMBER(1, 0)")
    @ColumnDefault("0")
    private Integer isHasImage;
	
	@Column(name="average_price", nullable = false)
	private Float averagePrice;
	
	@Column(name="hotel_name", length = 50, nullable = false)
	private String hotelName;
	
	@Column(name = "descriptions",length = 2000)
	private String descriptions;
	
	@Column(name="address", length=200, nullable = false)
	private String address;
	
	@Column(name = "lat")
	private Float lat;
	
	@Column(name = "lng")
    private Float lng;
	
	@Column(name = "TOTAL_REVIEW_COUNT")
	private Long totalReviewCount;
	
	@Column(name = "AVERAGE_REVIEW_RATE")
	private Float averageReviewRate;
	
	
}