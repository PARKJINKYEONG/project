import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';

const AddressSearch = ({ onAddressSelect }) => {

  const [isLoaded, setIsLoaded]= useState(false);

  //에러 처리를 위함
  useEffect(()=>{
    const script= document.createElement('script'); // script태그를 동적으로 생성
    //script 태그에 외부 url을 src 속성에 설정
    script.src = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    //스크립트가 비동기적으로 로드되도록 설정
    //async는 다른 자바스크립트 실행과 독립적으로 이 스크립트가 로드되고 실행되게 만듬
    script.async = true;
    //스크립트가 성공적으로 로드되고 실행되면 호출되는 콜백함수 설정
    //완전히 로드된 후 setIsLoaded가 호출되며 로드 완료 상태를 업데이트 함
    script.onload =()=>setIsLoaded(true);
    //대부분의 경우 외부 스크립트는 body에 추가하는 것이 일반적
    document.body.appendChild(script);
  },[])

  const handleAddressSearch = () => {

    if(!isLoaded){
      alert("주소 검색 API가 아직 로드되지 않았습니다. 잠시 후 다시 시도해주세요");
      return;
    }

    new window.daum.Postcode({
      oncomplete: (data) => {
        let fullAddress = data.roadAddress;
        let extraAddress = '';

        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
          extraAddress += data.bname;
        }
        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraAddress += (extraAddress !== '' ? ', ' + data.buildingName : data.buildingName);
        }
        if (extraAddress !== '') {
          fullAddress += ' (' + extraAddress + ')';
        }

        onAddressSelect({
          fullAddress,
          zonecode: data.zonecode,
          extraAddress
        });
      },
    }).open();
  };

  return (
    <Button 
      variant="outlined" 
      onClick={handleAddressSearch} 
      style={{ width: '100px' }} // 버튼의 가로 길이를 120px로 조정
    >
      주소 검색
    </Button>
  );
};

export default AddressSearch;
