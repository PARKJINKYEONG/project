import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const ImageModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const SearchAppBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [imageResults, setImageResults] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('');
  const [selectedSubmenuItem, setSelectedSubmenuItem] = useState('');
  const [openMenu, setOpenMenu] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    let query = searchTerm;
    if (selectedSubmenuItem) {
      switch (selectedSubmenuItem) {
        case '해외관광':
          query = `해외관광 ${searchTerm}`;
          break;
        case '국내관광':
          query = `국내관광 ${searchTerm}`;
          break;
        case '인기관광':
          query = `인기관광 ${searchTerm}`;
          break;
        default:
          query = `${selectedSubmenuItem} ${searchTerm}`;
          break;
      }
    } else {
      switch (selectedMenuItem) {
        case '관광지':
          query = `관광지 OR 명소 OR 여행지 ${searchTerm}`;
          break;
        case '숙박업소':
          query = `숙박업소 ${searchTerm}`;
          break;
        case '맛집':
          query = `맛집 ${searchTerm}`;
          break;
        case '교통':
          query = `교통 ${searchTerm}`;
          break;
        default:
          break;
      }
    }
    try {
      const response = await axios.get(`http://localhost:5000/search`, {
        params: { q: query, site: 'google' }
      });
      console.log(`Fetched images for query '${query}':`, response.data);
      setImageResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleMenuItemClick = (text) => {
    setSelectedMenuItem(text);
    setSelectedSubmenuItem('');
    setImageResults([]);
    setOpenMenu(openMenu === text ? null : text);
  };

  const handleSubmenuItemClick = (text) => {
    setSelectedSubmenuItem(text);
    setImageResults([]);
    handleDrawerClose(); // Close the drawer when a submenu item is clicked
  };

  const handleImageClick = (url) => {
    setSelectedImage(url);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedImage('');
  };

  return (
    <Box sx={{ flexGrow: 1, mt: 15 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            {selectedSubmenuItem || selectedMenuItem || '관광지'}
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <form onSubmit={handleSearchSubmit}>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </form>
          </Search>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerClose}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
        >
          <List>
            {['관광지', '숙박업소', '맛집', '교통'].map((text) => (
              <React.Fragment key={text}>
                <ListItem button onClick={() => handleMenuItemClick(text)}>
                  <ListItemText primary={text} />
                  {openMenu === text ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openMenu === text} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {text === '관광지' && ['해외관광', '국내관광', '인기관광'].map((submenu) => (
                      <ListItem button key={submenu} sx={{ pl: 4 }} onClick={() => handleSubmenuItemClick(submenu)}>
                        <ListItemText primary={submenu} />
                      </ListItem>
                    ))}
                    {text === '숙박업소' && ['호텔', '모텔'].map((submenu) => (
                      <ListItem button key={submenu} sx={{ pl: 4 }} onClick={() => handleSubmenuItemClick(submenu)}>
                        <ListItemText primary={submenu} />
                      </ListItem>
                    ))}
                    {text === '맛집' && ['AI추천', '크롤링 추천'].map((submenu) => (
                      <ListItem button key={submenu} sx={{ pl: 4 }} onClick={() => handleSubmenuItemClick(submenu)}>
                        <ListItemText primary={submenu} />
                      </ListItem>
                    ))}
                    {text === '교통' && (
                      <ListItem button key="네이버 길찾기" sx={{ pl: 4 }} onClick={() => handleSubmenuItemClick('네이버 길찾기')}>
                        <ListItemText primary="네이버 길찾기" />
                      </ListItem>
                    )}
                  </List>
                </Collapse>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box sx={{ p: 2, display: 'flex', flexWrap: 'wrap' }}>
        {imageResults.map((url, index) => (
          <Box key={index} sx={{ m: 1 }} onClick={() => handleImageClick(url)}>
            <img
              src={url}
              alt={`Result ${index}`}
              width="100"
              height="100"
              style={{ cursor: 'pointer' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/100';
              }}
            />
          </Box>
        ))}
      </Box>
      <ImageModal
        open={modalOpen}
        onClose={handleCloseModal}
      >
        <Box
          sx={{
            maxWidth: '90%',
            maxHeight: '90%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <img
            src={selectedImage}
            alt="Selected"
            style={{ width: '100%', height: 'auto', cursor: 'pointer' }}
            onClick={handleCloseModal}
          />
        </Box>
      </ImageModal>
    </Box>
  );
};

export default SearchAppBar;
