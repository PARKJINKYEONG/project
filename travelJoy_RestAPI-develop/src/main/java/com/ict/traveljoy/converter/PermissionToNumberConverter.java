package com.ict.traveljoy.converter;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class PermissionToNumberConverter implements AttributeConverter<String, Integer> {

	@Override
	public Integer convertToDatabaseColumn(String attribute) {
		if (attribute != null && attribute.equals("Admin"))
            return 1;
		return 0;
	}

	@Override
	public String convertToEntityAttribute(Integer dbData) {
        if (dbData == 1)
                return "Admin";
        return "User";
	}
	
}
