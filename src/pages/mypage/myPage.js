import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { ListComponent } from './listComponent';
import { Outlet } from 'react-router-dom';

const drawerWidth = 240;
  
export default function MyPage(){
  const listNames = ['일정', '리뷰', '즐겨찾기'];
  const listLinks = ['plan', 'review', 'good'];
  const listNames2 = ['프로필', '메시지',  '내 정보'];
  const listLinks2 = ['profile', 'messages', 'myinfo'];
    return <>
      <Box sx={{ display: 'flex' ,marginTop: '100px'}}>
 
      
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
          <ListComponent listNames={listNames} listLinks={listLinks}/>
          <Divider />
          <ListComponent listNames={listNames2} listLinks={listLinks2}/>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet/> {/* 여기에 컨텐츠 들어감 */}
      </Box>
    </Box>
    </>
}