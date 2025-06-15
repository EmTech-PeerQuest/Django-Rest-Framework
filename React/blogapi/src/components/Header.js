import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import { styled } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';

// New imports for the custom MUI v5 search bar
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search'; // Import the search icon

// Styled AppBar component
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

// Styled Toolbar component
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  // You can add toolbar-specific styles here if needed.
  // For example, if you want specific padding or height.
}));

function Header() {
  const navigate = useNavigate();
  const [data, setData] = useState({ search: '' });

  // Handle input change for the TextField
  const handleInputChange = (event) => {
    setData({ search: event.target.value });
  };

  // Function to handle the search request
  const goSearch = () => {
    navigate({
      pathname: '/search/',
      search: '?search=' + data.search,
    });
    // Removed window.location.reload() - navigate should be enough for SPA
  };

  // Handle Enter key press in the search TextField
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      goSearch();
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <StyledAppBar
        position="static"
        color="default"
        elevation={0}
      >
        <StyledToolbar>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            <Link
              component={NavLink}
              to="/"
              underline="none"
              color="textPrimary"
            >
              PeerQuest
            </Link>
          </Typography>

          {/* Custom MUI v5 Search Bar */}
          <TextField
            variant="outlined" // Can be 'standard', 'filled', or 'outlined'
            size="small" // 'small' or 'medium'
            placeholder="Search..."
            value={data.search}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress} // Handle Enter key press
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={goSearch} edge="end" aria-label="search button">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
              sx: { borderRadius: '25px', paddingRight: '4px' } // Added rounded corners to the input field
            }}
            sx={{
              marginRight: 2, // Spacing from the title
              width: { xs: '150px', sm: '200px', md: '250px' }, // Responsive width
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px', // Ensure the TextField's border radius applies
              },
            }}
          />

          {/* Removed Register, Login, and Logout buttons as requested */}
        </StyledToolbar>
      </StyledAppBar>
    </React.Fragment>
  );
}

export default Header;