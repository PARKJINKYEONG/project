import React, { useEffect, useReducer, useState } from 'react';
import StepperComponent from './stepperComponent';
import ContentComponent from './contentComponent';
import { useLocation, useNavigate } from 'react-router-dom';
import MapComponent from './mapComponent';
import styles from '../../styles/plan/createPlan/createPlan.module.css'; 
import SlidingPanel from './slidingPanel';
import ProgressPlan5 from './progressPlan5';

  // 더미 데이터
  const plan = [
    {
      day: 1,
      contents: [
        {
          index: 1,
          title: "경주역",
          time: "2024-09-11 08:11",
          lat: 35.798365,
          lng: 129.138955,
          activity: '도착',
        },
        {
          index: 2,
          title: "동궁과월지",
          time: "2024-09-11 08:11",
          lat: 35.83486297292989,
          lng: 129.22651290893555,
          activity: '환승',
        },
      ]
    },
    {
      day: 2,
      contents: [
        {
          index: 1,
          title: "경주교촌마을",
          time: "2024-09-11 08:11",
          lat: 35.829574442841206,
          lng: 129.21475410461426,
          activity: '아침',
        },
        {
          index: 2,
          title: "선덕여왕릉",
          time: "2024-09-11 08:11",
          lat: 35.82358962844781,
          lng: 129.24230575561523,
          activity: '관광',
        },
      ]
    },
    {
      day: 3,
      contents: [
        {
          index: 1,
          title: "경주월드",
          time: "2024-09-11 08:11",
          lat: 35.836324215142085,
          lng: 129.28298950195312,
          activity: '관광',
        },
      ]
    }
  ];

const planReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PLAN':
      return [...state, action.payload];
    case 'UPDATE_PLAN':
      return state.map(plan => 
        plan.day === action.payload.day ? action.payload : plan
      );
    case 'REMOVE_PLAN':
      return state.filter(plan => plan.day !== action.payload.day);
    default:
      return state;
  }
};

function CreatePlan() {
  const [activeStep, setActiveStep] = useState(0); // 현재 단계 상태 관리  
  const [isPanelOpen, setIsPanelOpen] = useState(false); 
  const [selectedPlaces, setSelectedPlaces] = useState([]); 
  
  const navigate = useNavigate();
  const location = useLocation();

  const [plans, dispatchPlans] = useReducer(planReducer, plan);

  useEffect(() => {
    console.log(selectedPlaces);
  }, [selectedPlaces]);

  useEffect(() => {
    if (location.state && location.state.step) {
      setActiveStep(location.state.step);  // 전달된 단계로 이동
    }
  }, [location]); //PlanListView에서 수정시 각 단계로 이동할때 쓰려는 훅함수

  useEffect(() => {
    // activeStep이 1, 2, 3일 때만 패널을 열 수 있게 설정
    if (activeStep >= 1 && activeStep < 3) {
      setIsPanelOpen(true); // 특정 단계에서는 패널이 자동으로 열리게 설정
    } else {
      setIsPanelOpen(false); // 그 외 단계에서는 패널이 닫히도록 설정
    }
  }, [activeStep]);

  const handleButtonClick = () => {
    if (activeStep === 5) {
      navigate('/'); // Home으로 이동
    } else {
      handleNext(); // 다음 단계로 이동
    }
  };

  // 다음 단계로 이동
  const handleNext = () => {
    setActiveStep((prevStep) => Math.min(prevStep + 1, 5));
  };
  
  //원하는 단계로 이동
  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handlePlaceClick = (place) => {
    setIsPanelOpen(true);
    setSelectedPlaces([...selectedPlaces, place]);
  };

  const handleClosePanel = () => {
    console.log("Close panel triggered");
    setIsPanelOpen(false);
  };

  const handleShowPanel = (show) => {
    setIsPanelOpen(show);
  };

  const handleRemovePlace = (placeToRemove) => {
    setSelectedPlaces((prevSelected) =>
      prevSelected.filter((place) => place.id !== placeToRemove.id)
    );
  };

  return (  
      <div className={styles.customContainer}>
        {/* 좌측 Stepper */}
        <div className={styles.planController}>
          <StepperComponent 
            activeStep={activeStep} 
            handleStep={handleStep} 
            handleButtonClick={handleButtonClick} 
          />
        </div>

        {/* 가운데 Content */}

        <div className={activeStep === 0 ? styles.planFullContainer 
              : activeStep==3 ? styles.progress4planContainer 
              : activeStep==4 ? styles.hiddenplanContainer
              : styles.planContainer}>
          {activeStep <3 && (
          <ContentComponent  activeStep={activeStep}  handlePlaceClick={handlePlaceClick} onShowPanel={handleShowPanel}
          selectedPlaces={selectedPlaces} setSelectedPlaces={setSelectedPlaces}
          onRemovePlace={handleRemovePlace}  />
          )}
        </div>

        {/* 우측 지도 */}
        {activeStep >= 1 && activeStep <= 3 ? (
        <div className={styles.mapContainer}>
          <MapComponent />{/* 지도 컴포넌트를 여기에 렌더링 */}
        </div>
        ): activeStep == 4 &&(
          <div className={styles.resultContainer}>
            <ProgressPlan5 planItems={plans}/>
            </div>
        )}

        <SlidingPanel 
        isOpen={isPanelOpen} 
        onClose={handleClosePanel} 
        selectedPlaces={selectedPlaces}
        onRemovePlace={handleRemovePlace}
        />
      </div>      
  );
}

export default CreatePlan;
