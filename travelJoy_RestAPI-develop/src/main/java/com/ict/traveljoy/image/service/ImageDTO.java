package com.ict.traveljoy.image.service;


import java.time.LocalDateTime;

import com.ict.traveljoy.image.repository.Image;

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
public class ImageDTO {
	
	private Long id;
	private String imageUrl;
	private LocalDateTime saveDate;
	private Boolean isActive;
	private Boolean isDelete;
	private LocalDateTime deleteDate;
	
	public Image toImage() {
		return Image.builder()
				.id(id)
				.imageUrl(imageUrl)
				.saveDate(saveDate)
				.isActive(isActive == true ? 1 : 0)
				.isDelete(isDelete == true ? 1 : 0)
				.deleteDate(deleteDate)
				.build();
	}
	
	public static ImageDTO toDTO(Image image) {
		return ImageDTO.builder()
				.id(image.getId())
				.imageUrl(image.getImageUrl())
				.saveDate(image.getSaveDate())
				.isActive(image.getIsActive()== 1 ? true : false)
				.isDelete(image.getIsDelete()== 1 ? true : false)
				.deleteDate(image.getDeleteDate())
				.build();
	}

}
