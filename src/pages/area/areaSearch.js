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
import Popover from '@mui/material/Popover';
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

export default function AreaSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [imageResults, setImageResults] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState('');
  const [selectedSubmenuItem, setSelectedSubmenuItem] = useState('');
  const [openMenu, setOpenMenu] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    const query = generateQuery(searchTerm, selectedMenuItem, selectedSubmenuItem);
    try {
      const response = await axios.get(`http://localhost:5000/search`, { params: { q: query, site: 'google' } });
      setImageResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const generateQuery = (searchTerm, selectedMenuItem, selectedSubmenuItem) => {
    let query = searchTerm;
    if (selectedSubmenuItem) {
      query = `${selectedSubmenuItem} ${searchTerm}`;
    } else if (selectedMenuItem) {
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
    return query;
  };

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);

  const handleMenuClose = () => setAnchorEl(null);

  const handleMenuItemClick = (text) => {
    setSelectedMenuItem(text);
    setSelectedSubmenuItem('');
    setImageResults([]);
    setOpenMenu(openMenu === text ? null : text);
  };

  const handleSubmenuItemClick = (text) => {
    setSelectedSubmenuItem(text);
    setImageResults([]);
    handleMenuClose();
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
          <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" onClick={handleMenuOpen} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            PaperProps={{ sx: { backgroundColor: (theme) => theme.palette.primary.main, color: (theme) => theme.palette.common.white } }}
          >
            <Box sx={{ width: 250 }}>
              <List>
                {['관광지', '숙박업소', '맛집', '교통'].map((text) => (
                  <React.Fragment key={text}>
                    <ListItem button onClick={() => handleMenuItemClick(text)}>
                      <ListItemText primary={text} />
                      {openMenu === text ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openMenu === text} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {getSubmenuItems(text).map((submenu) => (
                          <ListItem
                            button
                            key={submenu}
                            sx={{ pl: 4, backgroundColor: (theme) => alpha(theme.palette.common.white, 0.15), '&:hover': { backgroundColor: (theme) => alpha(theme.palette.common.white, 0.25) } }}
                            onClick={() => handleSubmenuItemClick(submenu)}
                          >
                            <ListItemText primary={submenu} />
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </Box>
          </Popover>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
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
      <ImageModal open={modalOpen} onClose={handleCloseModal}>
        <Box sx={{ maxWidth: '90%', maxHeight: '90%', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <img src={selectedImage} alt="Selected" style={{ width: '100%', height: 'auto', cursor: 'pointer' }} onClick={handleCloseModal} />
        </Box>
      </ImageModal>
    </Box>
  );
}

function getSubmenuItems(menuItem) {
  switch (menuItem) {
    case '관광지':
      return ['해외관광', '국내관광', '인기관광'];
    case '숙박업소':
      return ['호텔', '모텔'];
    case '맛집':
      return ['AI추천', '크롤링 추천'];
    case '교통':
      return ['네이버 길찾기'];
    default:
      return [];
  }
}
