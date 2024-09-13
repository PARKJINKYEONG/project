import React, { useState } from 'react';
import DescriptionPlan from './descriptionPlan';
import ProgressPlan2 from './progressPlan2';
import ProgressPlan3 from './progressPlan3';
import ProgressPlan4 from './progressPlan4';
import { Box } from '@mui/material';

function ContentComponent({ activeStep, handlePlaceClick, selectedPlaces, setSelectedPlaces }) {

  // 장소를 추가하는 함수
  const addSelectedPlace = (place) => {
    setSelectedPlaces((prevSelected) => [...prevSelected, place]);
  };

  // 장소를 제거하는 함수
  const removeSelectedPlace = (placeToRemove) => {
    setSelectedPlaces((prevSelected) =>
      prevSelected.filter((place) => place.id !== placeToRemove.id)
    );
  };

  const renderStepComponent = () => {
    switch (activeStep) {
      case 0:
        return <DescriptionPlan />;
      case 1:
        return (
          <ProgressPlan2
            handlePlaceClick={handlePlaceClick}
            selectedPlaces={selectedPlaces}
            onAddPlace={addSelectedPlace}
            onRemovePlace={removeSelectedPlace}
          />
        );
      case 2:
        return <ProgressPlan3 handlePlaceClick={handlePlaceClick} />;
      case 3:
        return <ProgressPlan4 handlePlaceClick={handlePlaceClick} />;
      default:
        return <></>;
    }
  };

  return (
    <Box sx={{ marginLeft: '13px', marginTop: '15px' }}>
      {renderStepComponent()}
    </Box>
  );
}

export default ContentComponent;
