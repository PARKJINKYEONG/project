//피그마에 보면 있는 일정생성 앞부분에 단계별 설명넣을거
import React, { useState } from 'react';
import { Box, stepConnectorClasses } from '@mui/material';



const items = [

{
  id : 1,
  title : '1단계 : 어디로 떠나고 싶으세요?',
  content : '가고싶은 위치의 정보를 입력해주세요!'
},
{
  id : 2,
  title : '2단계 : 어디에서 무엇을 먹고싶으세요?',
  content : '원하는 관광지와, 음식을 선택해주세요!'
},
{
  id : 3,
  title : '3단계 : 어디에서 머물고 싶은가요?',
  content : '검색 조건에 따라 숙소를 골라주세요!'
},
{
  id : 4,
  title : '4단계 : AI 일정보기',
  content : '선택하신 비슷한 경로로 AI가 추천을 해줍니다!'

},
{
  id : 5,
  title : '5단계 : 최종 일정보기',
  content : '생성된 일정의 결과를 만날 수 있어요!'

}

];


export default function DescriptionPlan(){




  return<>
  <h1>설명</h1>
        <div>
          {items.map(item =>(
            <div key={item.id}>
              <div>
                <h3>{item.title}</h3>
                <span>{item.content}</span>
              </div>
            </div>

          ))}
        </div>


        </>




};
