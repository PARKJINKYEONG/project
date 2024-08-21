import React, { useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Link, Outlet } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HomeIcon from '@mui/icons-material/Home';
import { ListItemButton, ListItemText, Collapse, ListItemIcon } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PeopleIcon from '@mui/icons-material/People';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = useState(true);
  const [openMember, setOpenMember] = useState(true);
  const [openBoard, setOpenBoard] = useState(true);

  const toggleDrawer = () => {
    if (open) {
        setOpenMember(false);
        setOpenBoard(false);
      }
      else {
        setOpenMember(true);
        setOpenBoard(true);
      }
      setOpen(!open);
  };

  const handleMemberClick = () => {
    if (!open) toggleDrawer(); 
    setOpenMember(!openMember);
  };

  const handleBoardClick = () => {
    if (!open) toggleDrawer(); 
    setOpenBoard(!openBoard);
  };


  const handleItemClick = () => {
    if (!open) toggleDrawer(); 

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px',
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              관리자 페이지
            </Typography>
            <IconButton color="inherit" component={Link} to="/">
              <Badge color="secondary" >
                <HomeIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
          <ListItemButton onClick={handleMemberClick}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
            <ListItemText primary="회원 정보 관리" />
            {openMember ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
            <Collapse in={openMember}>
              <List component="div" disablePadding>
                <ListItemButton component={Link} to="privacy" sx={{ pl: 4 }}>
                  <ListItemText primary="회원 정보 변경" />
                </ListItemButton>
                <ListItemButton component={Link} to="delete" sx={{ pl: 4 }}>
                  <ListItemText primary="로그인 및 보안" />
                </ListItemButton>
                <ListItemButton component={Link} to="restrict" sx={{ pl: 4 }}>
                  <ListItemText primary="계정제한" />
                </ListItemButton>
              </List>
            </Collapse>

            <ListItemButton onClick={handleBoardClick}>
        <ListItemIcon>
            <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="게시판 관리" />
            {openBoard ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
            <Collapse in={openBoard}>
              <List component="div" disablePadding>
                <ListItemButton component={Link} to="notice" sx={{ pl: 4 }}>
                  <ListItemText primary="공지 사항" />
                </ListItemButton>
                <ListItemButton component={Link} to="comments" sx={{ pl: 4 }}>
                  <ListItemText primary="채팅 문의 관리" />
                </ListItemButton>
                <ListItemButton component={Link} to="questions" sx={{ pl: 4 }}>
                  <ListItemText primary="문의 관리" />
                </ListItemButton>
                <ListItemButton component={Link} to="reports" sx={{ pl: 4 }}>
                  <ListItemText primary="신고 관리" />
                </ListItemButton>
              </List>
            </Collapse>

            <ListItemButton component={Link} to="statistics" onClick={handleItemClick}>
                <ListItemIcon>
                <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="통계" />
            </ListItemButton>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Custom Components Here */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Outlet />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
