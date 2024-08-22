import React from 'react';

// 컴포넌트의 스타일을 props로 전달 받거나, 컴포넌트 내부에서 정의할 수 있습니다.
const tdStyle = {
  // 여기에 td 스타일을 정의하세요.
  borderBottom: "1px solid #ddd",
  padding: "8px",
  textAlign: "left",
  cursur:'pointer'
};

const UserComponent = ({ row, onClick }) => {
  return (
    <tr key={row.no} onClick={() => onClick(row.no)} style={{ cursor: 'pointer' }}>
      <td style={tdStyle}>{row.no}</td>
      <td style={tdStyle}>{row.category}</td>
      <td style={tdStyle}>{row.title}</td>
      <td style={tdStyle}>{row.date}</td>
    </tr>
    
    
    
  );
};

export default UserComponent;
