import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import { ListComponent } from './listComponent';
import { Outlet } from 'react-router-dom';

const drawerWidth = 240;

export default function AreaPage() {
  const listNames = ['해외관광', '국내관광', '인기관광'];
  const listLinks = ['plan', 'myreview', 'bookmark'];
  const listNames2 = ['숙박업소', ' AI 추천맛집', '크롤링추천 맛집', '교통'];
  const listLinks2 = ['profile', 'reportAndInqueiryList', 'memberInfoEdit', 'alarmDetail'];

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          zIndex: 2,
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <ListComponent listNames={listNames} listLinks={listLinks} />
          <Divider />
          <ListComponent listNames={listNames2} listLinks={listLinks2} />
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
