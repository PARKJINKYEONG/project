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
  const listNames2 = ['숙박업소'];
  const listLinks2 = ['hotelSearch'];
  const listNames3=['맛집 검색'];
  const listLinks3=['restaurantSearch'];
  const listNames4=['항공권 검색'];
  const listLinks4=['flightSearch'];
  const listNames5=['날씨'];
  const listLinks5=['weatherSearch']


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
          <Divider />
            <ListComponent listNames={listNames3} listLinks={listLinks3} />
          <Divider />
            <ListComponent listNames={listNames4} listLinks={listLinks4} />
          <Divider />
            <ListComponent listNames={listNames5} listLinks={listLinks5} />
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
