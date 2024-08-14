import { useState } from 'react';
import Dropdown from './dropdown';
import { Box, Button, Typography } from '@mui/material';

export default function AddSpeciality() {
  const [allergyVal, setAllergyVal] = useState('');
  const [handicapVal, setHandicapVal] = useState('');
  const [allergies, setAllergies] = useState({});
  const [handicaps, setHandicaps] = useState({});

  const handleAllergyChange = (event) => {
    const targetVal = event.target.value;
    if (!allergies[targetVal]) {
      setAllergyVal(targetVal);
      setAllergies({ ...allergies, [targetVal]: true });
    }
  };

  const handleHandicapChange = (event) => {
    const targetVal = event.target.value;
    if (!handicaps[targetVal]) {
      setHandicapVal(targetVal);
      setHandicaps({ ...handicaps, [targetVal]: true });
    }
  };

  const handleRemoveAllergy = (allergy) => {
    const updatedAllergies = { ...allergies };
    delete updatedAllergies[allergy];
    setAllergies(updatedAllergies);
  };

  const handleRemoveHandicap = (handicap) => {
    const updatedHandicaps = { ...handicaps };
    delete updatedHandicaps[handicap];
    setHandicaps(updatedHandicaps);
  };

  const allergyitems = ["진드기", "고양이털", "강아지털", "복숭아", "땅콩", "소고기", "호두"];
  const handicapitems = ["다리", "팔", "청각", "시각"];

  return (
    <>
      <Dropdown
        dropVal={allergyVal}
        items={allergyitems}
        uplabel="알레르기"
        handleChange={handleAllergyChange}
        underlabel="알레르기 질환을 추가해주세요"
      />

      <Dropdown
        dropVal={handicapVal}
        items={handicapitems}
        uplabel="장애"
        handleChange={handleHandicapChange}
        underlabel="장애 종류를 추가해주세요"
      />
      <Box sx={{
            minWidth: '200px',
            minHeight: '200px',
            border: '1px solid gray',
            borderRadius: 1,
            padding: 1,
            my: 3
          }}>
      {Object.keys(allergies).map((allergy, index) => (
        <Box 
          key={index} 
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: '1px solid gray',
            borderRadius: 1,
            p: 1,
            mb: 1
          }}
        >
          <Typography variant="h6">{allergy}</Typography>
          <Button
            variant="contained"
            color="info"
            onClick={() => handleRemoveAllergy(allergy)}
          >
            제거
          </Button>
        </Box>
      ))}
      </Box>
      <Box sx={{
            minWidth: '200px',
            minHeight: '200px',
            border: '1px solid gray',
            borderRadius: 1,
            padding: 1,
            my: 3
          }}>
      {Object.keys(handicaps).map((handicap, index) => (
        <Box 
          key={index} 
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: '1px solid gray',
            borderRadius: 1,
            p: 1,
            mb: 1
          }}
        >
          <Typography variant="h6">{handicap}</Typography>
          <Button
            variant="contained"
            color="info"
            onClick={() => handleRemoveHandicap(handicap)}
          >
            제거
          </Button>
        </Box>
      ))}
      </Box>
    </>
  );
}
