import React, { useState } from 'react';

// SortButton 컴포넌트: 클릭 시 오름차순/내림차순 정렬을 변경하는 역할을 합니다.
const SortButton = ({ column, sortConfig, onSort }) => {
  const { key, direction } = sortConfig;

  const handleSort = () => {
    let newDirection;

    if (key === column) {
      newDirection = direction === 'asc' ? 'desc' : 'asc';
    } else {
      newDirection = 'asc';
    }

    onSort({ key: column, direction: newDirection });
  };

  return (
    <button onClick={handleSort}>
      {key === column && direction === 'asc' && '▲'}
      {key === column && direction === 'desc' && '▼'}
      {key !== column && '≡'}
    </button>
  );
};

// Table 컴포넌트: 테이블과 정렬 기능을 포함합니다.
const Table = ({ data }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleSort = (sortConfig) => {
    setSortConfig(sortConfig);
  };

  const sortedData = React.useMemo(() => {
    if (sortConfig.key) {
      return [...data].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return data;
  }, [data, sortConfig]);
}

export default SortButton;