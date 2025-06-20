import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import { styled } from '@mui/material/styles';
import { NavLink, useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

// Helper to check if access token is not expired
function isTokenValid(token) {
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;
    return Date.now() < exp;
  } catch {
    return false;
  }
}

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

function Header() {
  const navigate = useNavigate();
  const [data, setData] = useState({ search: '' });

  const handleInputChange = (event) => {
    setData({ search: event.target.value });
  };

  const goSearch = () => {
    navigate({
      pathname: '/search',
      search: '?search=' + data.search,
    });
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      goSearch();
    }
  };

  const accessToken = localStorage.getItem('access_token');
  const isAuthenticated = isTokenValid(accessToken);

  const handleLogout = () => {
    navigate('/logout');
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <StyledAppBar position="static" color="default" elevation={0}>
        <StyledToolbar>
          <Typography variant="h6" color="inherit" noWrap>
            <Link component={NavLink} to="/" underline="none" color="textPrimary">
              Blog
            </Link>
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search..."
              value={data.search}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={goSearch} edge="end">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mr: 2,
                width: { xs: '150px', sm: '200px', md: '250px' },
                '& .MuiOutlinedInput-root': { borderRadius: '25px' },
              }}
            />

            {!isAuthenticated ? (
              <>
                <Button
                  component={NavLink}
                  to="/login"
                  color="primary"
                  variant="outlined"
                  sx={{ mx: 1 }}
                >
                  Login
                </Button>
                <Button
                  component={NavLink}
                  to="/register"
                  color="primary"
                  variant="contained"
                >
                  Register
                </Button>
              </>
            ) : (
              <Button
                onClick={handleLogout}
                color="secondary"
                variant="outlined"
              >
                Logout
              </Button>
            )}
          </Box>
        </StyledToolbar>
      </StyledAppBar>
    </React.Fragment>
  );
}

export default Header;
