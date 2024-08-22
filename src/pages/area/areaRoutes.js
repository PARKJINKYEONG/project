import React from 'react';
import AreaPage from './areaPage';
import AreaSearch  from './areaSearch';

export default function MainLayout() {
  return (
    <div style={{ display: 'flex' }}>
      {/* 좌측 내비게이션 바 */}
      <div style={{ width: '240px', flexShrink: 0 }}>
        <AreaPage />
      </div>

      {/* 우측 메인 콘텐츠 */}
      <div style={{ flexGrow: 1, padding: '16px' }}>
        <AreaSearch />
        {/* 이곳에 추가적인 콘텐츠를 넣을 수 있음 */}
      </div>
    </div>
  );
}