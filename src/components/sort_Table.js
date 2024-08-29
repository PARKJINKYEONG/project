import React, { useState } from 'react';

const SortIcon = () => {
  return (<img style={{
    backgroundImage: 'url(/images/sort.png)',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    width: '20px',
    height: '20px'}} alt=""/>)
};

// SortButton 컴포넌트: 클릭 시 오름차순/내림차순 정렬을 변경하는 역할을 합니다.
const SortButton = ({ data, onSort }) => {
  const [sortOrder, setSortOrder] = useState(null); // 정렬 상태

  const handleSort = () => {
    let newSortOrder;

    // 정렬 방향 결정
    if (sortOrder === 'asc') {
      newSortOrder = 'desc';
    } else {
      newSortOrder = 'asc';
    }

    // 정렬된 데이터를 부모 컴포넌트에 전달
    const sortedData = [...data].sort((a, b) => {
      if (newSortOrder === 'asc') {
        return a.age - b.age; // 숫자 오름차순
      } else {
        return b.age - a.age; // 숫자 내림차순
      }
    });

    setSortOrder(newSortOrder);
    onSort(sortedData); // 부모 컴포넌트에 정렬된 데이터 전달
  };

  return (
    <button onClick={handleSort}>
      <SortIcon/>
      {sortOrder === 'asc' && '▲'}
      {sortOrder === 'desc' && '▼'}
    </button>
  );
};

export default SortButton;