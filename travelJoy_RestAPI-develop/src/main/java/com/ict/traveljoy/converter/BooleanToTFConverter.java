package com.ict.traveljoy.converter;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class BooleanToTFConverter implements AttributeConverter<Boolean, String>{

	@Override
	public String convertToDatabaseColumn(Boolean attribute) {
		return (attribute != null && attribute) ? "T" : "F";
	}

	@Override
	public Boolean convertToEntityAttribute(String dbData) {
		return "T".equals(dbData);
	}
	
}
